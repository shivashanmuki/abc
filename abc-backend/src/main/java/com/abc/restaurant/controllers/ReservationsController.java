package com.abc.restaurant.controllers;

import com.abc.restaurant.dto.ReservationGetDto;
import com.abc.restaurant.dto.ReservationsDto;
import com.abc.restaurant.entities.Reservations;
import com.abc.restaurant.services.ReservationsService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationsController {

    @Autowired
    private ReservationsService reservationsService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<Reservations>> createReservation(@RequestBody ReservationsDto reservationsDto) {
        Reservations reservations = reservationsService.createReservation(reservationsDto);

        if (reservations != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    HttpStatus.CREATED.value(),
                    "Created",
                    reservations
            ));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Internal Server Error",
                    null
            ));
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<ResponseWrapper<Reservations>> updateReservation(@PathVariable Long id, @RequestBody ReservationsDto reservationsDto) {
//        Reservations reservations = reservationsService.updateReservation(id, reservationsDto);
//
//        if (reservations != null) {
//            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
//                    HttpStatus.OK.value(),
//                    "Updated",
//                    reservations
//            ));
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
//                    HttpStatus.NOT_FOUND.value(),
//                    "Reservation Not Found",
//                    null
//            ));
//        }
//    }

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<ReservationGetDto>>> getAllReservations() {
        List<ReservationGetDto> reservationsList = reservationsService.getAllReservations();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                HttpStatus.OK.value(),
                "Fetched all reservations",
                reservationsList
        ));
    }
    @GetMapping("/{email}")
    public ResponseEntity<ResponseWrapper<List<ReservationGetDto>>> gerReservationByUserId (@PathVariable String email){
        List <ReservationGetDto> reservationsList = reservationsService.getByUser(email);

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                200,
                "Get it",
                reservationsList
        ));
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<ResponseWrapper<Reservations>> getReservationById(@PathVariable Long id) {
//        Optional<Reservations> reservation = reservationsService.getReservationById(id);
//
//        return reservation.map(reservations -> ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
//                HttpStatus.OK.value(),
//                "Fetched reservation",
//                reservations
//        ))).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
//                HttpStatus.NOT_FOUND.value(),
//                "Reservation Not Found",
//                null
//        )));
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteReservation(@PathVariable Long id) {
        try {
            reservationsService.deleteReservation(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ResponseWrapper<>(
                    HttpStatus.NO_CONTENT.value(),
                    "Deleted",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseWrapper<>(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error deleting reservation",
                    null
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Reservations>> updateStatus(@PathVariable Long id, @RequestParam Boolean status){

        Reservations updatedStatus = reservationsService.updateStatus(id, status);
        if (updatedStatus != null){
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Updated",
                    null
            ));
        }
        else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    400,
                    "Internal Server error",
                    null
            ));
        }
    }
}
