package com.backend.FlightBookingSystem.repository;

import com.backend.FlightBookingSystem.model.Airline;
import com.backend.FlightBookingSystem.model.Airport;
import com.backend.FlightBookingSystem.model.Flight;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class FlightRowMapper implements RowMapper<Flight> {

    @Override
    public Flight mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Flight flight = new Flight();
        flight.setFlightID(resultSet.getInt("FlightID"));
        flight.setAirline(fetchAirlineFromResultSet(resultSet));
        flight.setDepartureAirport(fetchDepartureAirportFromResultSet(resultSet));
        flight.setArrivalAirport(fetchArrivalAirportFromResultSet(resultSet));
        flight.setDepartureTime(resultSet.getTimestamp("DTime").toLocalDateTime());
        flight.setArrivalTime(resultSet.getTimestamp("ATime").toLocalDateTime());
        flight.setPrice(resultSet.getDouble("Price"));
        flight.setFlightNO(resultSet.getString("FlightNO"));
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
}
