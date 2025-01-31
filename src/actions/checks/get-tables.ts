// import { getUrlAps } from "../../utils"
import toast from 'react-hot-toast';
import SessionManager from "./session-manager";

export const getTables = async () => {

    // const urlAps = await getUrlAps();

    try {

        // const session = await SessionManager.startSession();

        // const tables = await window.ipcRenderer.fetchGetTables(urlAps, session?.id!);
    
        return {
            // tables,
            status: true,
            message: "Mesas cargadas correctamente"
        };

    } catch (error: any) {

        toast.error(error?.response?.data?.message || "Error no controlado", {
            position: 'bottom-center',
        });

        return {
            tables: [],
            status: false,
            message: error?.response?.data?.message || "Error no controlado"
        };

    } finally {

        await SessionManager.logout();
        
    }

}