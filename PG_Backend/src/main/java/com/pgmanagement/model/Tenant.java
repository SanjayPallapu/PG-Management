package com.pgmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tenants", indexes = {
    @Index(name = "idx_tenants_owner_id", columnList = "owner_id"),
    @Index(name = "idx_tenants_room_id", columnList = "room_id"),
    @Index(name = "idx_tenants_status", columnList = "owner_id, payment_status"),
    @Index(name = "idx_tenants_active", columnList = "owner_id, is_active")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tenant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false, name = "owner_id")
    private UUID ownerId;
    
    @Column(nullable = false, name = "room_id")
    private UUID roomId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, length = 20)
    private String phone;
    
    private String email;
    
    @Column(name = "aadhar_number", length = 12)
    private String aadharNumber;
    
    @Column(name = "emergency_contact", length = 20)
    private String emergencyContact;
    
    @Column(nullable = false, name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(nullable = false, name = "monthly_rent")
    private Integer monthlyRent;
    
    @Column(name = "security_deposit")
    private Integer securityDeposit = 0;
    
    @Column(nullable = false, name = "payment_status", length = 50)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    
    @Column(name = "payment_date")
    private LocalDate paymentDate;
    
    @Column(nullable = false, name = "is_active")
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum PaymentStatus {
        Paid, Pending, Overdue
    }
}
