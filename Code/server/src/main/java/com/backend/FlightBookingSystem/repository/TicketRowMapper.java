package com.backend.FlightBookingSystem.repository;

import com.backend.FlightBookingSystem.model.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;


public class TicketRowMapper implements RowMapper<Ticket> {
    @Override
    public Ticket mapRow(ResultSet rs, int rowNum) throws SQLException {
        Ticket ticket = new Ticket();
        ticket.setTicketID(rs.getInt("TicketID"));
        ticket.setBookingDate(LocalDate.parse(rs.getString("BookingDate")));
        ticket.setSeatNumber(rs.getString("SeatNumber"));
        ticket.setPassenger(fetchPassengerFromResultSet(rs));
        ticket.setFlight(fetchFlightFromResultSet(rs));
        return ticket;
    }

    private Flight fetchFlightFromResultSet(ResultSet rs) throws SQLException {
        Flight flight = new Flight();
        flight.setFlightID(rs.getInt("FlightID"));

        flight.setAirline(fetchAirlineFromResultSet(rs));
        flight.setDepartureAirport(fetchDepartureAirportFromResultSet(rs));
        flight.setArrivalAirport(fetchArrivalAirportFromResultSet(rs));
        flight.setDepartureTime(rs.getTimestamp("DTime").toLocalDateTime());
        flight.setArrivalTime(rs.getTimestamp("ATime").toLocalDateTime());
        flight.setPrice(rs.getDouble("Price"));
        flight.setFlightNO(rs.getString("FlightNO"));
        return flight;
    }

    private Airline fetchAirlineFromResultSet(ResultSet resultSet) throws SQLException {
        Airline airline = new Airline();
        airline.setAirlineID(resultSet.getInt("AirlineID"));
        airline.setName(resultSet.getString("AirlineName"));
        return airline;
    }

    private Airport fetchDepartureAirportFromResultSet(ResultSet resultSet) throws SQLException {
        Airport airport = new Airport();
        airport.setAirportID(resultSet.getInt("Departure"));
        airport.setName(resultSet.getString("DepartureAirport"));
        airport.setCountry(resultSet.getString("DepartureCountry"));
        airport.setCity(resultSet.getString("DepartureCity"));
        return airport;
    }

    private Airport fetchArrivalAirportFromResultSet(ResultSet resultSet) throws SQLException {
        Airport airport = new Airport();
        airport.setAirportID(resultSet.getInt("Arrival"));
        airport.setName(resultSet.getString("ArrivalAirport"));
        airport.setCountry(resultSet.getString("ArrivalCountry"));
        airport.setCity(resultSet.getString("ArrivalCity"));
        return airport;
    }

    private Passenger fetchPassengerFromResultSet(ResultSet rs) throws SQLException {
        Passenger passenger = new Passenger();
        passenger.setPassengerID(rs.getInt("PassengerID"));
        passenger.setFullName(rs.getString("FullName"));
        passenger.setPhoneNo(rs.getString("PhoneNo"));
        passenger.setAddress(rs.getString("Address"));
        passenger.setGender(rs.getString("Gender").charAt(0));
        passenger.setEmail(rs.getString("Email"));
        passenger.setDateOfBirth(LocalDate.parse(rs.getString("DateOfBirth")));
        return passenger;
    }
}
