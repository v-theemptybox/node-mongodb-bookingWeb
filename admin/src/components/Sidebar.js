import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faUser,
  faHotel,
  faBed,
  faTruck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="container-fluid">
        <div className="row flex-nowrap"> */}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white border-end">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none border-bottom"
          >
            <span className="fs-5 d-none d-sm-inline text-primary ">
              Admin Page
            </span>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li className="nav-item mt-3">
              <p className="text-secondary ">Main</p>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                navigate("/");
              }}
            >
              <button className="nav-link px-0">
                <FontAwesomeIcon icon={faTableColumns} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Dashboard
                </span>
              </button>
            </li>
            <li className="nav-item mt-3">
              <p className="text-secondary ">List</p>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faUser} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Users
                </span>
              </a>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                navigate("/hotels");
              }}
            >
              <button className="nav-link px-0">
                <FontAwesomeIcon icon={faHotel} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Hotels
                </span>
              </button>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faBed} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Rooms
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faTruck} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Transactions
                </span>
              </a>
            </li>
            <li className="nav-item mt-3">
              <p className="text-secondary ">New</p>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faHotel} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  New Hotel
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faBed} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  New Room
                </span>
              </a>
            </li>
            <li className="nav-item mt-3">
              <p className="text-secondary ">User</p>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-0">
                <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                <span className="ms-1 d-none d-sm-inline text-secondary">
                  Logout
                </span>
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown pb-4">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://avatars.githubusercontent.com/u/77970393?v=4"
                alt="userImg"
                width="30"
                height="30"
                className="rounded-circle"
              />
              <span className="d-none d-sm-inline mx-1 text-secondary">
                username
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="col py-3">Content area...</div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
