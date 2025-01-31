import axios from "axios";
import { apiUrl } from "../../utils";

export const createCoupon = async (createCoupon: CreateCoupon) => {

    try {

        const { data } = await axios.post(`${apiUrl}/coupon/`, createCoupon);

        return data;

    } catch (error) {

        console.log(error);

        return null;

    }
}

interface CreateCoupon {
    code: string;
    description: string;
    value: number;
    employeeCode: number | null;
    printerTimes: number;
    createdBy: string;
    storeId: string;
}