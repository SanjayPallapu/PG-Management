package com.pgmanagement.controller;

import com.pgmanagement.dto.request.RoomRequest;
import com.pgmanagement.model.Room;
import com.pgmanagement.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class RoomController {
    
    private final RoomService roomService;
    
    private UUID getOwnerIdFromAuth(Authentication auth) {
        return (UUID) auth.getPrincipal();
    }
    
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms(Authentication auth) {
        UUID ownerId = getOwnerIdFromAuth(auth);
        return ResponseEntity.ok(roomService.getAllRooms(ownerId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable UUID id, Authentication auth) {
        UUID ownerId = getOwnerIdFromAuth(auth);
        return ResponseEntity.ok(roomService.getRoomById(id, ownerId));
    }
    
    @PostMapping
    public ResponseEntity<Room> createRoom(@Valid @RequestBody RoomRequest request, 
                                          Authentication auth) {
        UUID ownerId = getOwnerIdFromAuth(auth);
        return ResponseEntity.ok(roomService.createRoom(request, ownerId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable UUID id,
                                          @Valid @RequestBody RoomRequest request,
                                          Authentication auth) {
        UUID ownerId = getOwnerIdFromAuth(auth);
        return ResponseEntity.ok(roomService.updateRoom(id, request, ownerId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id, Authentication auth) {
        UUID ownerId = getOwnerIdFromAuth(auth);
        roomService.deleteRoom(id, ownerId);
        return ResponseEntity.noContent().build();
    }
}
