import fs from 'node:fs';

export const readEmployeeFile = async () => {

    try {

        const filePath = import.meta.env['VITE_PATH_EMPLOYEE']!;

        const data = fs.readFileSync(filePath, 'utf-8');

        const config: EmployeeFile = JSON.parse(data);

        return config;

    } catch (error) {

        console.error('Error reading config file:', error);

        throw error;
        
    }

};