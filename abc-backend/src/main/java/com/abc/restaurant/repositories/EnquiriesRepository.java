package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnquiriesRepository extends JpaRepository<Enquiries, Long> {
    List<Enquiries>findByUsers(Users users);
    List<Enquiries> findByEmail(String email);
}
