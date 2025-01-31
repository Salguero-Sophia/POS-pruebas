import axios from "axios";
import { apiUrl, getConfig, getEmployeeFile } from "../../utils";
import { Invoice } from "../../types";

export interface GetInvoiceToRefoundRequest {
    monto: number;
    cantidadItems: number;
}

export const getInvoiceToRefound = async (request: GetInvoiceToRefoundRequest) : Promise<Invoice[]> => {

    try {

        const { id } = await getEmployeeFile();

        const { storeId } = await getConfig();

        const { data } = await axios.get(`${apiUrl}/invoice/?monto=${request.monto}&cantidadItems=${request.cantidadItems}&storeId=${storeId}&employeeId=${id}`);

        return data;
        
    } catch (error) {

        console.error(error);

        return [];
        
    }

}; 