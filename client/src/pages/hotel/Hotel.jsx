import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReserveForm from "../../components/reserveForm/ReserveForm";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [dataFromReserve, setDataFromReserve] = useState({});

  let { id: hotelId } = useParams();

  const handleDataFromReserve = (data) => {
    setDataFromReserve(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(
          `http://localhost:5000/api/postHotels/${hotelId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: dataFromReserve.startDate,
              endDate: dataFromReserve.endDate,
            }),
          }
        );

        const resData = await request.json();

        setHotel(resData);

        return resData;
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [hotelId, dataFromReserve]);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleOpenReserve = () => {
    setIsOpen(!isOpen);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={hotel.photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleOpenReserve}>
            Reserve or Book Now!
          </button>
          <h1 className="hotelTitle">{hotel.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {hotel.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel.title}</h1>
              <p className="hotelDesc">{hotel.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>${hotel.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={handleOpenReserve}>Reserve or Book Now!</button>
            </div>
          </div>
          {isOpen && (
            <ReserveForm
              props={hotel}
              onDataFromReserve={handleDataFromReserve}
            />
          )}
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
