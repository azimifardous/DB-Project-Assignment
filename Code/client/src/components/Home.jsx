import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex items-center justify-center py-2 px-10">
      <img src="../src/assets/bg2.jpg" alt="BG 2" className="h-[580px]" />
      <div className="ml-6">
        <h1 className="text-6xl font-bold text-primary">
          Welcome to the Flight Booking System
        </h1>
        <p className="text-accent mt-4 text-justify text-lg mb-4">
          Plan your journey with ease using our Flight Booking System. Explore a
          wide range of destinations, find the best flights, and make
          hassle-free bookings. Your journey begins with us!
        </p>
        <NavLink
          to="/all-flights"
          className="bg-secondary py-2 px-6 rounded-xl text-wheet hover:bg-opacity-95"
        >
          Book Flight...
        </NavLink>
      </div>
    </section>
  );
};

export default Home;
