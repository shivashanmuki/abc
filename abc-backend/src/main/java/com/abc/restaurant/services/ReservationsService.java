package com.abc.restaurant.services;

import com.abc.restaurant.dto.ReservationGetDto;
import com.abc.restaurant.dto.ReservationsDto;
import com.abc.restaurant.entities.*;
import com.abc.restaurant.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Configuration
@Service
public class ReservationsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private ReservationsRepository reservationsRepository;
    @Autowired
    private ReservedRepository reservedRepository;
    @Autowired
    private ProductsRepository productsRepository;


    public Reservations createReservation(ReservationsDto reservationsDto) {
        Reservations reservations = new Reservations();
        Services service = serviceRepository.findById(reservationsDto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service Not Found"));
        Users user = userRepository.findByEmail(reservationsDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        BeanUtils.copyProperties(reservationsDto, reservations);
        reservations.setService(service);
        reservations.setUsers(user);

        Reservations savedReservation = reservationsRepository.save(reservations);

        reservationsDto.getProduct().forEach((productId, price) -> {
            Products product = productsRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product Not Found"));

            Reserved reserved = new Reserved();
            reserved.setProducts(product);
            reserved.setReservations(savedReservation);
            reserved.setPrice(price);

            reservedRepository.save(reserved);
        });

        return savedReservation;
    }

    public List<ReservationGetDto> getByUser(String email){
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        List<Reservations> reservations = reservationsRepository.findByUsers(user);
        return reservations.stream().map(reserve -> {
            ReservationGetDto reservationsDto = new ReservationGetDto();
            reservationsDto.setTime(reserve.getTime());
            reservationsDto.setService(reserve.getService().getTitle());
            BeanUtils.copyProperties(reserve, reservationsDto);
            reservationsDto.setNumberOfPeople(reserve.getNumberOfPeople());
            reserve.getReserved().forEach(reserved -> {
                reservationsDto.getProduct().put(reserved.getProducts().getName(), reserved.getPrice());
            });
            return reservationsDto;
        }).collect(Collectors.toList());
    }

    public List<ReservationGetDto> getAllReservations() {
        List<Reservations> reservations = reservationsRepository.findAll();

        return reservations.stream().map(reservation -> {
            ReservationGetDto dto = new ReservationGetDto();
            BeanUtils.copyProperties(reservation, dto);
            dto.setId(reservation.getId());
            dto.setTime(reservation.getTime());
            dto.setSpecialRequests(reservation.getSpecialRequests());
            dto.setPaymentMethod(reservation.getPaymentMethod());
            dto.setNumberOfPeople(reservation.getNumberOfPeople());
            dto.setUser(reservation.getUsers().getFirstName());
            dto.setService(reservation.getService().getTitle());
            reservation.getReserved().forEach(reserved -> {
                dto.getProduct().put(reserved.getProducts().getName(), reserved.getPrice());
            });

            return dto;
        }).collect(Collectors.toList());
    }

    public Optional<Reservations> getReservationById(Long id) {
        return reservationsRepository.findById(id);
    }

    public void deleteReservation(Long id) {
        Reservations reservation = reservationsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        reservation.getReserved().forEach(reserved -> reservedRepository.delete(reserved));
        reservationsRepository.delete(reservation);
    }


    public Reservations updateStatus(Long id, Boolean status){

        Reservations reservations =  reservationsRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Reservation not found"));
        reservations.setStatus(status);
        return reservationsRepository.save(reservations);
    }
}
