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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/hotels",
      element: <Hotel />,
    },
    { path: "/hotels/:hotelId", element: <NewRoom /> },
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
    {
      path: "/signUp",
      element: <Register />,
    },
    {
      path: "/signIn",
      element: <Login />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
