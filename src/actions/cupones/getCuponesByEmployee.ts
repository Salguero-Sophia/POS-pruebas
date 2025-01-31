import axios from "axios";
import { apiUrl, getConfig } from "../../utils";
import { ResponseCuponesEmpleado } from "../../types/response-cupones-empleado";

export const getCuponesByEmployee = async (employeeId: number, identity: string) : Promise<ResponseCuponesEmpleado | null> => {

    try {

        const { storeId } = await getConfig();

        const params = {
            code: employeeId,
            identity: identity,
            storeId: storeId
        }

        const { data } = await axios.get(`${apiUrl}/employee/cupones`, { params });

        return data;

    } catch (error: any) {

        return null

    }

};