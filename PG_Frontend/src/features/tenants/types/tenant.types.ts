export enum TenantStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING = 'PENDING',
    VACATED = 'VACATED',
  }
  
  export interface Tenant {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    roomNumber?: string;
    aadharNumber?: string;
    emergencyContact?: string;
    emergencyContactName?: string;
    dateOfJoining: string;
    dateOfLeaving?: string;
    depositPaid: number;
    monthlyRent: number;
    status: TenantStatus;
    photoUrl?: string;
    address?: string;
    occupation?: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TenantRequest {
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    aadharNumber?: string;
    emergencyContact?: string;
    emergencyContactName?: string;
    dateOfJoining: string;
    depositPaid: number;
    monthlyRent: number;
    status: TenantStatus;
    photoUrl?: string;
    address?: string;
    occupation?: string;
  }
  
  export interface TenantResponse extends Tenant {}
  
  export interface TenantFilters {
    status?: TenantStatus;
    roomId?: string;
    search?: string;
  }
  