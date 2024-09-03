package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.Reservations;
import com.abc.restaurant.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationsRepository extends JpaRepository<Reservations, Long> {
    List<Reservations> findByUsers(Users user);
}
