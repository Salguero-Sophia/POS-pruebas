import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ClosingPage, ConfigurationPage, EmployeePage, HomePage, InvoicePage, RembolsosPage } from '../pages';
import { AppLayout } from '../layouts';

export const AppRouter = () => {
    return (
        <Router>
            <AppLayout>
                <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/rembolsos" element={<RembolsosPage />} />
                    <Route path="/config" element={<ConfigurationPage />} />
                    <Route path="/" element={<EmployeePage />} />
                    <Route path="/invoice" element={<InvoicePage />} />
                    <Route path="/closing" element={<ClosingPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </AppLayout>
        </Router>
    )
}