package com.abc.restaurant.repositories;

import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.ResponseEnq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ResponseEnqRepository extends JpaRepository<ResponseEnq, Long> {
  //  List<ResponseEnq> findByEnquiriesId(Long enquiriesId);
  List<ResponseEnq> findByIdIn(List<Long> ids);
}
