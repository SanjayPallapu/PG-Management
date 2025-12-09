// Auth types matching Java backend DTOs
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    pgName?: string;
    pgAddress?: string;
  }
  
  export interface JwtResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    owner: Owner;
  }
  
  export interface Owner {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    pgName?: string;
    pgAddress?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RefreshTokenRequest {
    refreshToken: string;
  }
  