import axios from "axios";
import { Invoice, Refound } from "../../types";
import { apiUrl } from "../../utils";

export const createRefound = async (refoundSelected: Refound, invoice: Invoice, reason: string) => {

    try {

        const deleteFile = await window.ipcRenderer.deleteFile(refoundSelected.checkNumber.toString());

        if (!deleteFile) return;

        const { data } = await axios.post(`${apiUrl}/invoice/credit-note/${invoice.checkId}`, {
            checkId: invoice.checkId,
            reason: reason,
        });

        return data;

    } catch (error) {

        console.error(error);

        return null;

    }

}