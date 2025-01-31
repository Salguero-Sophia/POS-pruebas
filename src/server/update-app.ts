import { exec } from 'child_process';

export const updateApp = async () => {
    const scriptPath = "../../public/script.ps1"; // Cambiar a la ruta donde guardaste el script

    // Comando para ejecutar el script con el parámetro URL
    const command = `powershell -ExecutionPolicy Bypass -File "${scriptPath}" -urlPath `;
  
    // Ejecutar el comando
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el script: ${error.message}`);
        return;
      }
  
      if (stderr) {
        console.error(`Error en el script: ${stderr}`);
        return;
      }
  
      console.log(`Salida del script:\n${stdout}`);
    });
}