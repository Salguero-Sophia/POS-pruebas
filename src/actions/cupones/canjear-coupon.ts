import axios from "axios";
import { apiCuponesUrl } from "../../utils";

export interface CanjearCouponRequest {
    cupon: string,
    nombreBeneficiario: string,
    tiendaCanje: number
}

export const canjearCoupon = async (request: CanjearCouponRequest): Promise<boolean> => {

    try {

        await axios.post(`${apiCuponesUrl}/canjear-cupon`, request);

        return true;

    } catch (error) {

        console.error(error);

        return false;
    }

}