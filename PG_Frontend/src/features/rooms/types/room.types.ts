export enum RoomType {
    SINGLE = 'SINGLE',
    DOUBLE = 'DOUBLE',
    TRIPLE = 'TRIPLE',
    DORMITORY = 'DORMITORY',
  }
  
  export enum RoomStatus {
    AVAILABLE = 'AVAILABLE',
    OCCUPIED = 'OCCUPIED',
    MAINTENANCE = 'MAINTENANCE',
    RESERVED = 'RESERVED',
  }
  
  export interface Room {
    id: string;
    roomNumber: string;
    roomType: RoomType;
    capacity: number;
    currentOccupancy: number;
    rentAmount: number;
    depositAmount: number;
    floor: number;
    status: RoomStatus;
    amenities: string[];
    description?: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RoomRequest {
    roomNumber: string;
    roomType: RoomType;
    capacity: number;
    rentAmount: number;
    depositAmount: number;
    floor: number;
    status: RoomStatus;
    amenities: string[];
    description?: string;
  }
  
  export interface RoomResponse extends Room {}
  
  export interface RoomFilters {
    status?: RoomStatus;
    roomType?: RoomType;
    floor?: number;
    minRent?: number;
    maxRent?: number;
    search?: string;
  }
  