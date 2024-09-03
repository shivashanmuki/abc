package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<AdminUser, Long>  {
    Optional<AdminUser> findByEmail(String email);
}
