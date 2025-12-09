package com.pgmanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PaymentRequest {
    
    @NotNull(message = "Tenant ID is required")
    private String tenantId;
    
    @NotNull(message = "Month is required")
    @Min(value = 1, message = "Month must be between 1-12")
    @Max(value = 12, message = "Month must be between 1-12")
    private Integer month;
    
    @NotNull(message = "Year is required")
    @Min(value = 2020, message = "Year must be >= 2020")
    @Max(value = 2100, message = "Year must be <= 2100")
    private Integer year;
    
    @NotNull(message = "Amount is required")
    @Min(value = 1, message = "Amount must be positive")
    private Integer amount;
    
    @NotBlank(message = "Payment status is required")
    @Pattern(regexp = "Paid|Pending|Overdue|Partial", message = "Invalid status")
    private String paymentStatus;
    
    private LocalDate paymentDate;
    
    private String paymentMethod;
    
    private String transactionId;
    
    private String notes;
}
