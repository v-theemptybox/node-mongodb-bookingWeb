import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteHotelId, setDeleteHotelId] = useState("");
  const [severity, setSeverity] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleOpenDialog = (hotelId) => {
    setDeleteHotelId(hotelId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // fetch all hotels
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
  }, [updateUI]);

  // confirm delete a hotel
  const handleDeleteHotel = async () => {
    try {
      handleCloseDialog();
      const response = await fetch("http://localhost:5000/api/deleteHotel", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId: deleteHotelId,
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
                : "Delete failed! This hotel has been included in at least one transaction"}
            </Alert>
          )}
          <div className="mt-5 border rounded shadow text-start pt-4 px-3">
            <div className="d-flex justify-content-between">
              <h2>Hotels List</h2>
              <button
                className="border border-success rounded text-success bg-white"
                onClick={() => {
                  navigate("/create-hotel");
                }}
              >
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
                      <button
                        className="border border-dashed border-primary text-primary bg-white rounded me-2"
                        onClick={() => {
                          navigate(`/hotels/${hotel._id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-dashed border-danger text-danger bg-white rounded"
                        onClick={() => {
                          handleOpenDialog(hotel._id);
                        }}
                      >
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">{"Delete item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteHotel} className="text-danger">
            Yes
          </Button>
          <Button onClick={handleCloseDialog}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Hotel;
