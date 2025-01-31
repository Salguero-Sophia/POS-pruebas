import { Footer, Menu } from '../components';
import { Toaster } from 'react-hot-toast';
// import { BillingModal } from '../components/checks/billing-modal/BillingModal';
import { RembolsoModal } from '../components/rembolsos/rembolso-modal/RembolsoModal';
import { NumberKeyboard } from '../components/ui/keyboard/NumericKeyboard';
import { StringKeyboard } from '../components/ui/keyboard/StringKeyboard';
import { ModalTransactionsGiftCards } from '../components/checks/check-summary/coupons/ModalTransactionsGiftCards';

interface Props {
    children: React.ReactNode;
}

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialogContent-root': {
//         padding: theme.spacing(2),
//     },
//     '& .MuiDialogActions-root': {
//         padding: theme.spacing(1),
//     },
// }));

export const AppLayout = ({ children }: Props) => {

    return (
        <div className="bg-gray-50">

            <Menu />

            <main className="py-8 px-4">

                <Toaster />

                {children}

                {/* <BillingModal /> */}

                <RembolsoModal />

                <ModalTransactionsGiftCards isEmployee={false} />
                <ModalTransactionsGiftCards isEmployee={true} />

                <NumberKeyboard />

                <StringKeyboard />

            </main>

            <Footer />

        </div>
    )
}
