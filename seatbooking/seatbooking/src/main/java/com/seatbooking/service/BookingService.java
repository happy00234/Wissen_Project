package com.seatbooking.service;

import com.seatbooking.model.Booking;
import com.seatbooking.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {

        if (bookingRepository.existsBySeatNumberAndDate(
                booking.getSeatNumber(),
                booking.getDate())) {
            throw new RuntimeException("Seat already booked");
        }

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public Booking markLeave(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setLeave(true);
        return bookingRepository.save(booking);
    }
}