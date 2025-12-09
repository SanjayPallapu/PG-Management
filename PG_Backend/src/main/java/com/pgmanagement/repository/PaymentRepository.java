package com.pgmanagement.repository;

import com.pgmanagement.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    
    // Owner-specific queries (DATA ISOLATION)
    List<Payment> findByOwnerId(UUID ownerId);
    
    Optional<Payment> findByIdAndOwnerId(UUID id, UUID ownerId);
    
    List<Payment> findByOwnerIdAndTenantId(UUID ownerId, UUID tenantId);
    
    List<Payment> findByOwnerIdAndYearAndMonth(UUID ownerId, Integer year, Integer month);
    
    List<Payment> findByOwnerIdAndPaymentStatus(UUID ownerId, Payment.PaymentStatus status);
    
    Optional<Payment> findByTenantIdAndMonthAndYear(UUID tenantId, Integer month, Integer year);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.ownerId = ?1 AND p.year = ?2 AND p.month = ?3 AND p.paymentStatus = 'Paid'")
    Integer getTotalCollectedByOwnerAndMonth(UUID ownerId, Integer year, Integer month);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.ownerId = ?1 AND p.paymentStatus = 'Pending'")
    Integer getTotalPendingByOwnerId(UUID ownerId);
}
