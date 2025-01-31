import { EndPaymentRequest, StartPaymentRequest } from "../../interfaces";
// import { getUrlAps } from "../../utils";
import SessionManager from "./session-manager";

export const payCheck = async (check: number, total: number, referenceNumber: string) => {

    // const urlAps = await getUrlAps();

    const session = await SessionManager.startSession();

    const startPaymentRequest: StartPaymentRequest = {
        CheckNumber: check,
        ReferenceNumber: referenceNumber,
        Amount: total
    }

    try {

        // const transactionId = await window.ipcRenderer.fetchStartPayment(urlAps, session.id, startPaymentRequest);
        const transactionId = await window.ipcRenderer.fetchStartPayment("", session.id, startPaymentRequest);

        const endPaymentRequest: EndPaymentRequest = {
            TransactionId: transactionId,
            ApprovalCode: referenceNumber,
            ApprovedAmount: total
        }

        // await window.ipcRenderer.fetchEndPayment(urlAps, endPaymentRequest);
        await window.ipcRenderer.fetchEndPayment("", endPaymentRequest);

        return {
            message: "Transacción realizada con éxito",
            status: true
        };

    } catch (error: any) {

        return {
            message: `Error al insertar la transacción en ALOHA: ${error?.data?.ErrorMessage || ""} - NO COBRAR AL CLIENTE DE NUEVO - Conectar Pago Manualmente`,
            status: false
        };

    } finally {

        await SessionManager.logout();
        
    }

}