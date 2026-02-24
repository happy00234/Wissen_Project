package com.seatbooking.repository;

import com.seatbooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (used in login)
    Optional<User> findByEmail(String email);
}