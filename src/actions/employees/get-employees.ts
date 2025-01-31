import axios from 'axios';
import { getUrlApi } from '../../utils';
import { Employee } from '../../interfaces';

export const getEmployees = async () => {

    try {

        const apiUrl = await getUrlApi();

        const { data } = await axios.get<Employee[]>(`${apiUrl}/employee`);

        return data;

    } catch (error) {

        return [];

    }

}