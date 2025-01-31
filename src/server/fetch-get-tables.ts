import axios from "axios";

export const fetchGetTables = async (_:Electron.IpcMainInvokeEvent,  urlAps: string, session: string) => {

    try {

        const { data } = await axios.post(`${urlAps}/GetOpenTables`,
          {
            "SessionId": session
          }
        );
    
        return data.Result || [];
    
      } catch (error:any) {
    
        console.log(error?.response?.data || error.message);

        return [];
    
      }

}