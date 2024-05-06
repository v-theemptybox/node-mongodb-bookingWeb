import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
