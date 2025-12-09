package com.pgmanagement.service;

import com.pgmanagement.dto.request.TenantRequest;
import com.pgmanagement.exception.ResourceNotFoundException;
import com.pgmanagement.model.Tenant;
import com.pgmanagement.model.Room;
import com.pgmanagement.repository.TenantRepository;
import com.pgmanagement.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TenantService {
    
    private final TenantRepository tenantRepository;
    private final RoomRepository roomRepository;
    
    // ✅ OWNER-SPECIFIC: Get all tenants
    public List<Tenant> getAllTenants(UUID ownerId) {
        return tenantRepository.findByOwnerId(ownerId);
    }
    
    // ✅ OWNER-SPECIFIC: Get tenant by ID with ownership check
    public Tenant getTenantById(UUID id, UUID ownerId) {
        return tenantRepository.findByIdAndOwnerId(id, ownerId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Tenant not found or you don't have permission"));
    }
    
    // ✅ OWNER-SPECIFIC: Create tenant
    @Transactional
    public Tenant createTenant(TenantRequest request, UUID ownerId) {
        // Verify room belongs to owner
        UUID roomId = UUID.fromString(request.getRoomId());
        Room room = roomRepository.findByIdAndOwnerId(roomId, ownerId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Room not found or you don't have permission"));
        
        Tenant tenant = Tenant.builder()
            .ownerId(ownerId)
            .roomId(roomId)
            .name(request.getName())
            .phone(request.getPhone())
            .email(request.getEmail())
            .aadharNumber(request.getAadharNumber())
            .emergencyContact(request.getEmergencyContact())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .monthlyRent(request.getMonthlyRent())
            .securityDeposit(request.getSecurityDeposit())
            .paymentStatus(Tenant.PaymentStatus.valueOf(request.getPaymentStatus()))
            .paymentDate(request.getPaymentDate())
            .isActive(true)
            .build();
        
        return tenantRepository.save(tenant);
    }
    
    // ✅ OWNER-SPECIFIC: Update tenant with ownership check
    @Transactional
    public Tenant updateTenant(UUID id, TenantRequest request, UUID ownerId) {
        Tenant tenant = getTenantById(id, ownerId); // Ownership check
        
        // If room is being changed, verify new room belongs to owner
        UUID newRoomId = UUID.fromString(request.getRoomId());
        if (!tenant.getRoomId().equals(newRoomId)) {
            roomRepository.findByIdAndOwnerId(newRoomId, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Room not found or you don't have permission"));
            tenant.setRoomId(newRoomId);
        }
        
        tenant.setName(request.getName());
        tenant.setPhone(request.getPhone());
        tenant.setEmail(request.getEmail());
        tenant.setAadharNumber(request.getAadharNumber());
        tenant.setEmergencyContact(request.getEmergencyContact());
        tenant.setStartDate(request.getStartDate());
        tenant.setEndDate(request.getEndDate());
        tenant.setMonthlyRent(request.getMonthlyRent());
        tenant.setSecurityDeposit(request.getSecurityDeposit());
        tenant.setPaymentStatus(Tenant.PaymentStatus.valueOf(request.getPaymentStatus()));
        tenant.setPaymentDate(request.getPaymentDate());
        
        return tenantRepository.save(tenant);
    }
    
    // ✅ OWNER-SPECIFIC: Delete tenant
    @Transactional
    public void deleteTenant(UUID id, UUID ownerId) {
        Tenant tenant = getTenantById(id, ownerId); // Ownership check
        tenantRepository.delete(tenant);
    }
    
    // Get tenants by room
    public List<Tenant> getTenantsByRoom(UUID roomId, UUID ownerId) {
        // Verify room ownership
        roomRepository.findByIdAndOwnerId(roomId, ownerId)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Room not found or you don't have permission"));
        
        return tenantRepository.findByOwnerIdAndRoomId(ownerId, roomId);
    }
}
