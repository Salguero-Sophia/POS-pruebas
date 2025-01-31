import { useEffect, useState, } from 'react';
import './footer.css';
import { IpcRendererEvent } from 'electron';

const year = new Date().getFullYear();

export const Footer = () => {

    const [message, setMessage] = useState<string>('');

    useEffect(() => {

        console.log('HOLA MUNDO');

        const handleUpdateMessage = (_: IpcRendererEvent, message: string): void => {
            console.log(`Message: ${message}`);
            setMessage(message);
        };

        window.ipcRenderer.on('check-for-updates', handleUpdateMessage);
        window.ipcRenderer.on('update-available', handleUpdateMessage);
        window.ipcRenderer.on('update-not', handleUpdateMessage);
        window.ipcRenderer.on('update-downloaded', handleUpdateMessage);
        window.ipcRenderer.on('update-error', handleUpdateMessage);

        return () => {
            window.ipcRenderer.off('check-for-updates', handleUpdateMessage);
        };
    }, []);

    return (
        <footer aria-labelledby="footer-heading" className="footer border-t border-gray-200 bg-white">

            <h2 id="footer-heading" className="sr-only">

                Footer

            </h2>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="border-t border-gray-100 py-4 text-center">

                    <p className="text-sm text-gray-500">&copy; {year} San Martín. todos los derechos reservados.</p>
                    <p className="text-sm text-gray-500">{message}</p>

                </div>

            </div>

        </footer>
    )
}
