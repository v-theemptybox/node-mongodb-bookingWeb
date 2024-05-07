import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/Sidebar";

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
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <Sidebar />
          <main className="mt-3 col-auto col-md-9 col-xl-10">
            {message && (
              <div className="alert alert-info">
                <FontAwesomeIcon icon={faInfoCircle} />
                &nbsp;
                {message}
              </div>
            )}
            <div className="mt-5 border rounded shadow text-start pt-4 px-3 d-flex justify-content-center">
              <form className="form-control w-25 mb-3">
                <h2>Login</h2>
                <div className="my-2">
                  <label className="form-label">Username: </label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="my-2">
                  <label className="form-label">Password: </label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  className="btn btn-primary mb-3"
                  type="button"
                  onClick={handleSignIn}
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

export default Login;
