import React, { useState, useEffect } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXmark } from "@fortawesome/free-solid-svg-icons";

const Tickets = () => {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTicket, setHoveredTicket] = useState(null);
  const parseDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const time = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dayName = dateTime.toLocaleString("default", { weekday: "short" });
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "short" });
    const year = dateTime.getFullYear();

    return { dayName, time, day, month, year };
  };

  const handleHover = (ticketID) => {
    setHoveredTicket(ticketID);
  };

  const handleHoverOut = () => {
    setHoveredTicket(null);
  };

  const handleDeleteTicket = async (ticketID) => {
    try {
      await Axios.delete(`http://localhost:8080/tickets/${ticketID}`);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:8080/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return;
  if (tickets.length === 0)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h3>No Tickets</h3>
      </div>
    );

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4 text-secondary">
        Tickets List
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {tickets.map((ticket) => {
          const isHovered = hoveredTicket === ticket.ticketID;
          const {
            time: DTime,
            day: DDay,
            dayName: DDayName,
            month: DMonth,
            year: DYear,
          } = parseDateTime(ticket.flight.departureTime);
          const {
            time: ATime,
            day: ADay,
            dayName: ADayName,
            month: AMonth,
            year: AYear,
          } = parseDateTime(ticket.flight.arrivalTime);
          return (
            <li
              onMouseEnter={() => handleHover(ticket.ticketID)}
              onMouseLeave={handleHoverOut}
              key={ticket.ticketID}
              className="relative w-full bg-wheet rounded-lg border-accent border-[2px] flex flex-col justify-center py-4 items-center"
            >
              {isHovered && (
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleDeleteTicket(ticket.ticketID)}
                  className="absolute top-5 left-5 bg-accent text-wheet p-1 h-[15px] w-[15px] rounded-full cursor-pointer active:scale-90 transition-all"
                />
              )}
              <div className="flex w-full items-center justify-evenly">
                <div className="text-center">
                  <h3 className="text-xs mb-2">DEPARTURE</h3>
                  <p className="text-sm font-semibold">
                    {ticket.flight.departureAirport.city},{" "}
                    {ticket.flight.departureAirport.country}
                  </p>
                  <p className="text-xs opacity-50">
                    {ticket.flight.departureAirport.name}
                  </p>
                  <div className="mt-6">
                    <p className="text-primary font-semibold uppercase">
                      {DDayName}, {DDay} {DMonth}
                    </p>
                    <p className="text-xl mt-1  opacity-50">{DTime}</p>
                  </div>
                </div>
                <div className="text-center flex flex-col justify-center items-center">
                  <h3 className="text-xs mb-2">FLIGHT TIME</h3>
                  <p className="text-sm font-semibold">{DTime}</p>
                  <img
                    src="../src/assets/direct-flight.png"
                    alt=""
                    className="h-[50px]"
                  />
                  <div>
                    <h3 className="text-sm text-secondary">
                      {ticket.flight.airline.name}
                    </h3>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xs mb-2">ARRIVAL</h3>
                  <p className="text-sm font-semibold">
                    {ticket.flight.arrivalAirport.city},{" "}
                    {ticket.flight.arrivalAirport.country}
                  </p>
                  <p className="text-xs opacity-50">
                    {ticket.flight.arrivalAirport.name}
                  </p>
                  <div className="mt-6">
                    <p className="text-primary font-semibold uppercase">
                      {ADayName}, {ADay} {AMonth}
                    </p>
                    <p className="text-xl mt-1  opacity-50">{ATime}</p>
                  </div>
                </div>
              </div>
              <div className="border-dashed border-[1px] border-accent w-full m-4"></div>
              <div className="flex justify-evenly items-center w-full">
                <div className="text-center">
                  <h3 className="text-xs mb-1">PASSENGER</h3>
                  <p className="text-sm font-semibold">
                    {ticket.passenger.fullName}
                  </p>
                </div>
                <div>
                  <div className="text-center">
                    <h3 className="text-xs mb-1">BOOKING DATE</h3>
                    <p className="text-sm font-semibold">
                      {ticket.bookingDate}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="text-center">
                    <h3 className="text-xs mb-1">SEAT NUMBER</h3>
                    <p className="text-sm font-semibold">{ticket.seatNumber}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tickets;
