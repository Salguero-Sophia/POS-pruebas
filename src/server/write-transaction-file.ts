import fs from 'node:fs';

export const writeTransactionFile = async (_: Electron.IpcMainInvokeEvent, data: any) => {

    try {

        const filePath = import.meta.env['VITE_PATH_TRANSACTIONS']!;

        // create file if not exists
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }

        // into the file write the data in JSON format and append it
        const arrayFile = fs.readFileSync(filePath, 'utf8');

        const array = JSON.parse(arrayFile);

        array.push(data);

        fs.writeFileSync(filePath, JSON.stringify(array, null, 2));
        
        return true;

    } catch (error) {

        console.error('Error writing transaction file:', error);

        return false;

    }

}