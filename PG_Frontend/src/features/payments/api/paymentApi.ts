import axiosClient from '@/shared/lib/axiosClient';
import { Payment, PaymentRequest } from '../types/payment.types';
import { PageResponse, PageRequest } from '@/shared/types/common.types';

export const paymentApi = {
  getAllPayments: async (filters?: any, pageRequest?: PageRequest): Promise<PageResponse<Payment>> => {
    const params = { ...filters, ...pageRequest };
    const response = await axiosClient.get('/payments', { params });
    return response.data;
  },

  getPaymentById: async (id: string): Promise<Payment> => {
    const response = await axiosClient.get(`/payments/${id}`);
    return response.data;
  },

  createPayment: async (data: PaymentRequest): Promise<Payment> => {
    const response = await axiosClient.post('/payments', data);
    return response.data;
  },

  updatePayment: async (id: string, data: Partial<PaymentRequest>): Promise<Payment> => {
    const response = await axiosClient.put(`/payments/${id}`, data);
    return response.data;
  },

  deletePayment: async (id: string): Promise<void> => {
    await axiosClient.delete(`/payments/${id}`);
  },

  getPaymentsByTenant: async (tenantId: string): Promise<Payment[]> => {
    const response = await axiosClient.get(`/payments/tenant/${tenantId}`);
    return response.data;
  },

  getPendingPayments: async (): Promise<Payment[]> => {
    const response = await axiosClient.get('/payments/pending');
    return response.data;
  },

  getOverduePayments: async (): Promise<Payment[]> => {
    const response = await axiosClient.get('/payments/overdue');
    return response.data;
  },
};
