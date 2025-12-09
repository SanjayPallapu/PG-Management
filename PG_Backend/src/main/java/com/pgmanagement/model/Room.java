package com.pgmanagement.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rooms", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"owner_id", "room_no"}),
    indexes = {
        @Index(name = "idx_rooms_owner_id", columnList = "owner_id"),
        @Index(name = "idx_rooms_status", columnList = "owner_id, status")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(nullable = false, name = "owner_id")
    private UUID ownerId;
    
    @Column(nullable = false, name = "room_no", length = 50)
    private String roomNo;
    
    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private RoomStatus status;
    
    @Column(nullable = false)
    private Integer capacity;
    
    @Column(nullable = false, name = "rent_amount")
    private Integer rentAmount;
    
    @Column(nullable = false)
    private Integer floor;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false, name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum RoomStatus {
        Vacant, Occupied, PartiallyOccupied
    }
}
