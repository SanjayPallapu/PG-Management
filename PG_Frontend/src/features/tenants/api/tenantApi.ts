import axiosClient from '@/shared/lib/axiosClient';
import { Tenant, TenantRequest, TenantFilters } from '../types/tenant.types';
import { PageResponse, PageRequest } from '@/shared/types/common.types';

export const tenantApi = {
  getAllTenants: async (filters?: TenantFilters, pageRequest?: PageRequest): Promise<PageResponse<Tenant>> => {
    const params = { ...filters, ...pageRequest };
    const response = await axiosClient.get('/tenants', { params });
    return response.data;
  },

  getTenantById: async (id: string): Promise<Tenant> => {
    const response = await axiosClient.get(`/tenants/${id}`);
    return response.data;
  },

  createTenant: async (data: TenantRequest): Promise<Tenant> => {
    const response = await axiosClient.post('/tenants', data);
    return response.data;
  },

  updateTenant: async (id: string, data: Partial<TenantRequest>): Promise<Tenant> => {
    const response = await axiosClient.put(`/tenants/${id}`, data);
    return response.data;
  },

  deleteTenant: async (id: string): Promise<void> => {
    await axiosClient.delete(`/tenants/${id}`);
  },

  getTenantsByRoom: async (roomId: string): Promise<Tenant[]> => {
    const response = await axiosClient.get(`/tenants/room/${roomId}`);
    return response.data;
  },

  getActiveTenants: async (): Promise<Tenant[]> => {
    const response = await axiosClient.get('/tenants/active');
    return response.data;
  },
};
