import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    try {
      const request = await fetch("http://localhost:5000/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          email: email,
          isAdmin: true,
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
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <main className="mt-3 col-auto col-md-9 col-xl-10">
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
                />
                <label className="form-label mt-2">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label className="form-label mt-2">Full Name:</label>
                <input
                  className="form-control"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <label className="form-label mt-2">Phone Number:</label>
                <input
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  pattern="[0-9]{10}"
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
                />
                <button
                  className="btn btn-primary mb-3 my-3"
                  type="button"
                  onClick={handleSignUp}
                >
                  Login
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
