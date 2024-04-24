import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import styles from "./Transaction.module.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(
          "http://localhost:5000/api/postTransactionById",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: username,
            }),
          }
        );
        const resData = await request.json();
        console.log(resData);
        setTransactions(resData);
      } catch (err) {
        console.log(err);
      }
    };
    if (username) {
      fetchData();
    } else {
      console.log("Please Login!");
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="homeContainer">
        <div className={styles.transaction}>
          <h3>Your Transactions</h3>

          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>#</th>
              <th className={styles.th}>Hotel</th>
              <th className={styles.th}>Room</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Payment Method</th>
              <th className={styles.th}>Status</th>
            </tr>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{transaction.hotel}</td>
                <td className={styles.td}>{transaction.room.join(", ")}</td>
                <td className={styles.td}>
                  {new Date(transaction.dateStart).toLocaleString("vi-VN", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(transaction.dateEnd).toLocaleString("vi-VN", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className={styles.td}>${transaction.price}</td>
                <td className={styles.td}>{transaction.payment}</td>
                <td className={styles.td}>{transaction.status}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
