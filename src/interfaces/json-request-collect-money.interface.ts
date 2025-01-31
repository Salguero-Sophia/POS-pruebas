import { Transaction } from "./transaction.interface";

export interface JSONRequestCollectMoney {
    merchant: Merchant,
    amount: number,
    transaction?: Transaction;
    startPayment?: StartPayment;
}

export interface StartPayment {
    idCheck: number;
    amount: number;
}

export interface Merchant {
    terminalId: string
    cardAcqId: string
}

export interface AmountCollectMoney {
    "amountTrans": string,
    "additionalAmounts": string,
    "taxDetail": TaxDetail[]
}

export interface TaxDetail {
    type: string;
    grossAmount: string;
    taxAmountNet: string;
    rate: string;
}

export interface PrivateUse63 {
    lodgingFolioNumber14: string;
    cashbackAmount41: string;
    taxAmount1: string;
}