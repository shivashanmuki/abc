package com.abc.restaurant.services;

import com.abc.restaurant.configs.JwtUtil;
import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.entities.AdminUser;
import com.abc.restaurant.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(String email, String password) {
        AdminUser user = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (password.equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return new LoginResponse(token, user.getEmail());
        }

        throw new RuntimeException("Invalid //credentials");
    }

}
