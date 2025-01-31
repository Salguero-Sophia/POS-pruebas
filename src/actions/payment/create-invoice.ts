import axios from "axios";
import { Receptor } from "../../types/receptor.type";
import { apiUrl } from "../../utils";

export const createInvoice = async (checkId: string, receptor: Receptor) => {

    try {

        const { data: _ } = await axios.post(`${apiUrl}/invoice/${checkId}`, receptor);

        return {
            status: true,
            message: 'Factura creada correctamente'
        }

    } catch (error:any) {

        return {
            status: false,
            message: error?.response?.data[0]?.code || 'Error al crear la factura'
        }

    }

};