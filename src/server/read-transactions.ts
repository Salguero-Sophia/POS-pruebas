import fs from 'node:fs';
export const readTransactions = async (_: Electron.IpcMainInvokeEvent) => {
    
    try {
        const filePath = import.meta.env['VITE_PATH_TRANSACTIONS']!;

        if (!fs.existsSync(filePath)) {

            fs.writeFileSync(filePath, '[]');
        }

        const arrayFile = fs.readFileSync(filePath, 'utf8');

        return JSON.parse(arrayFile);

    } catch (error) {

        console.error('Error reading transaction file:', error);

        return [];

    }
}