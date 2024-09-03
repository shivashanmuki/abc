package com.abc.restaurant.controllers;

import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.dto.StaffDto;
import com.abc.restaurant.entities.AdminUser;
import com.abc.restaurant.entities.Staff;
import com.abc.restaurant.services.StaffService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("staff")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {

    @Autowired
    private StaffService staffService;
    @PostMapping("/staff-login")
    public ResponseEntity<ResponseWrapper<LoginResponse>> login(@RequestBody Staff loginRequest) {
        try {
            LoginResponse response = staffService.login(loginRequest.getEmail(), loginRequest.getPassword());
            ResponseWrapper<LoginResponse> responseWrapper = new ResponseWrapper<>(HttpStatus.OK.value(), "Login successful", response);
            return ResponseEntity.ok(responseWrapper);
        } catch (Exception e) {
            ResponseWrapper<LoginResponse> errorResponse = new ResponseWrapper<>(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), null);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<Staff>> createStaff(@RequestBody Staff staff){
        Staff createdStaff = staffService.createStaff(staff);
        if (createdStaff != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    200,
                    "Created",
                    null
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    "Something went Wrong",
                    null
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Staff>> updateStaff(@PathVariable Long id, @RequestBody StaffDto staffDto){
        Staff updateStaff = staffService.updateStaff(id, staffDto);
        if (updateStaff != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    200,
                    "Updated",
                    null
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    "Something went Wrong",
                    null
            ));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Staff>>> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                200,
                "Fetched all staff",
                staffList
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Staff>> getStaffById(@PathVariable Long id) {
        Staff staff = staffService.getStaffById(id);
        if (staff != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Fetched staff by ID",
                    staff
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    404,
                    "Staff member not found",
                    null
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteStaff(@PathVariable Long id) {
        try {
            staffService.deleteStaff(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Deleted",
                    null
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    404,
                    "Staff member not found",
                    null
            ));
        }
    }

}
