import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { deleteFile, deleteTransactions, fetchEndPayment, fetchEndSession, fetchGetCheckDetail, fetchGetChecks, fetchGetSession, fetchGetTables, fetchStartPayment, readConfigFile, readEmployeeFile, readTransactions, sendToPrint, writeConfigFile, writeEmployeeFile, writeTransactionFile } from '../src/server';
import { readChecks } from '../src/server/read-checks';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

const isDev = import.meta.env.MODE === 'development';

import  { autoUpdater } from "electron-updater";

// let curWindow;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC!, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    fullscreen: true,
    show: false,
    autoHideMenuBar: true
  })

  

  win.maximize();

  if (!isDev)
    setInterval(function () { win?.setAlwaysOnTop(true, 'screen-saver'); }, 1000)

  win.once('ready-to-show', () => {
    win!.show();
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
    win?.webContents.send('check-for-updates', `Current version ${app.getVersion()}`);
    setupAutoUpdater();
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {

    createWindow()

 }

})

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function setupAutoUpdater() {
  autoUpdater.on('update-available', () => {
    console.log('Nueva actualización disponible.');
    win?.webContents.send('update-available', 'Nueva actualización disponible.');
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', () => {
    console.log('No hay actualizaciones disponibles.');
    win?.webContents.send('update-not-available', 'No hay actualizaciones disponibles.');
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('Actualización descargada. Se instalará al salir.');
    win?.webContents.send('update-downloaded', 'Actualización descargada. Se instalará al salir.');
  });

  autoUpdater.on('error', (error) => {
    console.error(`Error en autoUpdater: ${error.message}`);
    win?.webContents.send('update-error', `Error en autoUpdater: ${error.message}`);
  });
}

// Close app
ipcMain.handle('close-app', () => {
  app.quit();
});

// Read checks
ipcMain.handle('read-checks', readChecks);

// Delete file
ipcMain.handle('delete-file', deleteFile);

// Read config file
ipcMain.handle('read-config-file', readConfigFile);

// Read employee file
ipcMain.handle('read-employee-file', readEmployeeFile);

// Write employee file
ipcMain.handle('write-employee-file', writeEmployeeFile);

// Write config file
ipcMain.handle('write-config-file', writeConfigFile);

// Write transaction file
ipcMain.handle('write-transaction-file', writeTransactionFile);

// Read transaction file
ipcMain.handle('read-transaction-file', readTransactions);

// Delete transactions
ipcMain.handle('delete-transactions', deleteTransactions);

//Start session
ipcMain.handle('fetch-get-session', fetchGetSession);

//End Session
ipcMain.handle('fetch-end-session', fetchEndSession);

//Get tables
ipcMain.handle('fetch-get-tables', fetchGetTables);

//Get Checks
ipcMain.handle('fetch-get-checks', fetchGetChecks);

//Get Check Detail
ipcMain.handle('fetch-get-check-detail', fetchGetCheckDetail);

// Start Payment 
ipcMain.handle('fetch-start-payment', fetchStartPayment);

// End Payment
ipcMain.handle('fetch-end-payment', fetchEndPayment);

// Send to print
ipcMain.handle('send-to-print', sendToPrint);

//Update App
ipcMain.handle('update-app', sendToPrint);

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  autoUpdater.checkForUpdatesAndNotify();
  
});
