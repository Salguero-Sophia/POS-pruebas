import { PopoverGroup } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

import logo from '../../../assets/logo.svg'
import SessionManager from '../../../actions/checks/session-manager';
import { useChecksStore } from '../../../store';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { getEmployeeFile } from '../../../utils';

const navigation = {
    other: [
        { name: 'Inicio', href: '/home' },
        { name: 'Rembolsos', href: '/rembolsos' },
        { name: 'Empleado', href: '/' },
        { name: 'Cierre', href: '/closing' },
        { name: 'Configuraciones', href: '/config' },
    ],
}

const routesToActive = ['/home', '/rembolsos', '/closing',];

export const Menu = () => {

    const isLoadingPayment = useChecksStore(state => state.isLoadingPayment);

    const isActiveRoutes = useChecksStore(state => state.isActiveRoutes);
    const setIsActiveRoutes = useChecksStore(state => state.setIsActiveRoutes);

    useEffect(() => {
        const asyncAction = async () => {
            const { id } = await getEmployeeFile();


            if (id) {
                setIsActiveRoutes(true);
            }
        }

        asyncAction();
    }, [isActiveRoutes]);

    const handleCloseApp = async () => {

        if (isLoadingPayment) return;

        await SessionManager.logout();

        window.ipcRenderer.closeApp();

    };

    return (
        <header className="relative bg-primary shadow-sm">

            <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                <div className="px-4 pb-14 sm:px-0 sm:pb-0">

                    <div className="flex h-16 items-center justify-between">

                        <div className="flex flex-1">

                            <a href="#">

                                <span className="sr-only">San Martín</span>

                                <img
                                    alt=""
                                    src={logo}
                                    className="h-8 w-auto"
                                />

                            </a>

                        </div>

                        <PopoverGroup className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">

                            <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">

                                {navigation.other.map((item) => {

                                    if (!isActiveRoutes && routesToActive.includes(item.href)) return null;

                                    return (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => `flex items-center text-sm font-medium text-white hover:text-gray-800 ${isActive ? 'underline' : ''}`}
                                        >
                                            {item.name}
                                        </NavLink>
                                    )
                                })}

                            </div>

                        </PopoverGroup>

                        <div className="flex flex-1 items-center justify-end">

                            <Button
                                color='error'
                                variant='contained'
                                disabled={isLoadingPayment}
                                onClick={handleCloseApp}>
                                Cerrar
                            </Button>

                            {/* <button
                                        type="button"
                                        onClick={handleCloseApp}
                                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
                                    >
                                        Cerrar
                                    </button> */}
                        </div>

                    </div>

                </div>

            </nav>

        </header>
    )
}
