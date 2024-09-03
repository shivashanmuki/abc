package com.abc.restaurant.controllers;


import com.abc.restaurant.entities.Services;
import com.abc.restaurant.services.ServicesService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

    @Autowired
    private ServicesService serviceService;

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Services>>> getAllServices() {
        List<Services> services = serviceService.getAllServices();
        return ResponseEntity.ok(new ResponseWrapper<>(
                HttpStatus.OK.value(),
                "Fetched all services",
                services
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Services>> getServiceById(@PathVariable Long id) {
        Optional<Services> service = serviceService.getServiceById(id);
        return service.map(services -> ResponseEntity.ok(new ResponseWrapper<>(
                HttpStatus.OK.value(),
                "Fetched service by ID",
                services
        ))).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                HttpStatus.NOT_FOUND.value(),
                "Service not found",
                null
        )));
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<Services>> createService(@RequestBody Services service) {
        Services createdService = serviceService.createService(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                HttpStatus.CREATED.value(),
                "Service created successfully",
                null
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Services>> updateService(@PathVariable Long id, @RequestBody Services serviceDetails) {
        try {
            Services updatedService = serviceService.updateService(id, serviceDetails);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    HttpStatus.OK.value(),
                    "Service updated successfully",
                    null
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    HttpStatus.NOT_FOUND.value(),
                    e.getMessage(),
                    null
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteService(@PathVariable Long id) {
        try {
            serviceService.deleteService(id);
            return ResponseEntity.ok(new ResponseWrapper<>(
                    HttpStatus.OK.value(),
                    "Service deleted successfully",
                    null
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    HttpStatus.NOT_FOUND.value(),
                    "Service not found",
                    null
            ));
        }
    }
}
