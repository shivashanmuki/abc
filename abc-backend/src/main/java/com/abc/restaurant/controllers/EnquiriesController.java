package com.abc.restaurant.controllers;

import com.abc.restaurant.dto.EnquiriesDto;
import com.abc.restaurant.entities.EnqAllo;
import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.Users;
import com.abc.restaurant.services.EnquiriesService;
import com.abc.restaurant.utils.EnquiriesWithResponses;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("enquiries")
@CrossOrigin(origins = "http://localhost:3000")
public class EnquiriesController {
    @Autowired
    EnquiriesService enquiriesService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<Enquiries>> addEnquiries (@RequestBody EnquiriesDto enquiriesDto){
       Enquiries addedEnq = enquiriesService.addEnquiries(enquiriesDto);

       if(addedEnq != null){
           return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                   200,
                   "Added",
                   null
           ));
       }
       else {
           return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                   500,
                   "Internal server error",
                   null
           ));
       }

    }
//
//    @GetMapping("/{email}")
//    public ResponseEntity<ResponseWrapper<List<Enquiries>>> getEnqByUser(@PathVariable String email){
//        List<Enquiries> enquiries = enquiriesService.getByUser(email);
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
//                200,
//                "Success",
//                enquiries
//        ));
//    }

@GetMapping("/user/{email}")
public ResponseEntity<ResponseWrapper<List<EnquiriesWithResponses>>> getEnquiriesWithResponsesByUser(@PathVariable String email) {
    List<EnquiriesWithResponses> enquiriesWithResponses = enquiriesService.getEnquiriesWithResponsesByUser(email);
    return ResponseEntity.ok(new ResponseWrapper<>(200, "Success", enquiriesWithResponses));
}
    @GetMapping("/with-responses")
    public ResponseEntity<List<EnquiriesWithResponses>> getAllEnquiriesWithResponses() {
        List<EnquiriesWithResponses> enquiriesWithResponses = enquiriesService.getAllEnquiriesWithResponses();
        return ResponseEntity.ok(enquiriesWithResponses);
    }

    @GetMapping("/eng-allo/{id}")
    public ResponseEntity<ResponseWrapper<List<EnqAllo>>> getByEnquiries (@PathVariable Long id){
        List<EnqAllo> enqAllos = enquiriesService.getAllResponseEnqByEnquiries(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                200,
                "Success",
                enqAllos
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteEnquiries (@PathVariable Long id) {
        if (enquiriesService.deleteEnquiries(id)) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Deleted",
                    null
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    "Internal Server Error",
                    null
            ));
        }
    }

}
