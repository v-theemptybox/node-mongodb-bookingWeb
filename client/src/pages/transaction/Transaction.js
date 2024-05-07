import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import styles from "./Transaction.module.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/postTransactionById",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user.username,
            }),
          }
        );
        const resData = await response.json();

        setTransactions(resData);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      fetchData();
    } else {
      console.log("Please Login!");
    }
  }, [user.username]);

  return (
    <div>
      <Navbar />
      <Header type="list" />

      <div className="homeContainer">
        <div className={styles.transaction}>
          <h3>Your Transactions</h3>

          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Hotel</th>
                <th className={styles.th}>Room</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Payment Method</th>
                <th className={styles.th}>Status</th>
              </tr>

              {transactions?.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{transaction.hotel.name}</td>
                  <td className={styles.td}>
                    {transaction.room
                      .map((r) => {
                        return r.roomNumber;
                      })
                      .join(", ")}
                  </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
