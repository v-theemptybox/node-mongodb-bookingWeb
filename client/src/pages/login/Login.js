import React, { useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import styles from "../register/register.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const request = await fetch("http://localhost:5000/user/signin", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });
      const resData = await request.text();

      localStorage.setItem("username", resData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles["form-cover"]}>
        <form className={styles.form}>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
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
