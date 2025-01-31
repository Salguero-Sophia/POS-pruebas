export type GiftCard = {
    id: string;
    segmento: string;
    code: string;
    authCode: string;
    email: string;
    createdAt: Date;
    balance: number;
    isDisabled: boolean;
    expirationDate: Date | null;
    giftCardTransactions: GiftCardTransaction[];
    canBeReload: boolean;
    currency: CurrencyType;

}

export type GiftCardTransaction = {
    id: string;
    giftCardId: string;
    transactionType: number;
    amount: number;
    createdAt: Date;
    createdByCode: number;
    createdByName: string;
    createdStoreCode: number;
    createdStoreName: string;
    currency: CurrencyType;
}

export enum CurrencyType {
    USD,
    QTZ
}
