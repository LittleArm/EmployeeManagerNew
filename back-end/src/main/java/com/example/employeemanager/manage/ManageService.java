package com.example.employeemanager.manage;

import com.example.employeemanager.user.TokenRepository;
import com.example.employeemanager.user.User;
import com.example.employeemanager.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ManageService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ManageService(UserRepository userRepository, TokenRepository tokenRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAllEmployees() {
        return userRepository.findAll();
    }

    public User updateEmployee(User user) {
        User employee = findEmployee(user.getEmail());
        employee.setFirstName(user.getFirstName());
        employee.setLastName(user.getLastName());
        employee.setDateOfBirth(user.getDateOfBirth());
        employee.setJobTitle(user.getJobTitle());
        employee.setImageUrl(user.getImageUrl());
        return userRepository.save(employee);
    }

    public User findEmployee(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User has email " + email + " was not found"));
    }

    public void deleteEmployee(Long id){
        if (!userRepository.existsById(id)){
            throw new UserNotFoundException("User not found with id " + id);
        }
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
        user.getRoles().clear();
        userRepository.save(user);
        tokenRepository.deleteByUserId(id);
        userRepository.deleteUserById(id);
    }

    public User updatePassword(User user, String oldPassword, String newPassword) {
        User employee = findEmployee(user.getEmail());
        if (!checkIfValidOldPassword(employee, oldPassword)) {
            throw new IllegalStateException("Old password is incorrect");
        }
        employee.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(employee);
    }

    private boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }
}
