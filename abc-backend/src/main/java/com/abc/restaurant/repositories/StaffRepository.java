package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.AdminUser;
import com.abc.restaurant.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByEmail(String email);
}
