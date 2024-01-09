package com.backend.FlightBookingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int PassengerID;

    private String FullName;
    private String Email;
    private String Address;
    private String PhoneNo;
    private char Gender;
    private LocalDate DateOfBirth;

    public int getPassengerID() {
        return PassengerID;
    }
    public void setPassengerID(int passengerID) {
        PassengerID = passengerID;
    }
    public String getFullName() {
        return FullName;
    }
    public void setFullName(String fullName) {
        FullName = fullName;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String address) {
        Address = address;
    }
    public String getPhoneNo() {
        return PhoneNo;
    }
    public void setPhoneNo(String phoneNo) {
        PhoneNo = phoneNo;
    }
    public char getGender() {
        return Gender;
    }
    public void setGender(char gender) {
        Gender = gender;
    }
    public LocalDate getDateOfBirth() {
        return DateOfBirth;
    }
    public void setDateOfBirth(LocalDate dateOfBirth) {
        DateOfBirth = dateOfBirth;
    }
}
