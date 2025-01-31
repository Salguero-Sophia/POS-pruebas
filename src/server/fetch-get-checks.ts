import axios from "axios";

export const fetchGetChecks = async (_: Electron.IpcMainInvokeEvent, urlAps: string, session: string, idMesa: number) => {

    try {

        const { data } = await axios.post(`${urlAps}/GetTableDetails`,
            {
                "SessionId": session,
                "TableId": idMesa
            }
        );

        return data.Result || [];

    } catch (error) {

        throw error;

    }

}