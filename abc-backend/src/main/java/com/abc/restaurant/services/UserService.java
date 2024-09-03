package com.abc.restaurant.services;

import com.abc.restaurant.configs.JwtUtil;
import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.entities.Users;
import com.abc.restaurant.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    public Users saveUser(Users user) {
        return userRepository.save(user);
    }


    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }


    public Optional<Users> getUserById(Long id) {
        return userRepository.findById(id);
    }


    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public LoginResponse login(String email, String password) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (password.equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return new LoginResponse(token, user.getEmail());
        }

        throw new RuntimeException("Invalid //credentials");
    }
}
