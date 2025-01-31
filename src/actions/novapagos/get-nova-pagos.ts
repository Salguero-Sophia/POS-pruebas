import axios from "axios";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils";
import { Check } from "../../types";

interface Params {
    PaymentAt:boolean;
    BillingAt:boolean;
    ClosingAt:boolean;
    PrintedAt:boolean;
}

export const getNovaPagos = async (params: Params) : Promise<Check[]> => {

    try {

        const { storeId } = await getConfig();
        const { id } = await getEmployeeFile();

        const { data } = await axios.get(`${apiUrl}/check/${storeId}/${id}?PaymentAt=${params.PaymentAt}&BillingAt=${params.BillingAt}&ClosingAt=${params.ClosingAt}&PrintedAt=${params.PrintedAt}`);

        return data;

    } catch {

        return [];

    }

}