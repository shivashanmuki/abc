package com.abc.restaurant.utils;

// EnquiriesWithResponses.java
import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.ResponseEnq;

import java.util.List;

public class EnquiriesWithResponses {

    private Enquiries enquiries;
    private List<ResponseEnq> responses;

    public EnquiriesWithResponses(Enquiries enquiries, List<ResponseEnq> responses) {
        this.enquiries = enquiries;
        this.responses = responses;
    }

    // Getters and setters
    public Enquiries getEnquiries() {
        return enquiries;
    }

    public void setEnquiries(Enquiries enquiries) {
        this.enquiries = enquiries;
    }

    public List<ResponseEnq> getResponses() {
        return responses;
    }

    public void setResponses(List<ResponseEnq> responses) {
        this.responses = responses;
    }
}
