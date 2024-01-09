import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const { state } = useLocation();
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const { searchData } = state;
    const { departureCity, departureDate, arrivalCity, arrivalDate } =
      searchData;
    const fetchData = async () => {
      try {
        const url = `http://localhost:8080/flights/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`;
        const response = await Axios.get(url);
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return;
  if (flights.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1>No Flight Found</h1>
      </div>
    );

  return (
    <div className="flex flex-col justify-center m-10">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-2 text-primary">
          Searched Flight
        </h2>
      </div>
      <div className="border-[1px] mb-10 opacity-50"></div>
      <div className="mb-4">
        <table className="w-full border-collapse table-auto">
          <thead className="text-left">
            <tr className="opacity-50 text-xs">
              <th className="py-3 px-4">FLIGHT</th>
              <th className="py-3 px-4">AIRLINE</th>
              <th className="py-3 px-4">FROM</th>
              <th className="py-3 px-4">TO</th>
              <th className="py-3 px-4">DEPARTURE</th>
              <th className="py-3 px-4">ARRIVAL</th>
              <th className="py-3 px-4">PRICE</th>
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
                  <td className="py-3 px-4 border-y-2 border-accent">
                    {flight.flightNO}
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
      </div>
    </div>
  );
};

export default SearchResult;
