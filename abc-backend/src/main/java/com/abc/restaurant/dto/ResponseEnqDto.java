package com.abc.restaurant.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ResponseEnqDto {
    private Long id;
    private String comments;
    private String user;
    private LocalDate date;
}