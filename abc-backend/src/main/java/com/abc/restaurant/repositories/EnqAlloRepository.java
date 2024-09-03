package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.EnqAllo;
import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.ResponseEnq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnqAlloRepository extends JpaRepository<EnqAllo, Long> {
    List<EnqAllo> findByEnquiries(Enquiries enquiries);
    List<EnqAllo> findByResponseEnq(ResponseEnq responseEnq);
}
