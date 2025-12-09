import axiosClient from '@/shared/lib/axiosClient';
import { DashboardStats, RevenueData, OccupancyData } from '../types/dashboard.types';

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await axiosClient.get('/dashboard/stats');
    return response.data;
  },

  getRevenueData: async (months: number = 6): Promise<RevenueData[]> => {
    const response = await axiosClient.get('/dashboard/revenue', { params: { months } });
    return response.data;
  },

  getOccupancyData: async (days: number = 30): Promise<OccupancyData[]> => {
    const response = await axiosClient.get('/dashboard/occupancy', { params: { days } });
    return response.data;
  },
};
