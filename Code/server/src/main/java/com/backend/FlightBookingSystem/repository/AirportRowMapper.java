package com.backend.FlightBookingSystem.repository;

import com.backend.FlightBookingSystem.model.Airport;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AirportRowMapper implements RowMapper<Airport> {

    @Override
    public Airport mapRow(ResultSet rs, int rowNum) throws SQLException {
        Airport airport = new Airport();
        airport.setAirportID(rs.getInt("AirportID"));
        airport.setName(rs.getString("Name"));
        airport.setCity(rs.getString("City"));
        airport.setCountry(rs.getString("Country"));
        return airport;
    }
}
