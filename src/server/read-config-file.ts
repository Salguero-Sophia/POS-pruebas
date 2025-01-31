import fs from 'node:fs';

export const readConfigFile = async () => {

    try {

        const filePath = import.meta.env['VITE_PATH_CONFIG']!;

        const data = fs.readFileSync(filePath, 'utf-8');

        const config: ConfigFile = JSON.parse(data);

        return config;

    } catch (error) {

        console.error('Error reading config file:', error);

        throw error;
        
    }

}