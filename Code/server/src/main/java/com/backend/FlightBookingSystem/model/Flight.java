package com.backend.FlightBookingSystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int FlightID;

    @OneToOne
    @JoinColumn(name = "AirlineID")
    private Airline airline;

    @ManyToOne
    @JoinColumn(name = "Departure")
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name = "Arrival")
    private Airport arrivalAirport;

    @Column(name = "DTime")
    private LocalDateTime departureTime;

    @Column(name = "ATime")
    private LocalDateTime arrivalTime;
    private String FlightNO;
    private double Price;

    public double getPrice() {
        return Price;
    }
    public void setPrice(double price) {
        Price = price;
    }
    public void setAirline(Airline airline) {
        this.airline = airline;
    }
    public void setArrivalAirport(Airport arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }
    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }
    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
    public void setFlightNO(String flightNO) {
        FlightNO = flightNO;
    }
    public Airport getArrivalAirport() {
        return arrivalAirport;
    }
    public LocalDateTime getDepartureTime() {
        return departureTime;
    }
    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }
    public Airport getDepartureAirport() {
        return departureAirport;
    }
    public String getFlightNO() {
        return FlightNO;
    }
    public int getFlightID() {
        return FlightID;
    }
    public void setFlightID(int flightID) {
        FlightID = flightID;
    }
    public void setDepartureAirport(Airport departureAirport) {
        this.departureAirport = departureAirport;
    }
    public Airline getAirline() {
        return airline;
    }
}