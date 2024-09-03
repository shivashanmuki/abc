package com.abc.restaurant.controllers;

import com.abc.restaurant.configs.JwtUtil;
import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.entities.Staff;
import com.abc.restaurant.entities.Users;
import com.abc.restaurant.services.UserService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/user-login")
    public ResponseEntity<ResponseWrapper<LoginResponse>> login(@RequestBody Users loginRequest) {
        try {
            LoginResponse response = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            ResponseWrapper<LoginResponse> responseWrapper = new ResponseWrapper<>(HttpStatus.OK.value(), "Login successful", response);
            return ResponseEntity.ok(responseWrapper);
        } catch (Exception e) {
            ResponseWrapper<LoginResponse> errorResponse = new ResponseWrapper<>(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), null);
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping
    public ResponseEntity<ResponseWrapper<LoginResponse>> createUser(@RequestBody Users users){
        Users createdUser = userService.saveUser(users);
        if (createdUser != null){
            String token = jwtUtil.generateToken(createdUser.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    200,
                    "Created",
                    new LoginResponse(token, createdUser.getEmail())
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    500,
                    "Internal Server Error",
                    null
            ));
        }
    }
    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Users>>> getAllUsers(){
        List<Users> users = userService.getAllUsers();
        try {
            if(!users.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                        200,
                        "Got it",
                        users
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
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    e.getMessage(),
                    null
            ));
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteUser (@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                200,
        "Deleted",
                null
        ));
    }


}
