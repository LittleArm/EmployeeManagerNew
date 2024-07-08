package com.example.employeemanager.manage;

import com.example.employeemanager.user.User;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("employee")
@Tag(name = "EmployeeService")
public class ManageController {
    private final ManageService manageService;

    public ManageController(ManageService manageService) {
        this.manageService = manageService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllEmployees () {
        List<User> employees = manageService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<User> getEmployeeByEmail (@PathVariable("email") String email) {
        User employee = manageService.findEmployee(email);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateEmployee(@RequestBody User employee) {
        User updateEmployee = manageService.updateEmployee(employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<User> updatePassword(
            @RequestBody User employee,
            @RequestParam String oldPassword,
            @RequestParam String newPassword
    ) {
        User updateEmployee = manageService.updatePassword(employee, oldPassword, newPassword);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        manageService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
