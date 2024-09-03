package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.Reserved;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservedRepository extends JpaRepository<Reserved, Long> {
}
