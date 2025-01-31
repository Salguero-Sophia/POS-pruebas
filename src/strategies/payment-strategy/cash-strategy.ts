import axios from "axios";
import { ResponseProcessPayment } from "../../types/response-process-payment";
import { getConfig, getUrlApi } from "../../utils";
import { IPaymentStrategy } from "./payment-strategy.interface";

export class CommonStrategy implements IPaymentStrategy {

    async pay(id: string, amount: number, codePayemnt: number, _ = ""): Promise<ResponseProcessPayment> {

        const url = await getUrlApi();

        const { merchant } = await getConfig();

        const body = {
            merchant,
            id: id,
            typeOfPaymentCode: codePayemnt,
            amount
        }

        const { data } = await axios.post(`${url}/check/process-payment`, body);

        return data;

    }

}