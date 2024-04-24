import React, { useState } from "react";
import styles from "./ReserveForm.module.css";
import { DateRange } from "react-date-range";

const ReserveForm = ({ props }) => {
  const [totalCheck, setTotalCheck] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const username = localStorage.getItem("username") ?? "";

  const handleCheck = (e, price, number) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, number]); // Thêm số vào mảng các phòng đã chọn
      setTotalCheck((prevTotal) => prevTotal + price);
    } else {
      setSelectedRooms((prevSelectedRooms) =>
        prevSelectedRooms.filter((roomNumber) => roomNumber !== number)
      ); // Loại bỏ số khỏi mảng các phòng đã chọn
      setTotalCheck((prevTotal) => prevTotal - price);
    }
  };

  const handleBooking = async () => {
    const transactionData = {
      user: username,
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
      const request = await fetch("http://localhost:5000/api/postTransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
      const resData = await request.text();
      console.log(resData);
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
            <input type="text" placeholder="Full Name" />
            <label>Your Email:</label>
            <input type="text" placeholder="Email" />
            <label>Your Phone Number:</label>
            <input type="text" placeholder="Phone Number" />
            <label>Your Identity Card Number:</label>
            <input type="text" placeholder="Card Number" />
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
                    onChange={(e) => handleCheck(e, room.price, number)}
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
    </>
  );
};

export default ReserveForm;
