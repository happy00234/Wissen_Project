package com.seatbooking.controller;

import com.seatbooking.model.User;
import com.seatbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public User login(@RequestBody User user) {

        // Check if user already exists
        User existingUser = userRepository
                .findByEmail(user.getEmail())
                .orElse(null);

        if (existingUser != null) {
            return existingUser;
        }

        // If not exist, create new
        return userRepository.save(user);
    }
}