import { ResponseProcessPayment } from "../../types/response-process-payment";

export interface IPaymentStrategy {
    pay(check: string, amount: number, codePayemnt: number, authCode: string): Promise<ResponseProcessPayment>;
}
