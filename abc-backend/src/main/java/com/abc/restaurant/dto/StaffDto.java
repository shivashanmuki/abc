package com.abc.restaurant.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String address;
    private String phone;
}
