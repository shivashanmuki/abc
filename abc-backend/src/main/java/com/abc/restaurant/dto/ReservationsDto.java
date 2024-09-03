package com.abc.restaurant.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
public class ReservationsDto {
    private Long id;
    private Timestamp time;
    private String specialRequests;
    private String paymentMethod;
    private Integer numberOfPeople;
  //  private Long userId;
    private String userId;
    private Long serviceId;
    private Boolean status;
    private Map<Long, Integer> product = new HashMap<>();
}
