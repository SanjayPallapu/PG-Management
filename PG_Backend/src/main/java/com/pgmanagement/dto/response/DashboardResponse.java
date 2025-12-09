package com.pgmanagement.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private Integer totalRooms;
    private Integer occupiedRooms;
    private Integer vacantRooms;
    private Integer partiallyOccupiedRooms;
    private Integer totalTenants;
    private Integer activeTenants;
    private Integer paidTenants;
    private Integer pendingTenants;
    private Integer overdueTenants;
    private Integer totalMonthlyRent;
    private Integer collectedThisMonth;
    private Integer pendingAmount;
    private Double occupancyRate;
}
