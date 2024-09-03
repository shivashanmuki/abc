package com.abc.restaurant.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String password;
    @Column
    private String address;
    @Column
    private String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL, orphanRemoval = true)
    List<Reservations> reservations = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL, orphanRemoval = true)
    List<Enquiries> enquiries = new ArrayList<>();

}
