import axios from "axios"
import { apiUrl } from "../../utils"
import { GiftCard } from "../../types/gift-card";

export const getGiftCard = async (code: string, authCode: string) : Promise<GiftCard | null> => {

    try {
        
        const params = {
            code,
            authCode
        }

        const { data } = await axios.get<GiftCard>(`${apiUrl}/GiftCard`, { params });

        return data;

    } catch (error) {

        return null;
        
    }

}