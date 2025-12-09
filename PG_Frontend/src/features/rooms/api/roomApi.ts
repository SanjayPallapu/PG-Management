import axiosClient from '@/shared/lib/axiosClient';
import { Room, RoomRequest, RoomFilters } from '../types/room.types';
import { PageResponse, PageRequest } from '@/shared/types/common.types';

export const roomApi = {
  getAllRooms: async (filters?: RoomFilters, pageRequest?: PageRequest): Promise<PageResponse<Room>> => {
    const params = { ...filters, ...pageRequest };
    const response = await axiosClient.get('/rooms', { params });
    return response.data;
  },

  getRoomById: async (id: string): Promise<Room> => {
    const response = await axiosClient.get(`/rooms/${id}`);
    return response.data;
  },

  createRoom: async (data: RoomRequest): Promise<Room> => {
    const response = await axiosClient.post('/rooms', data);
    return response.data;
  },

  updateRoom: async (id: string, data: Partial<RoomRequest>): Promise<Room> => {
    const response = await axiosClient.put(`/rooms/${id}`, data);
    return response.data;
  },

  deleteRoom: async (id: string): Promise<void> => {
    await axiosClient.delete(`/rooms/${id}`);
  },

  getAvailableRooms: async (): Promise<Room[]> => {
    const response = await axiosClient.get('/rooms/available');
    return response.data;
  },

  getRoomStats: async () => {
    const response = await axiosClient.get('/rooms/stats');
    return response.data;
  },
};
