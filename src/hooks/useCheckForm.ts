import { useEffect, useState } from "react";
import { Notification } from "../interfaces";
import { getNovaPagos, insertManyChecks, setPrinted } from "../actions";
import { useFormContext } from "react-hook-form";
import { getConfig, getEmployeeFile, } from "../utils";
import { useChecksStore } from "../store";
import { Check } from "../types";
import { CommonStrategy, CreditCardStrategy, PaymentProcessor } from "../strategies";


export const useCheckForm = () => {

    const setPendienteDePago = useChecksStore(state => state.setPendienteDePago);
    // const pendienteDePago = useChecksStore(state => state.pendienteDePago);
    // const cantidadAPagar = useChecksStore(state => state.getCantidadAPagar());
    const setCantidadPagada = useChecksStore(state => state.setCantidadPagada);
    const isLoadingPayment = useChecksStore(state => state.isLoadingPayment);
    // const setIsLoadingPayment = useChecksStore(state => state.setIsLoadingPayment);
    const selectedPaymentMethod = useChecksStore(state => state.selectedPaymentMethod);

    const methods = useFormContext();

    const { watch, handleSubmit } = methods;

    const { setValue, control, formState, getValues } = methods;

    const { errors } = formState;

    const { check, checkDetail } = watch();

    const [checks, setChecks] = useState<Check[]>([]);

    const [orderDetail, setOrderDetail] = useState<Check>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isLoadingPrinter, setIsLoadingPrinter] = useState<boolean>(false);

    const [notification] = useState<Notification>();

    const [reload, setReload] = useState<boolean>(true);

    useEffect(() => {

        const fetchChecks = async () => {

            setIsLoading(true);

            const checksFromFile = await window.ipcRenderer.readChecks();

            const { storeId } = await getConfig();

            const { id: employeeId } = await getEmployeeFile();

            const data = checksFromFile.filter(x => x.total > 0).map((x) => ({ ...x, storeId, employeeId }));


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


            setValue('check', checksData[0].id);

            setChecks(checksData);

            setReload(false);

            setIsLoading(false);

        }

        if (reload)
            fetchChecks();

    }, [reload]);

    useEffect(() => {

        const fetchCheckDetail = async () => {

            const checkDetail = checks.find(x => x.id == check);

            setOrderDetail(checkDetail!);

            setPendienteDePago(checkDetail!.total);

            setCantidadPagada(checkDetail!.total);

        }

        if (check)
            fetchCheckDetail();

    }, [check]);

    const onSubmit = async (data: { [key: string]: any }) => {

        const paymentProcesor = new PaymentProcessor();

        if (selectedPaymentMethod === 0) {
            paymentProcesor.paymentStrategy = new CommonStrategy();
        }

        if (selectedPaymentMethod === 1) {
            paymentProcesor.paymentStrategy = new CreditCardStrategy();
        }

        const checkData = data.check;

        paymentProcesor.pay(checkData, data.amount, 0, "");

    }

    const handlePrintPrecuenta = async () => {

        setIsLoadingPrinter(true);

        const id = getValues('check');

        const { printerName } = await getConfig();

        const print = await window.ipcRenderer.sendToPrint(id, printerName, 1);

        await setPrinted(id);

        console.log({ print });

        setIsLoadingPrinter(false);

    }

    // const handleInsertCheck = async () => {

    //     const { storeId } = await getConfig();
    //     const { id } = await getEmployeeFile();

    //     orderDetail!.storeId = storeId;
    //     orderDetail!.employeeId = id!;

    //     return await insertCheck(orderDetail!);
    // }

    return {
        tables: [],
        checks,
        notification,
        isLoading,
        isLoadingPayment,
        isLoadingPrinter,
        errors,
        control,
        onSubmit,
        setReload,
        handleSubmit,
        checkDetail,
        handlePrintPrecuenta,
        orderDetail
    }

}
