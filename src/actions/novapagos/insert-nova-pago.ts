import axios from "axios";
import { InsertNovaPagoI } from "../../interfaces";
import { apiUrl } from "../../utils";

export const insertNovaPago = async (novaPago: InsertNovaPagoI) => {

    try {
        
        const { data } = await axios.post(`${apiUrl}/nova-pagos`, novaPago);

        return data;

    } catch (error) {

        console.log(error);

        return null;
        
    }

}