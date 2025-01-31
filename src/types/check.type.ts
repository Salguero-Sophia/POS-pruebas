import { CheckPayment } from ".";

export interface Check {
    id:               string;
    storeId:          string;
    employeeId:       string;
    total:            number;
    subTotal:         number;
    balanceDue:       number;
    orderName:        string;
    employeeName:     string;
    time:             string;
    dayPart:          string;
    revenueCenter:    string;
    paymentAt:        Date | null;
    billingAt:        Date | null;
    cancellingAt:        Date | null;
    closingAt:        null;
    createdAt:        Date;
    updatedAt:        Date;
    printedAt:        Date;
    checkNumber:      number;
    store:            null;
    employee:         null;
    checkItems:       any[];
    paymentReference: null;
    invoice:          null;
    checkPayments:    CheckPayment[];
    pendingPayment:   number;
}