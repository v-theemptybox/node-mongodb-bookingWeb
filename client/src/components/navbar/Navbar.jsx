import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") ?? "";

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
          {username && <span>{username}</span>}
          <button
            className="navButton"
            onClick={() => {
              navigate("/register");
            }}
          >
            {username ? "Transactions" : "Register"}
          </button>
          <button
            className="navButton"
            onClick={() => {
              if (username) {
                localStorage.removeItem("username");
                navigate("/");
              } else navigate("/login");
            }}
          >
            {username ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
