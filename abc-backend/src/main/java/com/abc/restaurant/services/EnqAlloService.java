package com.abc.restaurant.services;

import com.abc.restaurant.entities.EnqAllo;
import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.ResponseEnq;
import com.abc.restaurant.repositories.EnqAlloRepository;
import com.abc.restaurant.repositories.EnquiriesRepository;
import com.abc.restaurant.repositories.ResponseEnqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnqAlloService {

    @Autowired
    private EnqAlloRepository enqAlloRepository;

    @Autowired
    private EnquiriesRepository enquiriesRepository;

    @Autowired
    private ResponseEnqRepository responseEnqRepository;

    public EnqAllo saveResponseAndLinkEnqAllo(Long enquiryId, String comments, String user) {
        // First, find the Enquiries entity by ID
        Optional<Enquiries> enquiriesOpt = enquiriesRepository.findById(enquiryId);

        if (enquiriesOpt.isPresent()) {
            Enquiries enquiries = enquiriesOpt.get();

            // Save the new ResponseEnq entity
            ResponseEnq responseEnq = new ResponseEnq();
            responseEnq.setComments(comments);
            responseEnq.setUser(user);
            responseEnq = responseEnqRepository.save(responseEnq);

            // Create and save the EnqAllo entity
            EnqAllo enqAllo = new EnqAllo();
            enqAllo.setEnquiries(enquiries);
            enqAllo.setResponseEnq(responseEnq);

            return enqAlloRepository.save(enqAllo);
        } else {
            throw new RuntimeException("Enquiries not found");
        }
    }
}
