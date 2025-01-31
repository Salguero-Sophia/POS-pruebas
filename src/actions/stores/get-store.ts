import axios from "axios";
import { Store } from "../../interfaces";
import { getUrlApi } from "../../utils";

export const getStore = async (storeId: string) => {

    try {
        
        const apiUrl = await getUrlApi();

        const { data } = await axios.get<Store>(`${apiUrl}/store/${storeId}`);

        return data;

    } catch (error) {

        return null;

    }

}