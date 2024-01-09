package com.backend.FlightBookingSystem.controller;


import com.backend.FlightBookingSystem.model.Airline;
import com.backend.FlightBookingSystem.repository.AirlineRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/airlines")
public class AirlineController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Airline> getAirlines() {
        String query = "SELECT * FROM Airline";
        return jdbcTemplate.query(query, new AirlineRowMapper());
    }
}
