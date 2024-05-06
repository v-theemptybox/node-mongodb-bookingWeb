import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getTransactions?page=${page}`
        );
        const resData = await response.json();
        setTransactions(resData.results);
        setTotalPages(resData.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <h2>Transactions List</h2>
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
            <div className="d-flex justify-content-end">
              <span>
                {page} of {totalPages}
              </span>
              <button
                className={`border-0 bg-white px-2 mx-1 mb-2 ${
                  page === 1 ? "text-secondary disabled" : ""
                }`}
                onClick={() => {
                  if (page !== 1) {
                    setPage(page - 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                className={`border-0 bg-white px-2 mx-1 mb-2 ${
                  page === totalPages ? "text-secondary disabled" : ""
                }`}
                onClick={() => {
                  if (page !== totalPages) {
                    setPage(page + 1);
                  }
                }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transaction;
