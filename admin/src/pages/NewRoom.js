import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const NewRoom = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!title || !price || !roomNumbers || !desc || !maxPeople) {
      showAlertMessage("Please fill in all value!");
      return false;
    }

    let nonNumeric = roomNumbers.filter(
      (item) => typeof item !== "number" && isNaN(item)
    );
    if (nonNumeric.length > 0) {
      showAlertMessage("Room numbers only accept numeric data types!");
      return false;
    }

    if (maxPeople > 4 || maxPeople < 1) {
      showAlertMessage("Minimum number of people is 1 and maximum is 4!");
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

  const handleCreateRoom = async () => {
    try {
      if (validateForm()) {
        const request = await fetch("http://localhost:5000/api/createRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            desc,
            price,
            maxPeople,
            roomNumbers,
          }),
        });

        const resData = await request.text();
        console.log(resData);
        navigate("/rooms");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          {message && showAlert && <Alert severity="info">{message}</Alert>}
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <h2>Add New Room</h2>
            <form>
              <div className="d-flex">
                <div className="flex-fill">
                  <label className="w-100">Title</label>
                  <input
                    required
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: My Room"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="w-100 mt-4">Price</label>
                  <input
                    required
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 200"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  <label className="w-100 mt-4">Rooms</label>
                  <textarea
                    required
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: 100,101,..."
                    value={roomNumbers}
                    onChange={(e) => {
                      let roomArr = e.target.value
                        ?.replace(/\s/g, "")
                        .split(",");

                      setRoomNumbers(roomArr);
                    }}
                  />
                </div>
                <div className="flex-fill">
                  <label className="w-100 mt-4">Description</label>
                  <input
                    required
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: The best room"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label className="w-100 mt-4">Max People</label>
                  <input
                    required
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 2"
                    min={1}
                    max={4}
                    value={maxPeople}
                    onChange={(e) => setMaxPeople(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="mt-5 mb-4 border-0 px-4 py-1 text-white bg-success"
                type="button"
                onClick={handleCreateRoom}
              >
                Create
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewRoom;
