import { TypeOfPayment } from "./type-of-payment";

export type CheckPayment = {
    id: string;
    checkId: string;
    amount: number;
    createdAt: Date;

    cashTransaction: CashTransaction | null;
    paymentReference: PaymentReference | null;
    voucher: Voucher | null;
    typeOfPayment: TypeOfPayment;
}

interface CashTransaction {
    id: string;
    checkPaymentId: string;
    amount: number;
    createdAt: Date;

}

interface PaymentReference {
    id: string;
    checkPaymentId: string;
    reasonCode: number;
    amount: number;
    authorizationCode: string;
    avsCode: string;
    avsCodeRaw: string;
    cvCode: string;
    cvCodeRaw: string;
    authorizedDateTime: Date;
    processorResponse: string;
    reconciliationID: string;
    merchantAdviceCode: string;
    merchantAdviceCodeRaw: string;
    cavvResponseCode: string;
    cavvResponseCodeRaw: string;
    paymentNetworkTransactionID: string;
    reconciliationReferenceNumber: string;
    createdDatetime: Date;
}

interface Voucher {
    id: string;
    checkPaymentId: string;
    authCode: string;
    clientData: string;
    commerceData: string;
    instantWinner: string;
    createdAt: Date;
    terminalId: string;
    afiliacionId: string;

}
