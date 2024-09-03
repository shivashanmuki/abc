package com.abc.restaurant.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class EnqAllo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "enquiries_id")
    private Enquiries enquiries;

    @ManyToOne
    @JoinColumn(name = "response_enq")
    private ResponseEnq responseEnq;
}
