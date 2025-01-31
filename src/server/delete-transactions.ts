import fs from 'node:fs';

export const deleteTransactions = async (_: Electron.IpcMainInvokeEvent) => {
        
        try {
            const filePath = import.meta.env['VITE_PATH_TRANSACTIONS']!;
    
            const arrayFile = fs.readFileSync(filePath, 'utf8');

            const arrayData = JSON.parse(arrayFile);

            arrayData.forEach((item: any) => {
                item.isProcessed = true;
            });

            fs.writeFileSync(filePath, JSON.stringify(arrayData, null, 2));

            return true;

        } catch (error) {

            console.error('Error deleting transaction file:', error);

            return false;

        }

}