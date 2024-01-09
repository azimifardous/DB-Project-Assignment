package com.backend.FlightBookingSystem.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int TicketID;

    @OneToOne
    @JoinColumn(name = "PassengerID")
    private Passenger passenger;

    @OneToOne
    @JoinColumn(name = "FlightID")
    private Flight flight;

    private LocalDate BookingDate;
    private String SeatNumber;

    public int getTicketID() {
        return TicketID;
    }
    public void setTicketID(int ticketID) {
        TicketID = ticketID;
    }
    public Passenger getPassenger() {
        return passenger;
    }
    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }
    public Flight getFlight() {
        return flight;
    }
    public void setFlight(Flight flight) {
        this.flight = flight;
    }
    public LocalDate getBookingDate() {
        return BookingDate;
    }
    public void setBookingDate(LocalDate bookingDate) {
        BookingDate = bookingDate;
    }
    public String getSeatNumber() {
        return SeatNumber;
    }
    public void setSeatNumber(String seatNumber) {
        SeatNumber = seatNumber;
    }
}
