package com.pgmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tenant_payments",
    uniqueConstraints = @UniqueConstraint(columnNames = {"tenant_id", "month", "year"}),
    indexes = {
        @Index(name = "idx_payments_owner_id", columnList = "owner_id"),
        @Index(name = "idx_payments_tenant_id", columnList = "tenant_id"),
        @Index(name = "idx_payments_month_year", columnList = "owner_id, year, month"),
        @Index(name = "idx_payments_status", columnList = "owner_id, payment_status")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false, name = "owner_id")
    private UUID ownerId;
    
    @Column(nullable = false, name = "tenant_id")
    private UUID tenantId;
    
    @Column(nullable = false)
    private Integer month;
    
    @Column(nullable = false)
    private Integer year;
    
    @Column(nullable = false)
    private Integer amount;
    
    @Column(nullable = false, name = "payment_status", length = 50)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    
    @Column(name = "payment_date")
    private LocalDate paymentDate;
    
    @Column(name = "payment_method", length = 50)
    private String paymentMethod;
    
    @Column(name = "transaction_id")
    private String transactionId;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum PaymentStatus {
        Paid, Pending, Overdue, Partial
    }
}
