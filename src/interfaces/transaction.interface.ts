export interface Transaction {
    balance: number;
    checkNumber: number;
    gratuity: number;
    employeeId: string;
    isClosed: boolean;
    isRefund: boolean;
    subTotal: number;
    total: number;
    totalTax: number;
    amountPaid: number;
    items: ItemTransaction[];
    storeId: string;
}
export interface ItemTransaction {
    name: string;
    price: number;
    quantity: number;
}
