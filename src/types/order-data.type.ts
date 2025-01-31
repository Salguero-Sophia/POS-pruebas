export type CheckItem = {
    name: string;
    price: number;
    quantity: number;
    total: number;
};

export type OrderData = {
    storeId: string;
    employeeId: string;
    checkNumber: number;
    total: number;
    subTotal: number;
    balanceDue: number;
    orderName: string;
    employeeName: string;
    time: { ticks: number };
    dayPart: number;
    revenueCenter: string;
    checkItems: CheckItem[];
};