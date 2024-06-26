import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";

const NewHotel = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [distance, setDistance] = useState("");
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState("hotel");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [cheapestPrice, setCheapestPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rating, setRating] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const { hotelId } = useParams();

  // if hotelId params exist then load hotel
  useEffect(() => {
    if (hotelId) {
      // fetch hotel info from API when component load
      const fetchRoom = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/getHotel/${hotelId}`
          );
          const hotelData = await response.json();
          setName(hotelData.name);
          setCity(hotelData.city);
          setDistance(hotelData.distance);
          setDesc(hotelData.desc);
          setPhotos(hotelData.photos);
          setType(hotelData.type);
          setAddress(hotelData.address);
          setTitle(hotelData.title);
          setCheapestPrice(hotelData.cheapestPrice);
          setFeatured(hotelData.featured);
          setSelectedRooms(hotelData.rooms);
          setRating(hotelData.rating);
        } catch (error) {
          console.error("Error fetching room data:", error);
        }
      };
      fetchRoom();
    }
  }, [hotelId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:5000/api/getRooms");
        const resData = await request.json();
        setRooms(resData.rooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const validateForm = () => {
    if (
      !name ||
      !city ||
      !distance ||
      !desc ||
      !photos ||
      photos.length === 0 ||
      (photos.length === 1 && photos.includes("")) ||
      !address ||
      !title ||
      !cheapestPrice
    ) {
      showAlertMessage("Please fill in all value!");
      return false;
    }

    return true;
  };

  const showAlertMessage = (msg) => {
    setMessage(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // create a hotel
  const handleCreateHotel = async () => {
    try {
      if (validateForm()) {
        const response = await fetch("http://localhost:5000/api/createHotel", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            city,
            address,
            desc,
            distance,
            cheapestPrice,
            featured,
            photos,
            rooms: selectedRooms,
            title,
            type,
            rating,
          }),
        });

        const resData = await response.text();
        if (response.ok) {
          navigate("/hotels");
        } else {
          showAlertMessage(resData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelectedRoom = (roomId) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        // Remove room title if already selected
        return prevSelectedRooms.filter((title) => title !== roomId);
      } else {
        // Add room title if not selected
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  // update a hotel
  const handleUpdateHotel = async () => {
    try {
      if (validateForm()) {
        const response = await fetch(
          `http://localhost:5000/api/editHotel/${hotelId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              city,
              address,
              desc,
              distance,
              cheapestPrice,
              featured,
              photos,
              rooms: selectedRooms,
              title,
              type,
              rating,
            }),
          }
        );
        const resData = await response.text();
        if (response.ok) {
          navigate("/hotels");
        } else {
          showAlertMessage(resData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // capitalize first letter of city
  const capitalizeFirstLetter = (string) => {
    // spilt words between spaces
    const words = string.split(" ");

    const capitalizedWords = words.map((word) => {
      // if the word has at least 1 character
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return "";
      }
    });

    // Rejoin the string from words with the first letter capitalized
    return capitalizedWords.join(" ");
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          {message && showAlert && <Alert severity="info">{message}</Alert>}
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <h2>{hotelId ? "Edit Hotel" : "Add New Hotel"}</h2>
            <form>
              <div className="d-flex">
                <div className="flex-fill">
                  <label className="w-100">Name</label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: My Hotel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="w-100 mt-4">City</label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: Ha Noi"
                    value={city}
                    onChange={(e) =>
                      setCity(capitalizeFirstLetter(e.target.value))
                    }
                  />
                  <label className="w-100 mt-4">
                    Distance from City Center
                  </label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 500"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                  />
                  <label className="w-100 mt-4">Description</label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: Free drinks and snacks"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label className="w-100 mt-4">Images</label>
                  <textarea
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: https://image1.jpg,http://image2.jpg,..."
                    value={photos}
                    onChange={(e) => {
                      let photosArr = e.target.value
                        ?.replace(/\s/g, "")
                        .split(",");

                      setPhotos(photosArr);
                    }}
                  />
                </div>
                <div className="flex-fill">
                  <label className="w-100">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="hotel">hotel</option>
                    <option value="apartments">apartments</option>
                    <option value="resorts">resorts</option>
                    <option value="villas">villas</option>
                    <option value="cabins">cabins</option>
                  </select>
                  <label className="w-100 mt-4">Address</label>
                  <input
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: Elton st, 216"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label className="w-100 mt-4">Title</label>
                  <input
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: The best hotel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="w-100 mt-4">Price</label>
                  <input
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 350"
                    value={cheapestPrice}
                    onChange={(e) => setCheapestPrice(e.target.value)}
                  />
                  <label className="w-100 mt-4">Featured</label>
                  <select
                    value={featured}
                    onChange={(e) => setFeatured(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="w-100">Rooms</label>
                <List
                  sx={{
                    width: "50%",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 100,
                    border: "1px solid black",
                    padding: "3px",
                  }}
                >
                  {rooms.map((room) => (
                    <li
                      key={room._id}
                      onClick={() => toggleSelectedRoom(room._id)}
                      style={{ cursor: "pointer" }}
                      className={`${
                        selectedRooms.includes(room._id)
                          ? "bg-primary bg-opacity-50"
                          : ""
                      }`}
                    >
                      {room.title}
                    </li>
                  ))}
                </List>
              </div>
              <button
                className="mt-5 mb-4 border-0 px-4 py-1 text-white bg-success"
                onClick={hotelId ? handleUpdateHotel : handleCreateHotel}
                type="button"
              >
                {hotelId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewHotel;
