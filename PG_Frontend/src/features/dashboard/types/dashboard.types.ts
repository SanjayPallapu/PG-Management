export interface DashboardStats {
    totalRooms: number;
    occupiedRooms: number;
    vacantRooms: number;
    totalTenants: number;
    activeTenants: number;
    totalRevenue: number;
    monthlyRevenue: number;
    pendingPayments: number;
    overduePayments: number;
    occupancyRate: number;
  }
  
  export interface RevenueData {
    month: string;
    revenue: number;
    year: number;
  }
  
  export interface OccupancyData {
    date: string;
    occupied: number;
    vacant: number;
  }
  