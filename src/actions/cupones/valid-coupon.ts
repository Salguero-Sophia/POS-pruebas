import axios from "axios"
import { Cupone } from "../../types/response-cupones-empleado"
import { apiCuponesUrl } from "../../utils"

export const validCoupon = async (code: string): Promise<Cupone | null> => {

    try {

        const { data } = await axios.get<Cupone>(`${apiCuponesUrl}/cupon/${code}`);

        return data;

    } catch (error) {

        console.error(error);

        return null;
    }

}