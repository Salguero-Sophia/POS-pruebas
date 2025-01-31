import axios from "axios";
import { apiUrl } from "../../utils";
import { Employee } from "../../interfaces";

export const createEmployee = async (code: number, storeId:string) => {
    try {
        
        const { data } = await axios.post<Employee>(`${apiUrl}/employee`, { code, storeId });

        return data;

    } catch (error) {

        return null;

    }
}