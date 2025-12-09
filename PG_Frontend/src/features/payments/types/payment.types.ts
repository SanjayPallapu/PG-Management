export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    OVERDUE = 'OVERDUE',
    PARTIAL = 'PARTIAL',
    CANCELLED = 'CANCELLED',
  }
  
  export enum PaymentMethod {
    CASH = 'CASH',
    UPI = 'UPI',
    BANK_TRANSFER = 'BANK_TRANSFER',
    CHEQUE = 'CHEQUE',
    CARD = 'CARD',
  }
  
  export interface Payment {
    id: string;
    tenantId: string;
    tenantName?: string;
    roomNumber?: string;
    amount: number;
    paymentMonth: string;
    paymentDate?: string;
    dueDate: string;
    status: PaymentStatus;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    remarks?: string;
    lateFee?: number;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface PaymentRequest {
    tenantId: string;
    amount: number;
    paymentMonth: string;
    paymentDate?: string;
    dueDate: string;
    status: PaymentStatus;
    paymentMethod?: PaymentMethod;
    transactionId?: string;
    remarks?: string;
    lateFee?: number;
  }
  