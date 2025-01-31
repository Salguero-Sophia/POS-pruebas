import axios from "axios";
import { apiUrl } from "../../utils";
import { VersionClient } from "../../types";

export const getVersionClient = async (): Promise<VersionClient | null> => {

    try {

        const { data } = await axios.get<VersionClient>(`${apiUrl}/versionClient`);

        return data;

    } catch (error) {

        return null;

    }

}