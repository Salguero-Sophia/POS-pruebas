import axios from "axios";
import { StartPaymentRequest } from "../interfaces";

export const fetchStartPayment = async (_: Electron.IpcMainInvokeEvent, urlAps: string, session: string, data: StartPaymentRequest) => {

    try {

        const { data: response } = await axios.post(`${urlAps}/StartPayment`,
            {
                Request: {
                    SessionId: session,
                    PaymentType: 2,
                    CheckNumber: data.CheckNumber,
                    ReferenceNumber: data.ReferenceNumber,
                    Amount: data.Amount
                }
            }
        );

        return response.Result.TransactionId || "";

    } catch (error) {

        throw error;

    }

}