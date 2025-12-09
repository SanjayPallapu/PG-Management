package com.pgmanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TenantRequest {
    
    @NotNull(message = "Room ID is required")
    private String roomId;
    
    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name cannot exceed 255 characters")
    private String name;
    
    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar must be 12 digits")
    private String aadharNumber;
    
    private String emergencyContact;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    @NotNull(message = "Monthly rent is required")
    @Min(value = 1, message = "Monthly rent must be positive")
    private Integer monthlyRent;
    
    private Integer securityDeposit;
    
    @NotBlank(message = "Payment status is required")
    @Pattern(regexp = "Paid|Pending|Overdue", message = "Invalid payment status")
    private String paymentStatus;
    
    private LocalDate paymentDate;
}
