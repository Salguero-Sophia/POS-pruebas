import axios from "axios";
import {  getUrlApi } from "../../utils";
import { Closing } from "../../interfaces";

export const createClosing = async () : Promise<{ data : Closing | null, error: boolean, message: string}> => {

    try {

        // const { idEmpleado } = await getConfig();

        const apiUrl = await getUrlApi();

        // const arrayData: any[] = await window.ipcRenderer.readTransactionsFile();

        // const transactions = arrayData.filter((item: any) => !item.isProcessed);

        // const { data } = await axios.post<Closing>(`${apiUrl}/closing/`, { employeeId: idEmpleado });
        const { data } = await axios.post<Closing>(`${apiUrl}/closing/`, { employeeId: "" });

        return {
            data,
            error: false,
            message: "Closing created successfully"
        };

    } catch (error: any) {

        return {
            data: null,
            error: true,
            message: error?.response?.data?.message || "An error occurred while creating the closing"
        };

    }

};