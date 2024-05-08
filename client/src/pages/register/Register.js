import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

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
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            fullName,
            phoneNumber,
            email,
            isAdmin: false,
          }),
        });
        const resData = await response.json();
        if (response.ok) {
          setMessage(resData.message);
          setTimeout(() => {
            setMessage("");
            navigate("/login");
          }, 2000);
        } else {
          console.log(resData.message);
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
      <Navbar />
      {message && (
        <div className={styles["message-info"]}>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;
          {message}
        </div>
      )}
      <div className={styles["form-cover"]}>
        <form className={styles.form}>
          <h2>Sign Up</h2>
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <input
            placeholder="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
            }}
          />
          <button type="button" onClick={handleSignUp}>
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
