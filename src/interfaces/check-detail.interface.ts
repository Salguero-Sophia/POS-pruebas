
export interface ResponseGetCheckDetail {
    Result: CheckDetail;
}

export interface CheckDetail {
    AppliedTaxes: any[];
    Balance:      number;
    CheckNumber:  number;
    Gratuity:     number;
    IsClosed:     boolean;
    IsRefund:     boolean;
    Items:        Item[];
    SubTotal:     number;
    Total:        number;
    TotalTax:     number;
}

export interface Item {
    ItemId:   number;
    Name:     string;
    Price:    number;
    Quantity: number;
    SubItems: Item[];
}
