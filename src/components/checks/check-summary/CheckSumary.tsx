
import { currencyFormat } from '../../../utils/currencyFormat';
import novaPagoLogo from '../../../assets/novapagos_gris.png';
import { TypeOfPayments } from './TypeOfPayments';
import { SpinnerLoader } from '../../ui/spinner-loader/SpinnerLoader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Success } from '../../Success';
import { Error } from '../../Error';
import { usePaymentStore } from '../../../store';
import { useKeyboardCustom, usePayment } from '../../../hooks';
import { AmountToPaid } from './AmountToPaid';
import { TotalsSummary } from './TotalsSummary';
import { PrinterButton } from './PrinterButton';
import { EmployeeGifts } from './EmployeeGifts';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, IconButton, Switch, TextField } from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export const CheckSumary = () => {

  const navigate = useNavigate();

  const isLoading = usePaymentStore(state => state.isLoading);
  const isLoadingPayment = usePaymentStore(state => state.isLoadingPayment);
  const setIsLoadingPayment = usePaymentStore(state => state.setIsLoadingPayment);
  const notification = usePaymentStore(state => state.notification);
  const setNotification = usePaymentStore(state => state.setNotification);
  const amountPaid = usePaymentStore(state => state.amountPaid);
  const setOpen = usePaymentStore(state => state.setOpen);
  const selectedCheck = usePaymentStore(state => state.selectedCheck);
  const selectedPaymentMethod = usePaymentStore(state => state.selectedPaymentMethod);
  const authCode = usePaymentStore(state => state.authCode);
  const setAuthCode = usePaymentStore(state => state.setAuthCode);

  const [isContingencia, setIsContingencia] = useState<boolean>(false);

  const { handlePrintPrecuenta, handleProcessPayment, handlePrintInvoice } = usePayment();

  const { handleOpenKeyboard } = useKeyboardCustom();

  const navigateToInvoicePage = () => {
    setOpen(true);
    navigate('/invoice');
  }

  const onConfirmPayment = async () => {

    setIsLoadingPayment(true);

    setNotification(null);

    const response = await handleProcessPayment();

    if (response.status) {
      toast.success(response.message);
      setNotification({ status: true, message: response.message });
    }

    if (!response.status) {
      toast.error(response.message);
      setNotification({ status: false, message: response.message });
    }

    setIsLoadingPayment(false);

  }

  useEffect(() => {

    setNotification(null);
    setIsLoadingPayment(false);

  }, [selectedCheck])

  return (

    <div>

      <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">

        <TypeOfPayments />

        {
          (selectedPaymentMethod === 69) && <EmployeeGifts />
        }


        {
          isLoading
            ? <SpinnerLoader />
            : (
              <TotalsSummary />
            )
        }

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 gap-4 flex flex-col">


          <div className="flex flex-row gap-4 h-12">

            <PrinterButton onPrint={handlePrintPrecuenta} label="Imprimir Precuenta" />

            {
              (!selectedCheck?.billingAt && !selectedCheck?.paymentAt) && <AmountToPaid />
            }


          </div>


          {
            (selectedCheck?.billingAt)
            && <PrinterButton onPrint={handlePrintInvoice} label="ReImprimir Factura" />

          }

          {
            notification && (
              notification.status ? <Success message={notification.message} /> : <Error message={notification.message} />
            )
          }

          {
            !selectedCheck?.paymentAt && (selectedPaymentMethod === 2) && (
              <FormControlLabel control={<Switch value={isContingencia} onChange={(e) => setIsContingencia(e.target.checked)} />} label="Contingencia" />
            )
          }

          {
            !selectedCheck?.paymentAt && isContingencia && (selectedPaymentMethod === 2) &&
            (
              <div className="flex gap-4">
                <TextField
                  required
                  id="code"
                  value={authCode}
                  label="Número de Autorización"
                  onChange={(e) => setAuthCode(e.target.value)}
                  variant="filled"
                  type='number'
                  fullWidth
                />

                <IconButton onClick={() => handleOpenKeyboard(authCode, (e) => setAuthCode(e), true)}>

                  <KeyboardIcon />

                </IconButton>

              </div>
            )
          }

          {
            !selectedCheck?.paymentAt
            && (
              <button
                type="button"
                disabled={isLoadingPayment}
                onClick={onConfirmPayment}
                className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
              >
                {
                  isLoadingPayment ? <span className="loader" /> : <span>Confirmar Pago Por</span>
                }

                <span>
                  {currencyFormat(amountPaid || 0)}
                </span>

              </button>
            )
          }

          {
            selectedCheck?.paymentAt && !selectedCheck?.billingAt
            && (
              <button
                type="button"
                onClick={navigateToInvoicePage}
                className="w-full rounded-md border border-transparent mt-6 bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center gap-2 justify-center"
              >

                Realizar Factura

              </button>
            )
          }



        </div>

      </div>

      <div className="flex justify-end mt-4" style={{ height: '50px' }} >

        <img src={novaPagoLogo} alt="NovaPago" />

      </div>

    </div>

  )
}
