import { Merchant } from "./json-request-collect-money.interface";

export interface ResponseCollectMoney {
    transactionType: string;
    amountTrans:     string;
    systemsTraceNo:  string;
    timeLocalTrans:  string;
    dateLocalTrans:  string;
    retrievalRefNo:  string;
    authIdResponse:  string;
    responseCode:    string;
    additionalData:  string;
    merchant:        Merchant;
    privateUse63:    PrivateUse63;
    voucher:         Voucher;
    numberReference: string;
}

export interface Voucher {
    commerceVoucher: string;
    clientVoucher:   string;
    instantWinner:   string;
}

interface PrivateUse63 {
    alternateHostResponse22: string;
    suggestionTaxId27:       string;
}

