import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Contact() {
  return (
    <div className="flex justify-between items-center h-[80vh] px-20">
      <div>
        <h1 className="uppercase opacity-50">TED University</h1>
        <h2 className="font-semibold text-lg uppercase ">
          About Us - Flight Booking System
        </h2>
        <p>Group 14 - CMPE 232 (Database System Project Assignment)</p>
        <h3 className="font-semibold mt-10">Ahmad Fardous Azimi: </h3>
        <ul className="list-disc ml-10">
          <li>Frontend of the project using React.js and TailwindCSS.</li>
          <li>Backend of the project using Spring Boot Java.</li>
        </ul>
        <h3 className="font-semibold mt-2">Daniel Anih: </h3>
        <ul className="list-disc ml-10">
          <li>Project Drafting and Designing.</li>
          <li>Database of the project using MySQL.</li>
        </ul>
        <div className="mt-10">
          <p className="font-semibold mb-4">SOCIALS</p>
          <a
            href="https://github.com/azimifardous"
            target="_blank"
            className="mr-2  hover:text-primary"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/azimifardous/"
            target="_blank"
            className=" hover:text-primary"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </a>
        </div>
      </div>
      <img src="../src/assets/bg3.jpg" alt="Bg3" className="h-[500px]" />
    </div>
  );
}
