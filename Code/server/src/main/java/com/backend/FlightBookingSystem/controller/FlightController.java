package com.backend.FlightBookingSystem.controller;

import com.backend.FlightBookingSystem.model.Flight;
import com.backend.FlightBookingSystem.repository.FlightRowMapper;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public List<Flight> getFlights(@RequestParam(required = false) String sortBy,
                                   @RequestParam(required = false) String sortOrder) {
        String query = constructQuery(sortBy, sortOrder);
        return jdbcTemplate.query(query, new FlightRowMapper());
    }

    private String constructQuery(String sortBy, String sortOrder) {
        return "SELECT Flight.*," +
                       "Airline.Name AS AirlineName, " +
                       "Departure.Name AS DepartureAirport, " +
                       "Departure.Country AS DepartureCountry, " +
                       "Departure.City AS DepartureCity, " +
                       "Arrival.Name AS ArrivalAirport, " +
                       "Arrival.Country AS ArrivalCountry, " +
                       "Arrival.City AS ArrivalCity " +
               "FROM Flight JOIN Airline ON Flight.AirlineID = Airline.AirlineID " +
               "JOIN Airport AS Departure ON Flight.Departure = Departure.AirportID " +
               "JOIN Airport AS Arrival ON Flight.Arrival = Arrival.AirportID " +
               "ORDER BY " + sortBy + " " + sortOrder;
    }

    @GetMapping("/getAvg&Sum")
    public List<Double> getAvg_Sum() {
        String avgQuery = "SELECT AVG(Price) FROM Flight;";
        String sumQuery = "SELECT SUM(Price) FROM Flight;";

        Double averagePrice = jdbcTemplate.queryForObject(avgQuery, Double.class);
        Double totalSum = jdbcTemplate.queryForObject(sumQuery, Double.class);

        return List.of(averagePrice, totalSum);
    }


    @GetMapping("/search")
    public List<Flight> searchFlights(
            @RequestParam("departureCity") String departureCity,
            @RequestParam("arrivalCity") String destinationCity,
            @RequestParam("departureDate") String departureDate,
            @RequestParam("arrivalDate") String arrivalDate) {

        String searchQuery = """
                SELECT Flight.*,
                    Airline.Name AS AirlineName,
                    Departure.Name AS DepartureAirport,
                    Departure.Country AS DepartureCountry,
                    Departure.City AS DepartureCity,
                    Arrival.Name AS ArrivalAirport,
                    Arrival.Country AS ArrivalCountry,
                    Arrival.City AS ArrivalCity
                FROM Flight JOIN Airline ON Flight.AirlineID = Airline.AirlineID
                JOIN Airport AS Departure ON Flight.Departure = Departure.AirportID
                JOIN Airport AS Arrival ON Flight.Arrival = Arrival.AirportID
                WHERE Departure.City = ? AND Arrival.City = ? AND DATE(Flight.DTime) = ? AND DATE(Flight.ATime) = ?
                ORDER BY FlightID;
                """;

        return jdbcTemplate.query(searchQuery, new FlightRowMapper(),
                departureCity, destinationCity, departureDate, arrivalDate);
    }

    @GetMapping("/{flightId}")
    public ResponseEntity<Flight> getFlight(@PathVariable int flightId) {
        String query = """
                SELECT FlightDetails.*,
                    Airline.Name AS AirlineName,
                    Departure.Name AS DepartureAirport,
                    Departure.Country AS DepartureCountry,
                    Departure.City AS DepartureCity,
                    Arrival.Name AS ArrivalAirport,
                    Arrival.Country AS ArrivalCountry,
                    Arrival.City AS ArrivalCity
                FROM (
                    SELECT Flight.* 
                    FROM Flight 
                    JOIN Airline ON Flight.AirlineID = Airline.AirlineID
                    JOIN Airport AS Departure ON Flight.Departure = Departure.AirportID
                    JOIN Airport AS Arrival ON Flight.Arrival = Arrival.AirportID
                    WHERE FlightID = ?
                ) AS FlightDetails
                JOIN Airline ON FlightDetails.AirlineID = Airline.AirlineID
                JOIN Airport AS Departure ON FlightDetails.Departure = Departure.AirportID
                JOIN Airport AS Arrival ON FlightDetails.Arrival = Arrival.AirportID;
                """;

        try {
            Flight flight = jdbcTemplate.queryForObject(query, new Object[]{flightId}, new FlightRowMapper());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(flight);
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<Flight> addFlight(@RequestBody Map<String, String> body) {
        if (body.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        String airlineName = body.get("airline");
        String departureAirport = body.get("departureAirport");
        String arrivalAirport = body.get("arrivalAirport");
        String flightNO = body.get("flightNO");
        LocalDateTime departureTime = LocalDateTime.parse(body.get("departureTime"));
        LocalDateTime arrivalTime = LocalDateTime.parse((body.get("arrivalTime")));
        double price = Double.parseDouble(body.get("price"));


        String existingFlightQuery = "SELECT COUNT(*) FROM Flight WHERE FlightNO = ?";
        int existingFlightCount = jdbcTemplate.queryForObject(existingFlightQuery, new Object[]{flightNO}, Integer.class);

        if (existingFlightCount > 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        String airlineIDQuery = "SELECT AirlineID FROM Airline WHERE Name = ?";
        int airlineID = jdbcTemplate.queryForObject(airlineIDQuery, new Object[]{airlineName}, Integer.class);

        String departureIDQuery = "SELECT AirportID FROM Airport WHERE Name = ?";
        int departureID = jdbcTemplate.queryForObject(departureIDQuery, new Object[]{departureAirport}, Integer.class);

        String arrivalIDQuery = "SELECT AirportID FROM Airport WHERE Name = ?";
        int arrivalID = jdbcTemplate.queryForObject(arrivalIDQuery, new Object[]{arrivalAirport}, Integer.class);

        String insertQuery = "INSERT INTO Flight (AirlineID, FlightNO, Departure, Arrival, DTime, ATime, Price) VALUES (?, ?, ?, ?, ?, ?, ?)";
        int rowsAffected = jdbcTemplate.update(insertQuery, airlineID, flightNO, departureID, arrivalID, departureTime, arrivalTime, price);

        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{flightID}")
    public ResponseEntity<Flight> updateFlight(@PathVariable int flightID, @RequestBody Map<String, String> body) {
        if (body.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        String airlineName = body.get("airline");
        String departureAirport = body.get("departureAirport");
        String arrivalAirport = body.get("arrivalAirport");
        String flightNO = body.get("flightNO");
        LocalDateTime departureTime = LocalDateTime.parse(body.get("departureTime"));
        LocalDateTime arrivalTime = LocalDateTime.parse((body.get("arrivalTime")));
        double price = Double.parseDouble(body.get("price"));

        String airlineIDQuery = "SELECT AirlineID FROM Airline WHERE Name = ?";
        int airlineID = jdbcTemplate.queryForObject(airlineIDQuery, new Object[]{airlineName}, Integer.class);

        String departureIDQuery = "SELECT AirportID FROM Airport WHERE Name = ?";
        int departureID = jdbcTemplate.queryForObject(departureIDQuery, new Object[]{departureAirport}, Integer.class);

        String arrivalIDQuery = "SELECT AirportID FROM Airport WHERE Name = ?";
        int arrivalID = jdbcTemplate.queryForObject(arrivalIDQuery, new Object[]{arrivalAirport}, Integer.class);

        String updateQuery = "UPDATE Flight SET AirlineID = ?, FlightNO = ?, Departure = ?, Arrival = ?, DTime = ?, ATime = ?, Price = ? WHERE FlightID = ?";
        int rowsAffected = jdbcTemplate.update(
                updateQuery,
                airlineID,
                flightNO,
                departureID,
                arrivalID,
                departureTime,
                arrivalTime,
                price,
                flightID
        );

        if (rowsAffected > 0) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{flightID}")
    public ResponseEntity<Flight> deleteFlight(@PathVariable int flightID) {
        String checkFlightQuery = "SELECT COUNT(*) FROM Flight WHERE FlightID = ?";
        int existingFlightCount = jdbcTemplate.queryForObject(checkFlightQuery, new Object[]{flightID}, Integer.class);

        if (existingFlightCount == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        String deleteQuery = "DELETE FROM Flight WHERE FlightID = ?";
        int rowsAffected = jdbcTemplate.update(deleteQuery, flightID);

        if (rowsAffected > 0) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


