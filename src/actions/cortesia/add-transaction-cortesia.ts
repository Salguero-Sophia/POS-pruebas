import axios from "axios";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils";
import { Transaction } from "../../types/cortesia-transaction";

export const addTransactionCortesia = async (cortesiaId: string, amount: number) => {

    const { storeId } = await getConfig();
    const { id } = await getEmployeeFile();

    const body = {
        cortesiaId: cortesiaId,
        transactionType: 0,
        amount: amount,
        createdBy: id,
        storeId: storeId
    }

    try {

        const { data } = await axios.post<Transaction>(`${apiUrl}/cortesia`, body);

        return data;

    } catch (error: any) {

        return error.response.data;

    }

}