import axios from "axios";
import { EndPaymentRequest } from "../interfaces";

export const fetchEndPayment = async (_:Electron.IpcMainInvokeEvent, urlAps: string, data: EndPaymentRequest) => {

    try {

        const { data: response } = await axios.post(`${urlAps}/CompleteTransaction`,
          {
            Request: {
              TransactionId: data.TransactionId,
              Approved: true,
              ApprovalCode: data.ApprovalCode,
              ApprovedAmount: data.ApprovedAmount,
              ApprovedCashback: 0,
              ApprovedTip: 0,
              ReferenceNumber: data.ApprovalCode
            }
          }
        );
    
        return response || null;
    
      } catch (error) {
    
        throw error;
    
      }
};