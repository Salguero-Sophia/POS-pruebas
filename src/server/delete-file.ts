import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

export const deleteFile = async (_: Electron.IpcMainInvokeEvent, fileName: string): Promise<{ success: boolean; message: string; }> => {
    try {
        const checksFolder = import.meta.env['VITE_PATH_CHECKS']!;
        const archiveFolder = import.meta.env['VITE_ARCHIVE_PATH']!;
        const extensionFile = '.CHK';

        const sourcePath = path.join(checksFolder, `${fileName}${extensionFile}`);
        const newFileName = `${fileName}-${uuidv4()}${extensionFile}`;
        const destinationPath = path.join(archiveFolder, newFileName);

        // Verificar si la carpeta de destino existe, si no, crearla
        if (!fs.existsSync(archiveFolder)) {
            fs.mkdirSync(archiveFolder, { recursive: true });
        }

        // Mueve el archivo a la nueva ubicación
        fs.renameSync(sourcePath, destinationPath);

        return { success: true, message: 'File moved successfully' };
    } catch (error) {
        console.error('Error moving file', error);
        return { success: false, message: 'Error moving file' };
    }
};
