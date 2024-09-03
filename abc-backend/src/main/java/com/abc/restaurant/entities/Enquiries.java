package com.abc.restaurant.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Enquiries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private LocalDate date = LocalDate.now();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
    @Column
    private String comments;
    @Column
    private String email;
    @Column
    private String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "enquiries", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    List<EnqAllo> enqAllos = new ArrayList<>();

}
