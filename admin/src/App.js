import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import NewHotel from "./pages/NewHotel";
import Room from "./pages/Room";
import Transaction from "./pages/Transaction";
import NewRoom from "./pages/NewRoom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

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
    {
      path: "/create-hotel",
      element: <NewHotel />,
    },
    {
      path: "/rooms",
      element: <Room />,
    },
    {
      path: "/transactions",
      element: <Transaction />,
    },
    {
      path: "/create-room",
      element: <NewRoom />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
