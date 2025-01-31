export async function getConfig(): Promise<ConfigFile> {

    try {

        const config = await window.ipcRenderer.getConfig();


        return config;

    } catch (error) {

        return {
            merchant: {
                terminalId: "",
                cardAcqId: "",
            },
            storeId: '',
            printerName: '',
            version: '0'
        }

    }

}