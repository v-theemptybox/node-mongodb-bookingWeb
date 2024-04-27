import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:5000/api/getHotels");
        const resData = await request.json();
        setHotels(resData);
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
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <div className="d-flex justify-content-between">
              <h2>Latest Transactions</h2>
              <button className="border border-success rounded text-success bg-white">
                Add New
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Title</th>
                  <th scope="col">City</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>{hotel._id}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.title}</td>
                    <td>{hotel.city}</td>
                    <td>
                      <button className="border border-dashed border-danger text-danger bg-white rounded">
                        Delete
                      </button>
                    </td>
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

export default Hotel;
