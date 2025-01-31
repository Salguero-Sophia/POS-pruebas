import axios from "axios";

export const fetchEndSession = async (_:Electron.IpcMainInvokeEvent, urlAps: string, session: string) => {

    try {

        await axios.post(`${urlAps}/Logout`,
            {
                SessionId: session
            }
        );

        return true;

    } catch (error: any) {

        console.log(error?.response?.data || error.message);

        return false;

    }

}