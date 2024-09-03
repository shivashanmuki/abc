package com.abc.restaurant.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EnquiriesDto {
    private Long id;
    private String email;
    private String providedEmail;
    private String phone;
    private String comments;

}
