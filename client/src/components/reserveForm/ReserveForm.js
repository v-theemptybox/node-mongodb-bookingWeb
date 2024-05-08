import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { DateRange } from "react-date-range";
import styles from "./ReserveForm.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const ReserveForm = ({ props, onDataFromReserve }) => {
  const [totalCheck, setTotalCheck] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const sendDataToHotel = () => {
      const startDate = state[0].startDate;
      const endDate = state[0].endDate;

      onDataFromReserve({ startDate, endDate });
    };

    sendDataToHotel();
  }, [state]);

  const handleCheck = (e, price, number, roomId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRooms((prevSelectedRooms) => [
        ...prevSelectedRooms,
        { roomId: roomId, roomNumber: number },
      ]);
      setTotalCheck((prevTotal) => prevTotal + price);
    } else {
      setSelectedRooms((prevSelectedRooms) =>
        prevSelectedRooms.filter(
          (room) => !(room.roomId === roomId && room.roomNumber === number)
        )
      );
      setTotalCheck((prevTotal) => prevTotal - price);
    }
  };

  const handleBooking = async () => {
    const transactionData = {
      user: user.username,
      hotel: props._id,
      room: selectedRooms,
      dateStart: state[0].startDate,
      dateEnd: state[0].endDate,
      price: totalCheck,
      payment: paymentMethod,
      status: "Booked",
    };

    console.log(transactionData);

    try {
      if (!selectedRooms || selectedRooms.length === 0) {
        setMessage("Please select at least one room");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        const response = await fetch(
          "http://localhost:5000/api/postTransaction",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          }
        );
        const resData = await response.text();

        if (response.ok) {
          setMessage(resData);
          setTimeout(() => {
            setMessage("");
            navigate("/transaction");
          }, 2000);
        } else {
          console.log(resData);
          setMessage(resData);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles["date-reserve-part"]}>
        <div className={styles["date-part"]}>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
        <div className={styles["reserve-part"]}>
          <h3>Reserve</h3>
          <form className={styles.form}>
            <label>Your Full Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              value={user.username}
              readOnly
            />
            <label>Your Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              readOnly
            />
            <label>Your Phone Number:</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={user.phoneNumber}
              readOnly
            />
            <label>Your Identity Card Number:</label>
            <input type="text" placeholder="Card Number" readOnly />
          </form>
        </div>
      </div>
      <div className={styles["rooms"]}>
        <h3>Select Rooms</h3>
        <div className={styles["flex-rooms"]}>
          {props.rooms?.map((room) => (
            <div key={room._id} className={styles["flex-rooms__content"]}>
              <div className={styles["desc-margin"]}>
                <strong>{room.title}</strong>
                <p>{room.desc}</p>
                <h5>Max people: {room.maxPeople}</h5>
                <h4>${room.price}</h4>
              </div>

              {room.roomNumbers.map((number) => (
                <div key={number} className={styles["flex-checkbox"]}>
                  <label htmlFor={`${number}`}>{number}</label>
                  <input
                    id={`${number}`}
                    type="checkbox"
                    value={number}
                    onChange={(e) =>
                      handleCheck(e, room.price, number, room._id)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.total}>
        <h3>Total Bill: ${totalCheck}</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option disabled>Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <button onClick={handleBooking}>Reserve Now</button>
      </div>
      {message && (
        <div className={styles["message-info"]}>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;
          {message}
        </div>
      )}
    </>
  );
};

export default ReserveForm;
