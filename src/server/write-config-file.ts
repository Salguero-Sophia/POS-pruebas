import fs from 'node:fs';

export const writeConfigFile = async (_: Electron.IpcMainInvokeEvent, newConfig: ConfigFile) => {

    try {
        
        const configFilePath = import.meta.env['VITE_PATH_CONFIG']!;
        
        if (fs.existsSync(configFilePath)) {

            
            const data = fs.readFileSync(configFilePath, 'utf-8');

            const config: ConfigFile = JSON.parse(data);

            
            const updatedConfig = {
                ...config,
                ...newConfig
            };

            
            fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));

            return { success: true, message: 'Config file updated successfully.' };

        } else {
            
            fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));

            return { success: true, message: 'Config file created successfully.' };

        }
        
    } catch (error) {

        console.error('Error writing config file:', error);

        throw error;
        
    }

}