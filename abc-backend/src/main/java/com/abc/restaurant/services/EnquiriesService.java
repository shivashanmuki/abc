package com.abc.restaurant.services;

import com.abc.restaurant.dto.EnquiriesDto;
import com.abc.restaurant.entities.EnqAllo;
import com.abc.restaurant.entities.Enquiries;
import com.abc.restaurant.entities.ResponseEnq;
import com.abc.restaurant.entities.Users;
import com.abc.restaurant.repositories.EnqAlloRepository;
import com.abc.restaurant.repositories.EnquiriesRepository;
import com.abc.restaurant.repositories.ResponseEnqRepository;
import com.abc.restaurant.repositories.UserRepository;
import com.abc.restaurant.utils.EnquiriesWithResponses;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnquiriesService {
    @Autowired
    private EnqAlloRepository enqAlloRepository;

    @Autowired
    private ResponseEnqRepository responseEnqRepository;
    @Autowired
    EnquiriesRepository enquiriesRepository;
    @Autowired
    UserRepository userRepository;

    public Enquiries addEnquiries(EnquiriesDto enquiriesDto) {
       // System.out.println("Email in DTO: " + enquiriesDto.getEmail());

        Users users = userRepository.findByEmail(enquiriesDto.getEmail())
                .orElseThrow(() -> new RuntimeException("No User Found"));

        //System.out.println("User found: " + users.getEmail());

        Enquiries enquiries = new Enquiries();
      //  BeanUtils.copyProperties(enquiriesDto, enquiries);
        enquiries.setComments(enquiriesDto.getComments());
        enquiries.setEmail(enquiriesDto.getProvidedEmail());
        enquiries.setPhone(enquiriesDto.getPhone());
        enquiries.setUsers(users);

        return enquiriesRepository.save(enquiries);
    }

//    public List<Enquiries> getByUser (String email){
//        Users users = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("No User Found"));
//
//        return enquiriesRepository.findByUsers(users);
//
//    }

    public List<EnquiriesWithResponses> getEnquiriesWithResponsesByUser(String email) {
        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No User Found"));

        List<Enquiries> enquiriesList = enquiriesRepository.findByUsers(users);
        return enquiriesList.stream()
                .map(enquiry -> {
                    List<EnqAllo> enqAllos = enqAlloRepository.findByEnquiries(enquiry);
                    List<Long> responseEnqIds = enqAllos.stream()
                            .map(enqAllo -> enqAllo.getResponseEnq().getId())
                            .distinct()
                            .collect(Collectors.toList());
                    List<ResponseEnq> responses = responseEnqRepository.findByIdIn(responseEnqIds);
                    return new EnquiriesWithResponses(enquiry, responses);
                })
                .collect(Collectors.toList());
    }

    public List<EnquiriesWithResponses> getAllEnquiriesWithResponses() {
        List<Enquiries> enquiriesList = enquiriesRepository.findAll();
        return enquiriesList.stream()
                .map(enquiry -> {
                    List<EnqAllo> enqAllos = enqAlloRepository.findByEnquiries(enquiry);
                    List<Long> responseEnqIds = enqAllos.stream()
                            .map(enqAllo -> enqAllo.getResponseEnq().getId())
                            .distinct()
                            .collect(Collectors.toList());
                    List<ResponseEnq> responses = responseEnqRepository.findByIdIn(responseEnqIds);
                    return new EnquiriesWithResponses(enquiry, responses);
                })
                .collect(Collectors.toList());
    }

    public  List<EnqAllo> getAllResponseEnqByEnquiries(Long id){
        Enquiries enquiries = enquiriesRepository.findById(id).orElseThrow(()-> new RuntimeException("Enquiries Not Found"));
        return enqAlloRepository.findByEnquiries(enquiries);

    }
public boolean deleteEnquiries(Long id){
       if(enquiriesRepository.existsById(id)){
           enquiriesRepository.deleteById(id);
           return true;
       }
       else {
           return false;
       }
}


}
