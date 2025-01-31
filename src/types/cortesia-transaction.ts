export interface Cortesia {
    id: string;
    employeeCode: number;
    lastBalance: number;
    currentBalance: number;
    createdAt: Date;
    rechargeAt: Date;
    updatedAt: Date;
    createdBy: string;
    storeId: string;
    transactions: Transaction[];
}

export interface Transaction {
    id: string;
    cortesiaId: string;
    transactionType: number;
    amount: number;
    createdAt: Date;
    createdBy: string;
    storeId: string;
    createdByCode: number;
    createdByName: string;
    createdStoreCode: number;
    createdStoreName: string;
    createdStoreAddress: string;
    currency: number;
}
