export async function getEmployeeFile(): Promise<EmployeeFile> {

    try {

        const config = await window.ipcRenderer.readEmployeeFile();

        return config;

    } catch (error) {

        return {
            id: '',
            code: '',
            name: '',
        }

    }

}