import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const SearchFlight = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    return navigate("/searchFlight/results", { state: { searchData: data } });
  };

  return (
    <section className="flex justify-between">
      <form
        className="max-w-md mx-auto mt-24 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-lg mb-6">Search Flight</h1>
        {/* Departure and Destination City */}
        <div className="flex mb-4">
          {/* Departure City */}
          <div className="flex flex-col mr-4">
            <label className="mb-2 text-sm font-bold" htmlFor="departureCity">
              Departure City:
            </label>
            <input
              className="p-2 border border-accent rounded"
              type="text"
              id="departureCity"
              name="departureCity"
              required
              {...register("departureCity", { required: true })}
            />
          </div>

          {/* Destination City */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold" htmlFor="destinationCity">
              Destination City:
            </label>
            <input
              className="p-2 border border-accent rounded"
              type="text"
              id="destinationCity"
              name="destinationCity"
              required
              {...register("arrivalCity", { required: true })}
            />
          </div>
        </div>

        {/* Departure Date and Return Date */}
        <div className="flex mb-4">
          {/* Departure Date */}
          <div className="flex flex-col mr-4 w-full">
            <label className="mb-2 text-sm font-bold" htmlFor="departureDate">
              Departure Date:
            </label>
            <input
              className="w-full p-2 border border-accent rounded"
              type="date"
              id="departureDate"
              name="departureDate"
              required
              {...register("departureDate", { required: true })}
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col w-full">
            <label className="mb-2 text-sm font-bold" htmlFor="returnDate">
              Arrival Date:
            </label>
            <input
              className="w-full p-2 border border-accent rounded"
              type="date"
              id="returnDate"
              name="returnDate"
              required
              {...register("arrivalDate", { required: true })}
            />
          </div>
        </div>

        {/* Non-stop Flights */}
        <div className="flex items-center mb-4">
          <input className="mr-2" type="checkbox" id="nonStop" name="nonStop" />
          <label className="text-sm font-bold text-gray-700" htmlFor="nonStop">
            Non-stop Flights
          </label>
        </div>

        {/* Search Button */}
        <button
          className="bg-primary py-2 w-full rounded text-wheet hover:bg-accent transition-all"
          type="submit"
        >
          Search
        </button>
        <p className="text-center text-sm mt-2">
          Or{" "}
          <NavLink
            to="/all-flights"
            className={"hover:underline hover:text-secondary"}
          >
            Show All Flights
          </NavLink>
        </p>
      </form>

      <img
        src="../src/assets/bg1.jpg"
        alt="backgroundImage"
        className="h-[600px]"
      />
    </section>
  );
};

export default SearchFlight;
