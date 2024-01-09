import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import SearchFlight from "./components/SearchFlight.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Tickets from "./components/Tickets.jsx";
import Contact from "./components/ Contact.jsx";
import SearchResult from "./components/SearchResult.jsx";
import Flights from "./components/Flights.jsx";
import AddFlight from "./components/AddFlight.jsx";
import EditFlight from "./components/EditFlight.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/searchFlight",
        element: <SearchFlight />,
      },
      {
        path: "/searchFlight/results",
        element: <SearchResult />,
      },
      {
        path: "/all-flights/:flightNO",
        element: <EditFlight />,
      },
      {
        path: "/all-flights",
        element: <Flights />,
      },
      {
        path: "/all-flights/add-flight",
        element: <AddFlight />,
      },
      {
        path: "/tickets",
        element: <Tickets />,
      },
      {
        path: "/aboutus",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
