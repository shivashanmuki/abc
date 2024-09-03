package com.abc.restaurant.controllers;


import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.entities.AdminUser;
import com.abc.restaurant.services.AdminService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService authService;

    @PostMapping("/admin-login")
    public ResponseEntity<ResponseWrapper<LoginResponse>> login(@RequestBody AdminUser loginRequest) {
        try {
            LoginResponse response = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            ResponseWrapper<LoginResponse> responseWrapper = new ResponseWrapper<>(HttpStatus.OK.value(), "Login successful", response);
            return ResponseEntity.ok(responseWrapper);
        } catch (Exception e) {
            ResponseWrapper<LoginResponse> errorResponse = new ResponseWrapper<>(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), null);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

}
