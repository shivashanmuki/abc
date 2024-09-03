package com.abc.restaurant.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ResponseEnq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    private String comments;
    @Column
    private String user;
    @Column
    private final LocalDate date = LocalDate.now();

    @JsonIgnore
    @OneToMany(mappedBy = "responseEnq", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    List<EnqAllo> enqAllos = new ArrayList<>();


}
