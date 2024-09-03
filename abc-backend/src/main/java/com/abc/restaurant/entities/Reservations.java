package com.abc.restaurant.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Reservations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate date;
    @Column
    private Timestamp time;
    @Column
    private String specialRequests;
    @Column
    private String paymentMethod;
    @Column
    private Integer numberOfPeople;
    @Column(nullable = true)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services service;

    @JsonIgnore
    @OneToMany(mappedBy = "reservations", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reserved> reserved = new ArrayList<>();



}
