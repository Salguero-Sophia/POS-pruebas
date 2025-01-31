import axios from "axios";
import { getUrlApi } from "../../utils";

export const insertTransactions = async () => {

    try {
        
        const apiUrl = await getUrlApi();

        const arrayData: any[] = await window.ipcRenderer.readTransactionsFile();

        const arrayDataProcessed = arrayData.filter((item: any) => !item.isProcessed);

        await axios.post(`${apiUrl}/checks/inserted-transactions`, arrayDataProcessed );

        return true;

    } catch (error) {

        return false;

    }

}