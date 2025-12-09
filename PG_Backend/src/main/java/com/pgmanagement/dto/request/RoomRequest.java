package com.pgmanagement.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RoomRequest {
    
    @NotBlank(message = "Room number is required")
    @Size(max = 50, message = "Room number cannot exceed 50 characters")
    private String roomNo;
    
    @NotBlank(message = "Status is required")
    @Pattern(regexp = "Vacant|Occupied|PartiallyOccupied", message = "Invalid status")
    private String status;
    
    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Max(value = 10, message = "Capacity cannot exceed 10")
    private Integer capacity;
    
    @NotNull(message = "Rent amount is required")
    @Min(value = 1, message = "Rent amount must be positive")
    private Integer rentAmount;
    
    @NotNull(message = "Floor is required")
    @Min(value = 0, message = "Floor must be at least 0")
    @Max(value = 50, message = "Floor cannot exceed 50")
    private Integer floor;
    
    private String notes;
}
