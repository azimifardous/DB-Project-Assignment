package com.backend.FlightBookingSystem.controller;

import com.backend.FlightBookingSystem.model.Ticket;
import com.backend.FlightBookingSystem.repository.TicketRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Ticket> getTickets() {
        String query = """
                SELECT t.TicketID, t.BookingDate, t.SeatNumber, f.*, p.*,
                     Airline.Name AS AirlineName,
                     Departure.Name AS DepartureAirport,
                     Departure.Country AS DepartureCountry,
                     Departure.City AS DepartureCity,
                     Arrival.Name AS ArrivalAirport,
                     Arrival.Country AS ArrivalCountry,
                     Arrival.City AS ArrivalCity
                 FROM Ticket t
                 INNER JOIN Passenger p ON p.PassengerID = t.PassengerID
                 INNER JOIN Flight f ON f.FlightID = t.FlightID
                 INNER JOIN Airline ON Airline.AirlineID = f.AirlineID
                 INNER JOIN Airport Departure ON Departure.AirportID = f.Departure
                 INNER JOIN Airport Arrival ON Arrival.AirportID = f.Arrival;""";
        return jdbcTemplate.query(query, new TicketRowMapper());
    }

    @DeleteMapping("/{ticketID}")
    public ResponseEntity<Ticket> deleteTicket(@PathVariable int ticketID){
        String checkTicketQuery = "SELECT COUNT(*) FROM Ticket WHERE TicketID = ?";
        int existingFlightCount = jdbcTemplate.queryForObject(checkTicketQuery, new Object[]{ticketID}, Integer.class);

        if (existingFlightCount == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        String deleteQuery = "DELETE FROM Ticket WHERE TicketID = ?";
        int rowsAffected = jdbcTemplate.update(deleteQuery, ticketID);

        if (rowsAffected > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
