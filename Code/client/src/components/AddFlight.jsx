import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const [airlines, setAirlines] = useState(null);
  const [airports, setAirports] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    flightNO: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await Axios.post("http://localhost:8080/flights", formData);
      navigate("/all-flights");
    } catch (error) {
      console.error("Error submitting flight data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response1 = await Axios.get("http://localhost:8080/airlines");
      setAirlines(response1.data);
      const response2 = await Axios.get("http://localhost:8080/airports");
      setAirports(response2.data);
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
  return (
    <section className="flex flex-col justify-center items-center my-10">
      <h2 className="font-bold text-primary text-xl mb-4">Add a New Flight</h2>
      <form className="w-1/3 text-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Airline</label>
          <select
            name="airline"
            className="mt-1 p-2 w-full border rounded-md text-sm"
            onChange={handleInputChange}
          >
            <option selected disabled>
              Select an Airline
            </option>
            {airlines.map((airline) => (
              <option key={airline.airlineID} value={airline.name}>
                {airline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="flightNo" className="text-sm block mb-1">
            Flight No.
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            name="flightNO"
            maxLength={5}
            className="border border-accent w-full rounded-md p-2 text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Departure Airport</label>
          <select
            name="departureAirport"
            className="mt-1 p-2 w-full border rounded-md text-sm"
            onChange={handleInputChange}
          >
            <option disabled selected>
              Select an Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.airportID} value={airport.name}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm">Arrival Airport</label>
          <select
            name="arrivalAirport"
            className="mt-1 p-2 w-full border rounded-md text-sm"
            onChange={handleInputChange}
          >
            <option selected disabled>
              Select an Airport
            </option>
            {airports.map((airport) => (
              <option key={airport.airportID} value={airport.name}>
                {airport.name}
              </option>
            ))}
          </select>
          <div className="flex justify-between">
            <div className="mt-4 w-full mr-4">
              <label htmlFor="departureTime" className="block text-sm">
                Departure Date
              </label>
              <input
                className="border border-accent mt-1 rounded p-1 text-sm w-full"
                type="datetime-local"
                name="departureTime"
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-4 w-full">
              <label htmlFor="arrivalTime" className="block text-sm">
                Arrival Date
              </label>
              <input
                className="border border-accent mt-1 rounded p-1 text-sm w-full"
                type="datetime-local"
                name="arrivalTime"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm">
            Price
          </label>
          <input
            name={"price"}
            onChange={handleInputChange}
            type="number"
            className="border border-accent mt-1 rounded p-2 text-sm w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary w-full py-1 rounded-md text-wheet mt-4"
          >
            Add New
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddFlight;
