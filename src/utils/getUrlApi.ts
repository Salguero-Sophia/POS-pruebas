// import { getConfig } from "./getConfig";

const isDev = import.meta.env.MODE === 'development';
export const apiUrl = isDev ? import.meta.env.VITE_URL_API_DEV : import.meta.env.VITE_URL_API_PROD;
export const apiCuponesUrl = isDev ? import.meta.env.VITE_URL_API_CUPONES_DEV : import.meta.env.VITE_URL_API_CUPONES_PROD;
export const urlAloha = import.meta.env.VITE_URL_ALOHA;
export const urlStart = import.meta.env.VITE_URL_START;

export const getUrlApi = async () => {

    // const { host, apiPort } = await getConfig();

    if(isDev)
        return apiUrl;

    // return `http://${host}:${apiPort}/api`;
    return apiUrl;

}