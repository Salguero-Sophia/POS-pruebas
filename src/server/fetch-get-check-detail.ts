import axios from "axios";

export const fetchGetCheckDetail = async (_: Electron.IpcMainInvokeEvent, urlAps: string, session: string, checkId: number) => {

    try {

        const { data } = await axios.post(`${urlAps}/GetCheckDetails`,
            {
                "SessionId": session,
                "CheckNumber": checkId
            }
        );

        return data.Result || [];

    } catch (error) {

        throw error;

    }

}