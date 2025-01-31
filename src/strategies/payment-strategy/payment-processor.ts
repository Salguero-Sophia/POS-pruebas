import { ResponseProcessPayment } from "../../types/response-process-payment";
import { IPaymentStrategy } from "./payment-strategy.interface";

export class PaymentProcessor {

    private _paymentStrategy?: IPaymentStrategy;

    constructor() { }

    set paymentStrategy(paymentStrategy: IPaymentStrategy) {
        this._paymentStrategy = paymentStrategy;
    }

    pay(check: string, amount: number, codePayemnt: number, authCode: string): Promise<ResponseProcessPayment> {

        if (!this._paymentStrategy)
            throw new Error('Payment strategy is not set');

        return this._paymentStrategy.pay(check, amount, codePayemnt, authCode);

    }
}