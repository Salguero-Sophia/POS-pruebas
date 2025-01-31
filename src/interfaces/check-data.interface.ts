export interface CheckData {
    [key: string]: any;
    nameFile: string;
    amountTrans: string;
    additionalAmount: string;
    transaction?: Transaction;
}

type Item = {
    name: string;
    price: number;
    totalPrice: number;
    quantity: number;
    discount: number;
  };
  
  type Payment = {
    method: string;
    amount: number;
    tip: number;
    details: string;
    expiration: string;
  };
  
  type InclusiveTax = {
    type: number;
    amount: number;
  };
  
export type Transaction = {
    closed: boolean;
    check: string;
    employee: {
      employeeId: number;
      lastName: string;
      firstName: string;
      role: string;
    };
    dob: Date;
    date: Date;
    time: Date;
    counter: number;
    orderName: string;
    guests: number;
    revenueCenter: string;
    menuName: string;
    dayPart: string;
    items: Item[];
    subTotal: number;
    total1Item: number;
    payment: Payment;
    balanceDue: number;
    inclusiveTax: InclusiveTax;
  };
  