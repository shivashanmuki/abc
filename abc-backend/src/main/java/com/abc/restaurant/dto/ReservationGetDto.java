package com.abc.restaurant.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class ReservationGetDto {
    private Long Id;
    private Timestamp time;
    private String specialRequests;
    private String paymentMethod;
    private Integer numberOfPeople;
    private String user;
    private String service;
    private Boolean status;
    private Map<String, Integer> product = new HashMap<>();
}
