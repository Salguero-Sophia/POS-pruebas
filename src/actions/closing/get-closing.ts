import axios from "axios";
import {  getUrlApi } from "../../utils"
import { Closing } from "../../interfaces";

export const getClosing = async (): Promise<Closing | null> => {

    try {

        // const { idEmpleado } = await getConfig();

        const apiUrl = await getUrlApi();

        // const { data } = await axios.get<Closing>(`${apiUrl}/closing/${idEmpleado}`);
        const { data } = await axios.get<Closing>(`${apiUrl}/closing/`);

        return data;

    } catch (error) {

        return null;

    }

}