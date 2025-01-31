import axios from "axios";
import { getEmployeeFile, getUrlApi } from "../../utils";
import { Employee } from "../../interfaces";

export const getEmployee = async () => {

    try {

        const { id } = await getEmployeeFile();

        const apiUrl = await getUrlApi();

        const { data } = await axios.get<Employee>(`${apiUrl}/employee/${id}`);

        return data;

    } catch (error) {

        return null;

    }

}