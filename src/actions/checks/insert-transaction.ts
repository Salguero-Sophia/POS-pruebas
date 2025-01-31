import axios from "axios";
import { getUrlApi } from "../../utils";
import { ResponseCollectMoney } from "../../interfaces";

export const insertTransaction = async(body:any) => {

    try {

        const apiUrl = await getUrlApi();

        const { data } = await axios.post<ResponseCollectMoney>(`${apiUrl}/checks/inserted-transaction`, { ...body });

        return data;

    } catch (error) {

        return undefined;

    }

}