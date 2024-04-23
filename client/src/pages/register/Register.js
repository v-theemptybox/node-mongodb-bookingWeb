import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from "./register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const request = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          email: email,
          isAdmin: false,
        }),
      });
      const resData = await request.text();
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles["form-cover"]}>
        <form className={styles.form}>
          <h2>Sign Up</h2>
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
          <button type="button" onClick={handleSignUp}>
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
