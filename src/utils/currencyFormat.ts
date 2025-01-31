import { CurrencyType } from "../types/gift-card";

export const currencyFormat = (value : number, currencyType = CurrencyType.QTZ) => {

    if (currencyType === CurrencyType.USD) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }

    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: 'GTQ',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
    
}