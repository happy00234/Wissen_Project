package com.seatbooking.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private int seatNumber;

    private String type;

    private boolean isLeave = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}