/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

interface CheckFileData {
  nameFile?: string;
  amountTrans?: number | string;
  additionalAmount?: number | string;
  CLOSED?: string;
  EMPLOYEE?: string;
  DOB?: string;
  DATE?: string;
  TIME?: string;
  COUNTER?: string;
  ORDERNAME?: string;
  GUESTS?: string;
  REVENUECENTER?: string;
  MENUNAME?: string;
  DAYPART?: string;
  ITEM?: string;
  SUBTOTAL?: string;
  TOTAL1ITEM?: string;
  CASH?: string;
  BALANCEDUE?: string;
  INCLUSIVETAX?: string;
}

interface ElectronAPI {
  readCheckFiles: () => Promise<CheckFileData[]>;
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer & ElectronAPI
}
