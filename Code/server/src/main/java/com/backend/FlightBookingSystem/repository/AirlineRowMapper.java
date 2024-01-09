package com.backend.FlightBookingSystem.repository;

import com.backend.FlightBookingSystem.model.Airline;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AirlineRowMapper implements RowMapper<Airline> {
    @Override
    public Airline mapRow(ResultSet rs, int rowNum) throws SQLException {
        Airline airline = new Airline();
        airline.setName(rs.getString("Name"));
        airline.setAirlineID(rs.getInt("AirlineID"));
        return airline;
    }
}
