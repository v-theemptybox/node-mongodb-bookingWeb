import React, { useContext, useState } from "react";
import { AuthContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import styles from "../register/register.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
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
    return true;
  };

  const handleSignIn = async () => {
    try {
      if (validateForm()) {
        const response = await fetch("http://localhost:5000/user/signIn", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const resData = await response.json();
        if (response.ok) {
          setIsLoggedIn(true);
          navigate("/");
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
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="button" onClick={handleSignIn}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
