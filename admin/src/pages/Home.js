import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import InfoBoard from "../components/InfoBoard";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(
          "http://localhost:5000/api/getTransactions"
        );
        const resData = await request.json();
        setTransactions(resData.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          <InfoBoard />
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <h2>Latest Transactions</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Room</th>
                  <th scope="col">Date</th>
                  <th scope="col">Price</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td>
                    <td>{transaction.user.username}</td>
                    <td>{transaction.hotel.name}</td>
                    <td>
                      {transaction.room
                        .map((r) => {
                          return r.roomNumber;
                        })
                        .join(", ")}
                    </td>
                    <td>
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
                    <td>${transaction.price}</td>
                    <td>{transaction.payment}</td>
                    <td>{transaction.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
