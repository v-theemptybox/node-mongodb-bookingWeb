import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import NewHotel from "./pages/NewHotel";
import Room from "./pages/Room";

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
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
