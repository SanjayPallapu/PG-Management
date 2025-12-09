package com.pgmanagement.service;

import com.pgmanagement.dto.response.DashboardResponse;
import com.pgmanagement.model.Room;
import com.pgmanagement.model.Tenant;
import com.pgmanagement.repository.*;
import lombok.RequiredArgsConstructor;
import main.java.com.pgmanagement.repository.PaymentRepository;
import main.java.com.pgmanagement.repository.RoomRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final RoomRepository roomRepository;
    private final TenantRepository tenantRepository;
    private final PaymentRepository paymentRepository;
    
    // ✅ OWNER-SPECIFIC: Get dashboard stats
    public DashboardResponse getDashboardStats(UUID ownerId) {
        // Room statistics
        Long totalRooms = (long) roomRepository.findByOwnerIdOrderByRoomNo(ownerId).size();
        Long occupiedRooms = roomRepository.countByOwnerIdAndStatus(
            ownerId, Room.RoomStatus.Occupied);
        Long vacantRooms = roomRepository.countByOwnerIdAndStatus(
            ownerId, Room.RoomStatus.Vacant);
        Long partiallyOccupiedRooms = roomRepository.countByOwnerIdAndStatus(
            ownerId, Room.RoomStatus.PartiallyOccupied);
        
        // Tenant statistics
        Long totalTenants = (long) tenantRepository.findByOwnerId(ownerId).size();
        Long activeTenants = tenantRepository.countByOwnerIdAndIsActive(ownerId, true);
        Long paidTenants = tenantRepository.countByOwnerIdAndPaymentStatus(
            ownerId, Tenant.PaymentStatus.Paid);
        Long pendingTenants = tenantRepository.countByOwnerIdAndPaymentStatus(
            ownerId, Tenant.PaymentStatus.Pending);

        Long overdueTenants = tenantRepository.countByOwnerIdAndPaymentStatus(
            ownerId, Tenant.PaymentStatus.Overdue);
        
        // Financial statistics
        Integer totalMonthlyRent = tenantRepository.getTotalMonthlyRentByOwnerId(ownerId);
        if (totalMonthlyRent == null) totalMonthlyRent = 0;
        
        LocalDate now = LocalDate.now();
        Integer collectedThisMonth = paymentRepository.getTotalCollectedByOwnerAndMonth(
            ownerId, now.getYear(), now.getMonthValue());
        if (collectedThisMonth == null) collectedThisMonth = 0;
        
        Integer pendingAmount = paymentRepository.getTotalPendingByOwnerId(ownerId);
        if (pendingAmount == null) pendingAmount = 0;
        
        // Calculate occupancy rate
        Double occupancyRate = totalRooms > 0 
            ? ((occupiedRooms + partiallyOccupiedRooms) * 100.0) / totalRooms 
            : 0.0;
        
        return DashboardResponse.builder()
            .totalRooms(totalRooms.intValue())
            .occupiedRooms(occupiedRooms.intValue())
            .vacantRooms(vacantRooms.intValue())
            .partiallyOccupiedRooms(partiallyOccupiedRooms.intValue())
            .totalTenants(totalTenants.intValue())
            .activeTenants(activeTenants.intValue())
            .paidTenants(paidTenants.intValue())
            .pendingTenants(pendingTenants.intValue())
            .overdueTenants(overdueTenants.intValue())
            .totalMonthlyRent(totalMonthlyRent)
            .collectedThisMonth(collectedThisMonth)
            .pendingAmount(pendingAmount)
            .occupancyRate(occupancyRate)
            .build();
    }
}

