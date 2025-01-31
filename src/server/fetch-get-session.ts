import axios from "axios";

export const fetchGetSession = async (_: Electron.IpcMainInvokeEvent, urlAps: string, idEmployee: string) => {

    try {

        const { data } = await axios.post(`${urlAps}/Login`,
            {
                Request: {
                    LoginType: 2,
                    LoginData: idEmployee
                }
            }
        );

        return data.Result.SessionId || undefined;

    } catch (error: any) {

        console.log(error?.response?.data || error.message);

        return null;

    }

}