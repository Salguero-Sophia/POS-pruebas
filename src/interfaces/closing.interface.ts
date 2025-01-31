export interface EmployeeClosing {
    id: string;
    codigo: number;
    name: string;
    lastName: string;
    position: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    storeId: string;
}

export interface TransactionClosing {
    id: string;
    balance: number;
    POSId: string;
    POSAfiliacion: string;
    checkNumber: number;
    gratuity: number;
    isClosed: boolean;
    isRefund: boolean;
    subTotal: number;
    total: number;
    totalTax: number;
    amountPaid: number;
    createdAt: string;
    updatedAt: string;
    storeId: string;
    voucherId: string;
    employeeId: string;
    closingId: string;
}

export interface Closing {
    id: string;
    items: number;
    total: number;
    subTotal: number;
    totalTax: number;
    hour: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    storeId: string;
    employeeId: string;
    employee: EmployeeClosing;
    transactions: TransactionClosing[];
}