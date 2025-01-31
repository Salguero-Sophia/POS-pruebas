import axios from "axios";
import { getConfig, getUrlApi } from "../../utils";
import { IPaymentStrategy } from "./payment-strategy.interface";
import { ResponseProcessPayment } from "../../types/response-process-payment";

export class CreditCardStrategy implements IPaymentStrategy {

    async pay(id: string, amount: number, codePayemnt: number, authCode:string): Promise<ResponseProcessPayment> {

        const url = await getUrlApi();

        const { merchant } = await getConfig();

        const body: any = {
            merchant,
            id: id,
            typeOfPaymentCode: codePayemnt,
            amount
        }

        if(authCode !== ''){
            body.authCode = authCode;
        }


        try {

            const { data } = await axios.post(`${url}/check/process-payment`, body);

            return data;

        } catch (error: any) {

            let response = error.response?.data[0]?.description;

            if (response) {
                response = JSON.parse(response);
            }

            return {
                title: 'Error',
                message: response.message || error.message || 'Error al procesar el pago',
                status: false
            };
        }


    }

}