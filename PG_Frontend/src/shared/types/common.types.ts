// Common types matching Java backend DTOs
export interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
  }
  
  export interface PageRequest {
    page: number;
    size: number;
    sort?: string;
  }
  
  export interface PageResponse<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ErrorResponse;
    message?: string;
  }
  