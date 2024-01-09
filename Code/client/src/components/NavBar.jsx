import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="px-14 py-6 flex justify-between bg-wheet rounded-xl">
      <NavLink to={"/home"}>
        <img
          src="../src/assets/logo.png"
          alt="Logo"
          className="h-8 cursor-pointer"
        />
      </NavLink>
      <ul className="flex justify-between w-1/3">
        <li className="hover:text-primary transition-all">
          <NavLink
            to={"/home"}
            style={({ isActive }) =>
              isActive ? { color: "#8762EF" } : { color: "" }
            }
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text-primary">
          <NavLink
            to={"/searchFlight"}
            style={({ isActive }) =>
              isActive ? { color: "#8762EF" } : { color: "" }
            }
          >
            Search Flight
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/tickets"}
            className="hover:text-primary transition-all"
            style={({ isActive }) =>
              isActive ? { color: "#8762EF" } : { color: "" }
            }
          >
            Tickets
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/aboutus"}
            className="hover:text-primary transition-all"
            style={({ isActive }) =>
              isActive ? { color: "#8762EF" } : { color: "" }
            }
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
