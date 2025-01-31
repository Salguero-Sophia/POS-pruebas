import axios from "axios";
import { GiftCard } from "../../types/gift-card";
import { apiUrl, getConfig } from "../../utils";

export const getEmployeeGiftCard = async (code: number) : Promise<GiftCard | null> => {

    try {

        const { storeId } = await getConfig();

        const { data } = await axios.get(`${apiUrl}/GiftCard/employee/${code}/${storeId}`);

        return data;

    } catch (error: any) {

        return null

    }

}