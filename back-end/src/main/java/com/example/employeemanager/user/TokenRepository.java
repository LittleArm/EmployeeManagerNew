package com.example.employeemanager.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    void deleteByUserId(Long userId);

    Optional<Token> findByToken(String token);
}
