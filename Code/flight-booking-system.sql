CREATE DATABASE `flight-booking-system`;
USE `flight-booking-system`;

CREATE TABLE Airline (
    AirlineID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

INSERT INTO Airline (AirlineID, Name)
VALUES
    (1001, 'Turkish Airlines'),
    (1002, 'Qatar Airways'),
    (1003, 'Fly Dubai'),
    (1004, 'Fly Emirates'),
    (1005, 'Lufthansa'),
    (1006, 'Singapore Airlines'),
    (1007, 'AirlineX'),
    (1008, 'SkyHigh Airlines'),
    (1009, 'BlueWings'),
    (1010, 'StarFly');



CREATE TABLE Airport (
    AirportID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Country VARCHAR(255),
    City VARCHAR(255)
);

INSERT INTO Airport (AirportID, Name, Country, City)
VALUES
    (2001, 'Istanbul Atatürk Airport', 'Turkey', 'Istanbul'),
    (2002, 'Hamad International Airport', 'Qatar', 'Doha'),
    (2003, 'Heathrow Airport', 'UK', 'London'),
    (2004, 'Dubai International Airport', 'UAE', 'Dubai'),
    (2005, 'Frankfurt Airport', 'Germany', 'Frankfurt'),
    (2006, 'Changi Airport', 'Singapore', 'Singapore'),
    (2007, 'JFK International Airport', 'USA', 'New York'),
    (2008, 'Charles de Gaulle Airport', 'France', 'Paris'),
    (2009, 'Los Angeles International Airport', 'USA', 'Los Angeles'),
    (2010, 'Sydney Kingsford Smith Airport', 'Australia', 'Sydney');



CREATE TABLE Flight (
    FlightID INT AUTO_INCREMENT PRIMARY KEY,
    AirlineID INT,
    FlightNO VARCHAR(255),
    Departure INT,
    Arrival INT,
    DTime DATETIME,
    ATime DATETIME,
    Price DECIMAL(8, 2),
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID),
    FOREIGN KEY (Departure) REFERENCES Airport(AirportID),
    FOREIGN KEY (Arrival) REFERENCES Airport(AirportID)
);

INSERT INTO Flight (FlightID, AirlineID, FlightNO, Departure, Arrival, DTime, ATime, Price)
VALUES
    (3001, 1003, 'FD672', 2002, 2003, '2023-12-23 08:00:00', '2023-12-23 12:00:00', '450.00'),
    (3002, 1001, 'TK301', 2004, 2001, '2023-12-24 10:00:00', '2023-12-24 14:00:00', '300.00'),
    (3003, 1004, 'FE908', 2001, 2006, '2023-12-25 12:00:00', '2023-12-25 16:00:00', '600.00'),
    (3004, 1002, 'QA523', 2005, 2004, '2023-12-26 14:00:00', '2023-12-26 18:00:00', '1100.00'),
    (3005, 1006, 'SQ542', 2001, 2002, '2023-12-27 16:00:00', '2023-12-27 20:00:00', '100.00'),
    (3006, 1005, 'LA861', 2006, 2005, '2023-12-28 18:00:00', '2023-12-28 22:00:00', '320.00'),
    (3007, 1007, 'AX123', 2003, 2009, '2023-12-29 08:30:00', '2023-12-29 12:30:00', '400.00'),
    (3008, 1008, 'SA456', 2008, 2007, '2023-12-30 10:45:00', '2023-12-30 14:45:00', '550.00'),
    (3009, 1009, 'BW789', 2006, 2005, '2023-12-31 12:15:00', '2023-12-31 16:15:00', '700.00'),
    (3010, 1010, 'SF101', 2002, 2001, '2024-01-01 14:30:00', '2024-01-01 18:30:00', '480.00');



CREATE TABLE Passenger (
   PassengerID INT PRIMARY KEY, 
   FullName VARCHAR(255) NOT NULL, 
   Email VARCHAR(255), 
   PhoneNo VARCHAR(15), 
   Gender CHAR(1), 
   DateOfBirth DATE, 
   Address TEXT
);


INSERT INTO Passenger (PassengerID, FullName, Email, PhoneNo, Gender, DateOfBirth, Address)
VALUES
    (4001, 'John Smith', 'john.smith@email.com', '1234567890', 'M', '1985-01-15', '123 Main St, Cityville'),
    (4002, 'Jane Johnson', 'jane.johnson@email.com', '9876543210', 'F', '1980-05-20', '456 Oak St, Townsville'),
    (4003, 'Robert Davis', 'robert.davis@email.com', '5551112233', 'M', '1988-08-10', '789 Pine St, Villagetown'),
    (4004, 'Emily White', 'emily.white@email.com', '5554446677', 'F', '1992-03-12', '987 Pine Lane, Hilltop'),
    (4005, 'Michael Brown', 'michael.brown@email.com', '1239876543', 'M', '1982-09-28', '654 Cedar Road, Valley'),
    (4006, 'Sophia Taylor', 'sophia.taylor@email.com', '9871234560', 'F', '1990-11-05', '321 Elm Street, Riverside'),
    (4007, 'David Miller', 'david.miller@email.com', '1112223334', 'M', '1995-04-18', '789 Maple St, Grovetown'),
    (4008, 'Olivia Turner', 'olivia.turner@email.com', '5556667778', 'F', '1989-07-22', '456 Birch St, Lakewood'),
    (4009, 'Daniel Walker', 'daniel.walker@email.com', '9998887776', 'M', '1998-10-05', '123 Oak St, Woodville'),
    (4010, 'Ava Martinez', 'ava.martinez@email.com', '4443332220', 'F', '1993-12-08', '654 Pine Lane, Hillside');

CREATE TABLE Ticket (
  TicketID INT PRIMARY KEY, 
  PassengerID INT, 
  FlightID INT, 
  BookingDate DATE NOT NULL, 
  SeatNumber VARCHAR(10),
  FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID),
  FOREIGN KEY (FlightID) REFERENCES Flight(FlightId)
);

INSERT INTO Ticket (TicketID, PassengerID, FlightID, BookingDate, SeatNumber)
VALUES
    (5001, 4004, 3002, '2023-12-20', 'A101'),
    (5002, 4006, 3001, '2023-12-21', 'B202'),
    (5003, 4001, 3003, '2023-12-22', 'C303'),
    (5004, 4001, 3006, '2023-12-23', 'D404'),
    (5005, 4002, 3005, '2023-12-24', 'E505'),
    (5006, 4003, 3004, '2023-12-25', 'F606'),
    (5007, 4008, 3008, '2024-01-02', 'G707'),
    (5008, 4009, 3007, '2024-01-03', 'H808'),
    (5009, 4010, 3010, '2024-01-04', 'I909'),
    (5010, 4007, 3009, '2024-01-05', 'J1010');

