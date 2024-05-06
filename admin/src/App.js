import { useState, createContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import NewHotel from "./pages/NewHotel";
import Room from "./pages/Room";
import Transaction from "./pages/Transaction";
import NewRoom from "./pages/NewRoom";
import User from "./pages/User";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signUp",
      element: <Register />,
    },
    {
      path: "/signIn",
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/hotels",
          element: <Hotel />,
        },
        { path: "/hotels/:hotelId", element: <NewHotel /> },
        {
          path: "/create-hotel",
          element: <NewHotel />,
        },
        {
          path: "/rooms",
          element: <Room />,
        },
        { path: "/rooms/:roomId", element: <NewRoom /> },
        {
          path: "/transactions",
          element: <Transaction />,
        },
        {
          path: "/create-room",
          element: <NewRoom />,
        },
        {
          path: "/users",
          element: <User />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
