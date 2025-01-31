// import { getUrlAps } from "../../utils";
import SessionManager from "./session-manager";

export const getChecks = async (table: number) => {

    // const urlAps = await getUrlAps();

    try {

        const session = await SessionManager.startSession();

        // const checks = await window.ipcRenderer.fetchGetChecks(urlAps, session?.id!, table);
        const checks = await window.ipcRenderer.fetchGetChecks("", session?.id!, table);

        return {
            checks,
            status: true,
            message: "Checks cargados correctamente"
        };

    } catch (error: any) {

        return {
            checks: [],
            status: false,
            message: error?.response?.data?.message || "Error no controlado"
        };

    } finally {

        await SessionManager.logout();
        
    }
    
}