package com.example.employeemanager.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    void deleteUserByEmail(String email);

    Optional<User> findByEmail(String email);
}
