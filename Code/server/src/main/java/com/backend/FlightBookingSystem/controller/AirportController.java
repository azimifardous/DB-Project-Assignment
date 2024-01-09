package com.backend.FlightBookingSystem.controller;


import com.backend.FlightBookingSystem.model.Airport;
import com.backend.FlightBookingSystem.repository.AirportRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/airports")
public class AirportController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Airport> getAirports() {
        String query = "SELECT * FROM Airport";
        return jdbcTemplate.query(query, new AirportRowMapper());
    }
}
