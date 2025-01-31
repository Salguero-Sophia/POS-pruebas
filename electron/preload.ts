import { ipcRenderer, contextBridge } from 'electron'
import { Check, DeleteFileResponse, EndPaymentRequest, StartPaymentRequest, Table } from '../src/interfaces'
import { CheckDetail } from '../src/interfaces/check-detail.interface'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
  readCheckFiles: () => ipcRenderer.invoke('read-check-files'),
  deleteCheckFile: (fileName: string): Promise<DeleteFileResponse> => ipcRenderer.invoke('delete-check-file', fileName),
  getConfig: () => ipcRenderer.invoke('read-config-file'),
  saveConfig: (newConfig: ConfigFile): Promise<DeleteFileResponse> => ipcRenderer.invoke('write-config-file', newConfig),
  closeApp: () => ipcRenderer.invoke('close-app'),
  fetchGetSession: (idTerminal: string, idEmployee: string): Promise<string> => ipcRenderer.invoke('fetch-get-session', idTerminal, idEmployee),
  fetchGetTables: (idTerminal: string, session: string): Promise<Table[]> => ipcRenderer.invoke('fetch-get-tables', idTerminal, session),
  fetchEndSession: (idTerminal: string, session: string): Promise<void> => ipcRenderer.invoke('fetch-end-session', idTerminal, session),
  fetchGetChecks: (idTerminal: string, session: string, tableId: number): Promise<Check[]> => ipcRenderer.invoke('fetch-get-checks', idTerminal, session, tableId),
  fetchGetCheckDetail: (idTerminal: string, session: string, checkId: number): Promise<CheckDetail> => ipcRenderer.invoke('fetch-get-check-detail', idTerminal, session, checkId),
  fetchStartPayment: (idTerminal: string, session: string, data: StartPaymentRequest): Promise<string> => ipcRenderer.invoke('fetch-start-payment', idTerminal, session, data),
  fetchEndPayment: (idTerminal: string, data: EndPaymentRequest): Promise<void> => ipcRenderer.invoke('fetch-end-payment', idTerminal, data),
  writeTransactionFile: (data: any) => ipcRenderer.invoke('write-transaction-file', data),
  readTransactionsFile: () => ipcRenderer.invoke('read-transaction-file'),
  deleteTransactions: () => ipcRenderer.invoke('delete-transactions'),
  sendToPrint: (idPayment:string, printerName: string, type: number) => ipcRenderer.invoke('send-to-print', idPayment, printerName, type),
  readEmployeeFile: () => ipcRenderer.invoke('read-employee-file'),
  writeEmployeeFile: (employee: EmployeeFile) => ipcRenderer.invoke('write-employee-file', employee),
  readChecks: () => ipcRenderer.invoke('read-checks'),
  deleteFile: (fileName: string) => ipcRenderer.invoke('delete-file', fileName),
  // You can expose other APTs you need here.
  // ...
})
