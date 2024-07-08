package com.example.employeemanager.auth;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordRequest {
    @NotEmpty(message = "Password is mandatory")
    @NotNull(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be 8 characters long minimum")
    private String newPassword;

    @NotEmpty(message = "Confirmation password is mandatory")
    @NotNull(message = "Confirmation password is mandatory")
    private String confirmPassword;
}
