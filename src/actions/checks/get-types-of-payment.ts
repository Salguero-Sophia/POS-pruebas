import axios from "axios"
import { apiUrl } from "../../utils"
import { TypeOfPayment } from "../../types";

export const getTypesOfPayment = async (): Promise<TypeOfPayment[]> => {

    try {

        const { data } = await axios.get<TypeOfPayment[]>(`${apiUrl}/Check/types-of-payment`);

        return data;

    } catch (error) {

        console.error(error);
        return [];
    }

}