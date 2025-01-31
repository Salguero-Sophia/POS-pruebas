import axios from "axios";
import { apiUrl } from "../../utils";

export interface RedeemCouponRequest {
    checkId: string;
    value: number;
    name: string;
    redeemCoupon: {
        cupon: string;
        valor: number;
        tiendaCanje: number;
        descripcionCupon: string;
    }
}

export const redeemCoupon = async (request: RedeemCouponRequest ) : Promise<boolean> => {

    try {
        
        await axios.post(`${apiUrl}/check/redeem-coupon`, request);
    
        return true;

    } catch (error) {

        console.log(error);

        return false;

    }

    

}

