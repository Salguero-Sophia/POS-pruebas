import axios from "axios";
import { Store } from "../../interfaces";
import { getUrlApi } from "../../utils";

export const getStores = async (): Promise<Store[]> => {

    try {

        const apiUrl = await getUrlApi();

        const { data } = await axios.get<Store[]>(`${apiUrl}/store`);

        return data;

    } catch (error) {

        return [];

    }
};