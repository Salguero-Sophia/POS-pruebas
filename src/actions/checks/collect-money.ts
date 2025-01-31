import axios from "axios"
import { JSONRequestCollectMoney, ResponseCollectMoney } from "../../interfaces"
import { getConfig, getUrlApi } from "../../utils";
import { CheckDetail } from "../../interfaces/check-detail.interface";

export const collectMoney = async (check: number, total:number, checkDetail: CheckDetail) => {

    const config = await getConfig();

    const { merchant } = await getConfig();

    const body: JSONRequestCollectMoney = {
        merchant: merchant,
        amount: total,
        startPayment : {
            idCheck: check,
            amount: total,
        },
        transaction: {
            amountPaid: total,
            balance: checkDetail.Balance,
            checkNumber: checkDetail.CheckNumber,
            gratuity: checkDetail.Gratuity,
            isClosed: checkDetail.IsClosed,
            isRefund: checkDetail.IsRefund,
            items: checkDetail.Items.map(item => ({
                name: item.Name,
                price: item.Price,
                quantity: item.Quantity,
            })),
            subTotal: checkDetail.SubTotal,
            total: checkDetail.Total,
            totalTax: checkDetail.TotalTax,
            storeId: config.storeId,
            // employeeId: config.idEmpleado,
            employeeId: "",
        }
    };

    try {

        const apiUrl = await getUrlApi();

        const { data } = await axios.post<ResponseCollectMoney>(`${apiUrl}/checks/collect-money`, { ...body });

        return data;

    } catch (error) {

        return undefined;

    }

}