package com.pgmanagement.repository;

import com.pgmanagement.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    
    // Owner-specific queries (DATA ISOLATION)
    List<Room> findByOwnerIdOrderByRoomNo(UUID ownerId);
    
    Optional<Room> findByIdAndOwnerId(UUID id, UUID ownerId);
    
    Optional<Room> findByRoomNoAndOwnerId(String roomNo, UUID ownerId);
    
    List<Room> findByOwnerIdAndStatus(UUID ownerId, Room.RoomStatus status);
    
    List<Room> findByOwnerIdAndFloor(UUID ownerId, Integer floor);
    
    Long countByOwnerIdAndStatus(UUID ownerId, Room.RoomStatus status);
    
    boolean existsByRoomNoAndOwnerId(String roomNo, UUID ownerId);
}
