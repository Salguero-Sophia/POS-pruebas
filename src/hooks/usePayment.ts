import { getConfig, getEmployeeFile } from "../utils";
import { createCoupon, createInvoice, getCheckDetail, getCuponesByEmployee, getNovaPagos, insertManyChecks, setPrinted } from "../actions";
import toast from "react-hot-toast";
import { CommonStrategy, CreditCardStrategy, PaymentProcessor } from "../strategies";
import { usePaymentStore } from "../store";
import { Check } from "../types";
import { Receptor } from "../types/receptor.type";
import { ResponseCuponesEmpleado } from "../types/response-cupones-empleado";

export const usePayment = () => {

    const checkId = usePaymentStore(state => state.checkId);
    const setChecks = usePaymentStore(state => state.setChecks);
    const selectedCheck = usePaymentStore(state => state.selectedCheck);
    const setSelectedCheck = usePaymentStore(state => state.setSelectedCheck);
    const selectedPaymentMethod = usePaymentStore(state => state.selectedPaymentMethod);
    const setChecksPrinted = usePaymentStore(state => state.setChecksPrinted);
    const setChecksPayment = usePaymentStore(state => state.setChecksPayment);
    const setReloadChecks = usePaymentStore(state => state.setReloadChecks);
    const setChecksBilling = usePaymentStore(state => state.setChecksBilling);
    const amountPaid = usePaymentStore(state => state.amountPaid);
    const setAmountPaid = usePaymentStore(state => state.setAmountPaid);
    const addCheckToChecksPayment = usePaymentStore(state => state.addCheckToChecksPayment);
    const addCheckToChecksPrinted = usePaymentStore(state => state.addCheckToChecksPrinted);
    const coupons = usePaymentStore(state => state.coupons);
    const setCoupons = usePaymentStore(state => state.setCoupons);
    const setEmployeeCupon = usePaymentStore(state => state.setEmployeeCupon);
    const setOptionSelected = usePaymentStore(state => state.setOptionSelected);
    const optionSelected = usePaymentStore(state => state.optionSelected);
    const selectedCoupon = usePaymentStore(state => state.selectedCoupon);
    const setSelectedCoupon = usePaymentStore(state => state.setSelectedCoupon);
    const employeeCode = usePaymentStore(state => state.employeeCode);
    const authCode = usePaymentStore(state => state.authCode);
    const setAuthCode = usePaymentStore(state => state.setAuthCode);

    const handlerSetChecks = async () => {

        const checksFromFile = await window.ipcRenderer.readChecks();

        const { storeId } = await getConfig();

        const { id: employeeId } = await getEmployeeFile();

        const data = checksFromFile.filter(x => x.total >= 0).map((x) => ({ ...x, storeId, employeeId }));

        if (data.length > 0) {

            const resultInsertMany = await insertManyChecks(data);

            if (resultInsertMany) {
                data.forEach(async (Item) => {
                    await window.ipcRenderer.deleteFile(Item.checkNumber);
                });
            }

        }

        const checksData = await getNovaPagos({
            PaymentAt: false,
            BillingAt: false,
            ClosingAt: false,
            PrintedAt: false
        });

        if (checksData?.length === 0) {

            toast.error('No hay cuentas pendientes por procesar');
            return;

        }

        const checksPrinted = [...checksData?.filter(x => x.printedAt != null && x.paymentAt == null)];
        const checksPayment = [...checksData?.filter(x => x.paymentAt != null && x.billingAt == null)];
        const checksBilling = [...checksData?.filter(x => x.billingAt != null)];
        const checks = [...checksData?.filter(x => x.printedAt == null && x.paymentAt == null && x.billingAt == null)];

        setChecksPrinted(checksPrinted);
        setChecksPayment(checksPayment);
        setChecksBilling(checksBilling);
        setChecks(checks);
        setSelectedCheck(checks[0]);

    };

    const handlerSetSelectedCheck = async (id: string) => {

        const checkDetail = await getCheckDetail(id);

        if (!checkDetail) return;

        setSelectedCheck(checkDetail);

        return checkDetail;

    }

    const handleProcessPayment = async () => {

        const paymentProcesor = new PaymentProcessor();

        if (selectedPaymentMethod === 2) {
            paymentProcesor.paymentStrategy = new CreditCardStrategy();
        } else {
            paymentProcesor.paymentStrategy = new CommonStrategy();
        }

        const checkData = selectedCheck!;

        const response = await paymentProcesor.pay(checkData?.id, amountPaid, selectedPaymentMethod, authCode);

        if (response.status) {

            const checkDetail = await handlerSetSelectedCheck(checkData.id);

            setAmountPaid(checkDetail.pendingPayment);

            addCheckToChecksPayment(checkDetail);

            setAuthCode('');
        }

        return response;

    }

    const handlePrintPrecuenta = async () => {

        const id = selectedCheck?.id!;

        const { printerName } = await getConfig();

        const print = await window.ipcRenderer.sendToPrint(id, printerName, 1);

        console.log({ print });

        addCheckToChecksPrinted();

        await setPrinted(id);

        setReloadChecks(true);

    }

    const handlePrintInvoice = async () => {

        const id = selectedCheck?.id!;

        const { printerName } = await getConfig();

        const print = await window.ipcRenderer.sendToPrint(id, printerName, 2);

        console.log({ print });

    }

    const handleCreateInvoice = async (receptor: Receptor) => {

        const response = await createInvoice(checkId, receptor);

        if (!response.status) {
            toast.error(response.message);
            return response;
        }

        const newSelectedCheck = { ...selectedCheck, billingAt: new Date() } as Check;

        setSelectedCheck(newSelectedCheck);

        setReloadChecks(true);

        await handlePrintInvoice();

        return response;

    }

    const handleSetPayment = (divideIn: number) => {

        const total = selectedCheck?.pendingPayment!;

        if (divideIn === 0) {

            usePaymentStore.setState({ amountPaid: total });

            return;

        }

        const amount = Number((total / divideIn).toFixed(2));

        usePaymentStore.setState({ amountPaid: amount });

    }

    const handleGetCoupons = async (idEmployee: number, dpiEmployee: string): Promise<ResponseCuponesEmpleado | null> => {

        setCoupons([]);

        setSelectedCoupon(null)

        setEmployeeCupon(null);

        setOptionSelected(null);

        const data = await getCuponesByEmployee(idEmployee, dpiEmployee);

        if (!data){
            toast.error("No se encontró el empleado");
            return null;
        }

        const { cupones, empleado } = data;

        setCoupons(cupones);

        setEmployeeCupon(empleado);

        return data;

    }

    const handleRedeemCoupon = async () => {

        const { id } = await getEmployeeFile();

        const { storeId } = await getConfig();


        const createCouponDto = {
            code: selectedCoupon?.cupon!,
            description: `${optionSelected?.nombre}`,
            value: optionSelected?.valor!,
            employeeCode: employeeCode!,
            storeId: storeId!,
            printerTimes: 1,
            createdBy: id!,
        }

        var response = await createCoupon(createCouponDto);

        if (!response) {
            toast.error("Error al canjear el cupón");
        } else {

            const { printerName } = await getConfig();

            await window.ipcRenderer.sendToPrint(response.id, printerName, 4);

            toast.success("Cupón canjeado con éxito");

            setCoupons(coupons.filter(x => x.cupon !== selectedCoupon?.cupon));
            setSelectedCoupon(null)

            setEmployeeCupon(null);

            setOptionSelected(null);

        }

    }

    return {

        //Methods
        handlerSetChecks,
        handlerSetSelectedCheck,
        handleProcessPayment,
        handlePrintInvoice,
        handleCreateInvoice,
        handlePrintPrecuenta,
        handleSetPayment,
        handleGetCoupons,
        handleRedeemCoupon
    };


}