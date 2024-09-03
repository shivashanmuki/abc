package com.abc.restaurant.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class EnquiriesResponseDto {
    private Long id;
    private String email;
    private String phone;
    private String comments;
    private LocalDate date;
    private List<ResponseEnqDto> responseEnqs;
}
