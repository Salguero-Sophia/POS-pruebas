import { Item } from "../check-detail.interface";

export interface InsertNovaPagoI {

    amountPaid: number;
    total: number;
    tableId: string;
    table: number;
    checkNumber: number;
    checkDetail: number;
    employeeId: number;
    storeId: string;
    items: Item[];

}