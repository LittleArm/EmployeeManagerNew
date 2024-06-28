package com.example.employeemanager.manage;

import com.example.employeemanager.user.TokenRepository;
import com.example.employeemanager.user.User;
import com.example.employeemanager.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ManageService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public ManageService(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    public List<User> findAllEmployees() {
        return userRepository.findAll();
    }

    public User updateEmployee(User user) {
        return userRepository.save(user);
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
}
