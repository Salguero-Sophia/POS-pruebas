import axios from "axios";
import { GiftCardTransaction } from "../../types/gift-card";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils";

export const addTransactionGiftCard = async (giftCardId: string, amount: number, transactionType: number, email:string) => {
    try {

        const { storeId } = await getConfig();

        const { id } = await getEmployeeFile();
        
        const body = {
            giftCardId,
            transactionType,
            amount,
            createdBy: id,
            storeId,
            email
        }

        const { data } = await axios.post<GiftCardTransaction>(`${apiUrl}/GiftCard/Transaction`, body);

        return data;

    } catch (error) {

        return null;
        
    }
}