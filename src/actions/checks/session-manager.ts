// import { getConfig, getUrlAps } from "../../utils";

interface Session {
    id: string;
    exp: Date;
}

class SessionManager {

    private static instance: SessionManager;

    private session: Session | null = null;

    private constructor() { }

    public static getInstance(): SessionManager {

        if (!SessionManager.instance) {

            SessionManager.instance = new SessionManager();

        }

        return SessionManager.instance;

    }

    public async startSession(): Promise<Session> {

        if (this.session && !this.isSessionExpired()) {

            return this.session;

        }

        this.session = await this.getSession();

        return this.session;
    }

    private async getSession(): Promise<Session> {

        // const { idEmpleado } = await getConfig();

        // const urlAps = await getUrlAps();

        // const sessionData = await window.ipcRenderer.fetchGetSession(urlAps, idEmpleado);

        const expirationTime = new Date();

        expirationTime.setMinutes(expirationTime.getMinutes() + 2);

        return {
            // id: sessionData,
            id: "",
            exp: expirationTime
        };

    }

    private isSessionExpired(): boolean {

        if (!this.session) {
            return true;
        }

        const now = new Date();

        return now > this.session.exp;

    }

    public async logout(): Promise<void> {

        if (!this.session) {
            return;
        }

        // const urlAps = await getUrlAps();

        // window.ipcRenderer.fetchEndSession(urlAps, this.session?.id!);

        this.session = null;

    }
    
}

const instance = SessionManager.getInstance();

export default instance;