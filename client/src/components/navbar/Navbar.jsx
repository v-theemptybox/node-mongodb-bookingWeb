import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);

  // fetch user from current session
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/session", {
          credentials: "include",
        });
        const resData = await response.json();
        setUser(resData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, [setIsLoggedIn, setUser]);

  // logout
  const handleSignOut = async () => {
    try {
      const request = await fetch("http://localhost:5000/user/signOut", {
        method: "POST",
        credentials: "include",
      });
      const resData = await request.text();
      console.log(resData);
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking Website
        </span>
        <div className="navItems">
          {isLoggedIn && <span>{user.username}</span>}
          <button
            className="navButton"
            onClick={() => {
              if (isLoggedIn) {
                navigate("/transaction");
              } else {
                navigate("/register");
              }
            }}
          >
            {isLoggedIn ? "Transactions" : "Register"}
          </button>
          <button
            className="navButton"
            onClick={() => {
              if (isLoggedIn) {
                handleSignOut();
              } else navigate("/login");
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
