export interface DetailNovaPagoI {
    id: string;
    amountPaid: number;
    total: number;
    tableId: string;
    table: number;
    checkNumber: number;
    checkDetail: number;
    paymentAt: null;
    billingAt: null;
    closingAt: null;
    createAt: Date;
    updatedAt: Date;
    employeeId: string;
    storeId: string;
    closingId: null;
    store: Store;
    employee: Employee;
    NovaPagoItem: NovaPagoItem[];
    referencePayment: string;
}

export interface NovaPagoItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    level: number;
    father: null;
    novaPagoId: string;
}

interface Employee {
    id: string;
    codigo: number;
    name: string;
    lastName: string;
    position: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    storeId: string;
}

interface Store {
    id: string;
    name: string;
    host: string;
    apiPort: string;
    apsPort: string;
    phone: string;
    email: string;
    logo: string;
    address: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
