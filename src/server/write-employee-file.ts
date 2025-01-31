import fs from 'node:fs';

export const writeEmployeeFile = async (_: Electron.IpcMainInvokeEvent, employee:EmployeeFile) => {

    try {
        
        const employeeFilePath = import.meta.env['VITE_PATH_EMPLOYEE']!;
        
        console.log({employeeFilePath});

        if (fs.existsSync(employeeFilePath)) {

            
            const data = fs.readFileSync(employeeFilePath, 'utf-8');

            const employeeFile: EmployeeFile = JSON.parse(data);

            
            const updatedConfig = {
                ...employeeFile,
                ...employee
            };

            
            fs.writeFileSync(employeeFilePath, JSON.stringify(updatedConfig, null, 2));

            return { success: true, message: 'Config file updated successfully.' };

        } else {
            
            fs.writeFileSync(employeeFilePath, JSON.stringify(employee, null, 2));

            return { success: true, message: 'Config file created successfully.' };

        }
        
    } catch (error) {

        console.error('Error writing config file:', error);

        throw error;
        
    }


}