import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getRooms?page=${page}`
        );
        const resData = await response.json();
        setRooms(resData.results);
        setTotalPages(resData.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <div className="d-flex justify-content-between">
              <h2>Rooms List</h2>
              <button
                className="border border-success rounded text-success bg-white"
                onClick={() => {
                  navigate("/create-room");
                }}
              >
                Add New
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Max People</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.title}</td>
                    <td>{room.desc}</td>
                    <td>{room.price}</td>
                    <td>{room.maxPeople}</td>
                    <td>
                      <button className="border border-dashed border-danger text-danger bg-white rounded">
                        Delete
                      </button>
                    </td>
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

export default Room;
