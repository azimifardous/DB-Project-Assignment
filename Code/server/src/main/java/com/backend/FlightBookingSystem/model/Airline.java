package com.backend.FlightBookingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int AirlineID;
    private String name;

    public void setAirlineID(int airlineID) {
        AirlineID = airlineID;
    }
    public int getAirlineID() {
        return AirlineID;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
