package com.abc.restaurant.controllers;

import com.abc.restaurant.entities.EnqAllo;
import com.abc.restaurant.services.EnqAlloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enq-allo")
@CrossOrigin(origins = "http://localhost:3000")
public class EnqAlloController {

    @Autowired
    private EnqAlloService enqAlloService;

    @PostMapping("/save")
    public ResponseEntity<EnqAllo> saveResponseAndLinkEnqAllo(
            @RequestParam Long enquiryId,
            @RequestParam String comments,
            @RequestParam String user) {
        EnqAllo enqAllo = enqAlloService.saveResponseAndLinkEnqAllo(enquiryId, comments, user);
        return ResponseEntity.ok(enqAllo);
    }
}
