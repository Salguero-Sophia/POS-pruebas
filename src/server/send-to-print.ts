import { exec } from 'child_process';

export const sendToPrint = async (_: Electron.IpcMainInvokeEvent, idPayment: string, printerName: string, type: number) => {

  const commad = `"C:\\BootDrv\\Aloha\\PrintCheck\\ThermalPrintPOS.exe" "${idPayment}" "${printerName}" "${type}"`;

  
  const promise = new Promise((resolve, reject) => {
    
    try {
      
      var message = '';

      exec(`${commad}`, (error: any, stdout: any, stderr: any) => {

        if (error) {
          console.error(`error: ${error.message}`);
          message = error;
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          message = stderr;
          return;
        }

        message = stdout || 'Printed';

        console.log(`stdout: ${stdout}`);

        resolve(message);

      });

    } catch (error: any) {

      message = error

      console.log(error);

      reject(message);
    }

  });

  try {
    
    const result = await promise;

    return result;

  } catch (error) {
   
    console.log(error);

    return error;
    
  }

}