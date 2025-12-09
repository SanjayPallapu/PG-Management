package com.pgmanagement.service;

import com.pgmanagement.dto.request.RoomRequest;
import com.pgmanagement.exception.ResourceNotFoundException;
import com.pgmanagement.model.Room;
import com.pgmanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RoomService {
    
    private final RoomRepository roomRepository;
    
    // ✅ OWNER-SPECIFIC: Get all rooms for current owner only
    public List<Room> getAllRooms(UUID ownerId) {
        return roomRepository.findByOwnerIdOrderByRoomNo(ownerId);
    }
    
    // ✅ OWNER-SPECIFIC: Get single room with ownership check
    public Room getRoomById(UUID id, UUID ownerId) {
        return roomRepository.findByIdAndOwnerId(id, ownerId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Room not found or you don't have permission"));
    }
    
    // ✅ OWNER-SPECIFIC: Create room
    @Transactional
    public Room createRoom(RoomRequest request, UUID ownerId) {
        // Check if room number already exists for this owner
        if (roomRepository.existsByRoomNoAndOwnerId(request.getRoomNo(), ownerId)) {
            throw new IllegalArgumentException(
                "Room number already exists for your property");
        }
        
        Room room = Room.builder()
            .ownerId(ownerId)
            .roomNo(request.getRoomNo())
            .status(Room.RoomStatus.valueOf(request.getStatus()))
            .capacity(request.getCapacity())
            .rentAmount(request.getRentAmount())
            .floor(request.getFloor())
            .notes(request.getNotes())
            .build();
        
        return roomRepository.save(room);
    }
    
    // ✅ OWNER-SPECIFIC: Update room with ownership check
    @Transactional
    public Room updateRoom(UUID id, RoomRequest request, UUID ownerId) {
        Room room = getRoomById(id, ownerId); // Ownership check
        
        room.setRoomNo(request.getRoomNo());
        room.setStatus(Room.RoomStatus.valueOf(request.getStatus()));
        room.setCapacity(request.getCapacity());
        room.setRentAmount(request.getRentAmount());
        room.setFloor(request.getFloor());
        room.setNotes(request.getNotes());
        
        return roomRepository.save(room);
    }
    
    // ✅ OWNER-SPECIFIC: Delete room with ownership check
    @Transactional
    public void deleteRoom(UUID id, UUID ownerId) {
        Room room = getRoomById(id, ownerId); // Ownership check
        roomRepository.delete(room);
    }
    
    // Get rooms by status
    public List<Room> getRoomsByStatus(Room.RoomStatus status, UUID ownerId) {
        return roomRepository.findByOwnerIdAndStatus(ownerId, status);
    }
}
