import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <h2>Add New Room</h2>
            <form>
              <div className="d-flex">
                <div className="flex-fill">
                  <label className="w-100">Title</label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: My Room"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label className="w-100 mt-4">Price</label>
                  <input
                    className="w-50 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 200"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="w-100 mt-4">Rooms</label>
                  <textarea
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
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="text"
                    placeholder="ex: The best room"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label className="w-100 mt-4">Max People</label>
                  <input
                    className="w-75 border-0 border-bottom border-2 border-dark-subtle"
                    type="number"
                    placeholder="ex: 2"
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
