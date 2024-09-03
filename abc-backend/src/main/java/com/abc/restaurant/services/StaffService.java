package com.abc.restaurant.services;

import com.abc.restaurant.configs.JwtUtil;
import com.abc.restaurant.dto.LoginResponse;
import com.abc.restaurant.dto.StaffDto;
import com.abc.restaurant.entities.AdminUser;
import com.abc.restaurant.entities.Staff;
import com.abc.restaurant.repositories.StaffRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(String email, String password) {
        Staff user = staffRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (password.equals(user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail());
            return new LoginResponse(token, user.getEmail());
        }

        throw new RuntimeException("Invalid //credentials");
    }
    public Staff createStaff(Staff staff){
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, StaffDto staffDto){
        Staff staff = staffRepository.findById(id).orElseThrow(() ->new RuntimeException("No Such File"));
        BeanUtils.copyProperties(staffDto, staff,"id");
        return staffRepository.save(staff);
    }
    public List<Staff> getAllStaff(){
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id){
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff member not found"));
    }

    public void deleteStaff(Long id){
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff member not found"));
        staffRepository.delete(staff);
    }
}
