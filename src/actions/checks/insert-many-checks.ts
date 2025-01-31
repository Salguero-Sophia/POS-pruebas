import axios from "axios";
import { apiUrl, getConfig } from "../../utils";
import { OrderData } from "../../types";

export const insertManyChecks = async (checks: OrderData[]): Promise<boolean> => {
    try {

        const { storeId } = await getConfig();

        const { data } = await axios.post(`${apiUrl}/check/many/${storeId}`, checks);

        return data;

    } catch {

        console.log('Error inserting checks');

        return false;

    }
}