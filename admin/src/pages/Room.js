import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteRoomId, setDeleteRoomId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate();

  const handleOpenDialog = (roomId) => {
    setDeleteRoomId(roomId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
  }, [page, updateUI]);

  const handleDeleteRoom = async () => {
    try {
      handleCloseDialog();
      const response = await fetch("http://localhost:5000/api/deleteRoom", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: deleteRoomId,
        }),
      });

      if (response.ok) {
        setMessage("Deleted!");
      } else {
        setMessage(await response.text());
      }

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      setUpdateUI(!updateUI);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (message) {
      if (message === "Deleted!") {
        setSeverity("success");
      } else if (message === "Delete fail!") {
        setSeverity("error");
      }
    }
  }, [message]);

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          {message && showAlert && (
            <Alert severity={severity}>
              {severity === "success"
                ? "Deleted successfully!"
                : "Delete failed! This room has existed in at least one transaction or one hotel"}
            </Alert>
          )}
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
                      <button
                        className="border border-dashed border-primary text-primary bg-white rounded me-2"
                        onClick={() => {
                          navigate(`/rooms/${room._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-dashed border-danger text-danger bg-white rounded"
                        onClick={() => {
                          handleOpenDialog(room._id);
                        }}
                      >
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">{"Delete item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteRoom} className="text-danger">
            Yes
          </Button>
          <Button onClick={handleCloseDialog}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Room;
