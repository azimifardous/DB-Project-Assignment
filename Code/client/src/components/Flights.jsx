import React, { useEffect, useState } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Flights = () => {
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ASC");
  const [avgAndSum, setAvgAndSum] = useState(null);
  const parseDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const time = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const date = dateTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return { time, date };
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:8080/flights/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response1 = await Axios.get(
        `http://localhost:8080/flights?sortBy=${sortColumn}&sortOrder=${sortOrder}`
      );
      const response2 = await Axios.get(
        "http://localhost:8080/flights/getAvg&Sum"
      );
      setFlights(response1.data);
      setAvgAndSum(response2.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Toggle sort order if clicking on the same column
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      // Set new sort column and default to ascending order
      setSortColumn(column);
      setSortOrder("ASC");
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortColumn, sortOrder]);

  if (loading) return;
  if (flights.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h3>No Flights</h3>
      </div>
    );

  return (
    <div className="flex flex-col justify-center m-10">
      <div className="flex justify-between">
        <div className="flex">
          <h2 className="text-3xl font-bold mb-2 text-primary">
            Available Flights{" "}
          </h2>
          <div className="bg-secondary ml-2 w-[25px] h-[25px] rounded-full text-sm text-wheet text-center flex items-center justify-center">
            <p>{flights.length}</p>
          </div>
        </div>
        <NavLink
          to={"/all-flights/add-flight"}
          className={
            "bg-secondary active:scale-95 w-[100px] py-2 text-center rounded-md text-wheet mb-4 transition-all"
          }
        >
          Add Flight
        </NavLink>
      </div>
      <div className="border-[1px] mb-10 opacity-50"></div>
      <div className="mb-4">
        <table className="w-full border-collapse table-auto">
          <thead className="text-left">
            <tr className="opacity-50 text-xs">
              <th className="py-3 px-8 border-b-2 border-accent"></th>
              <SortableHeader
                column="FlightNO"
                label="FLIGHT"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="AirlineName"
                label="AIRLINE"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="DepartureCity"
                label="FROM"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="ArrivalCity"
                label="TO"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="DTime"
                label="DEPARTURE"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="ATime"
                label="ARRIVAL"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <SortableHeader
                column="Price"
                label="PRICE"
                onSort={handleSort}
                currentSortColumn={sortColumn}
                sortOrder={sortOrder}
              />
              <th />
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => {
              const { time: DTime, date: DDate } = parseDateTime(
                flight.departureTime
              );
              const { time: ATime, date: ADate } = parseDateTime(
                flight.arrivalTime
              );
              return (
                <tr key={flight.flightID}>
                  <td
                    onClick={() => handleDelete(flight.flightID)}
                    className="cursor-pointer border-l-8 border-l-secondary border-b-2 border-b-accent text-center"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="opacity-50 hover:opacity-100"
                    />
                  </td>
                  <td className="hover:underline cursor-pointer py-3 px-4 border-y-2 border-accent">
                    <NavLink to={`/all-flights/${flight.flightID}`}>
                      {flight.flightNO}
                    </NavLink>
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    {flight.airline?.name}
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    <div>
                      <p className="font-semibold">{`${flight.departureAirport?.city}, ${flight.departureAirport?.country}`}</p>
                      <p className="text-xs">{flight.departureAirport?.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    <div>
                      <p className="font-semibold">{`${flight.arrivalAirport?.city}, ${flight.arrivalAirport?.country}`}</p>
                      <p className="text-xs">{flight.arrivalAirport?.name}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    <p className="text-md font-semibold">{DTime}</p>
                    <p className="text-sm opacity-50">{DDate}</p>
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    <p className="text-md font-semibold">{ATime}</p>
                    <p className="text-sm opacity-50">{ADate}</p>
                  </td>
                  <td className="py-3 px-4 border-y-2 border-accent">
                    {flight.price}$
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-10 font-semibold uppercase">
          <p>
            <span className="opacity-50">Average of the Prices: </span>
            {avgAndSum[0]}$
          </p>
          <p>
            <span className="opacity-50">Sum of the Prices: </span>{" "}
            {avgAndSum[1]}$
          </p>
        </div>
      </div>
    </div>
  );
};

const SortableHeader = ({
  column,
  label,
  onSort,
  currentSortColumn,
  sortOrder,
}) => {
  const isSorted = currentSortColumn === column;
  const icon = sortOrder === "ASC" ? faSortUp : faSortDown;

  return (
    <th className="py-3 px-4  cursor-pointer" onClick={() => onSort(column)}>
      {label}
      {isSorted ? <FontAwesomeIcon icon={icon} className="ml-2" /> : null}
    </th>
  );
};

export default Flights;
