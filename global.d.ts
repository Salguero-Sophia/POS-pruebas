interface CheckFileData {
  data: string;
  fileName: string;
}

interface ConfigFile {
  merchant: Merchant
  storeId: string;
  printerName: string;
  version: string;
}

interface EmployeeFile {
  code: string;
  name: string;
  id?: string;
  session?: string;
}

interface Merchant {
  terminalId: string
  cardAcqId: string
}

interface ElectronAPI {
  readCheckFiles: () => Promise<CheckFileData[]>;
  deleteCheckFile: (fileName: string) => Promise<{ success: boolean; message: string; }>
  saveConfig: (newConfig: ConfigFile) => Promise<{ success: boolean; message: string; }>
  closeApp: () => Promise<any>
  getConfig: () => Promise<ConfigFile>;
  fetchGetSession: (idTerminal: string, idEmployee: string) => Promise<string>;
  fetchEndSession: (idTerminal: string, session: string) => Promise<void>;
  fetchGetTables: (idTerminal: string, session: string) => Promise<Table[]>;
  fetchGetChecks: (idTerminal: string, session: string, tableId: number) => Promise<Check[]>;
  fetchGetCheckDetail: (idTerminal: string, session: string, checkId: number) => Promise<CheckDetail>;
  fetchStartPayment: (idTerminal: string, session: string, data: StartPaymentRequest) => Promise<string>;
  fetchEndPayment: (idTerminal: string, data: EndPaymentRequest) => Promise<void>;
  writeTransactionFile: (data: any) => Promise<boolean>;
  readTransactionsFile: () => Promise<any>;
  deleteTransactions: () => Promise<boolean>;
  sendToPrint: (idPayment: string, printerName: string, type: number) => Promise<void>;
  readEmployeeFile: () => Promise<EmployeeFile>;
  writeEmployeeFile: (employee: EmployeeFile) => Promise<{ success: boolean; message: string; }>
  readChecks: () => Promise<any[]>;
  deleteFile: (fileName: string) => Promise<{ success: boolean; message: string; }>
}

interface Window {
  ipcRenderer: ElectronAPI;
}