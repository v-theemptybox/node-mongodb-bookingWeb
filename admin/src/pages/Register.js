import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password || !fullName || !phoneNumber || !email) {
      setMessage("Please fill in all value");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return false;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return false;
    }

    if (phoneNumber.length < 10) {
      setMessage("Phone number must have 10 digits");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email address");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    try {
      if (validateForm()) {
        const response = await fetch("http://localhost:5000/user/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            fullName,
            phoneNumber,
            email,
            isAdmin: true,
          }),
        });
        const resData = await response.json();
        if (response.ok) {
          setMessage(resData.message);
          setTimeout(() => {
            setMessage("");
            navigate("/signIn");
          }, 2000);
        } else {
          setMessage(resData.message);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <main className="mt-3 col-auto col-md-9 col-xl-10">
            {message && (
              <div
                className={`${
                  message === "User created"
                    ? "alert alert-success"
                    : "alert alert-info"
                } `}
              >
                <FontAwesomeIcon
                  icon={
                    message === "User created" ? faCheckCircle : faInfoCircle
                  }
                />
                &nbsp;
                {message}
              </div>
            )}
            <div className="mt-5 border rounded shadow text-start pt-4 px-3 d-flex justify-content-center">
              <form className="form-control w-25 mb-3">
                <h2>Register</h2>
                <label className="form-label mt-2">Username:</label>
                <input
                  className="form-control"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
                <label className="form-label mt-2">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <label className="form-label mt-2">Full Name:</label>
                <input
                  className="form-control"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  required
                />
                <label className="form-label mt-2">Phone Number:</label>
                <input
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    );
                  }}
                  max={10}
                  required
                />
                <label className="form-label mt-2">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <button
                  className="btn btn-primary mb-3 my-3"
                  type="button"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Register;
