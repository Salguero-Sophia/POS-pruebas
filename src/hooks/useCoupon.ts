import { canjearCoupon, createCoupon, validCoupon } from "../actions"
import { Cupone } from "../types/response-cupones-empleado";
import { getConfig, getEmployeeFile } from "../utils";

export const useCoupon = () => {

    const handleValidCoupon = async (code: string) => {

        const coupon = await validCoupon(code);

        return coupon;
    }

    const handleCanjearCoupon = async (coupon: Cupone) => {

        const { code: codeEmployee, id } = await getEmployeeFile();

        const { storeId } = await getConfig();

        var result = await canjearCoupon({ cupon: coupon.cupon, nombreBeneficiario: codeEmployee, tiendaCanje: 135 });

        if (!result) {
            return false;
        }

        const createCouponDto = {
            code: coupon.cupon,
            description: coupon.descripcionCupon,
            value: coupon.valor,
            employeeCode: null,
            storeId: storeId!,
            printerTimes: 1,
            createdBy: id!,
        }

        var response = await createCoupon(createCouponDto);

        const { printerName } = await getConfig();

        await window.ipcRenderer.sendToPrint(response.id, printerName, 4);

        return true;
    }

    return {
        handleValidCoupon,
        handleCanjearCoupon
    }

}