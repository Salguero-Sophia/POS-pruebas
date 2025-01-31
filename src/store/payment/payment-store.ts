import { create } from "zustand"
import { Check } from "../../types";
import { Notification } from "../../interfaces";
import { Cupone, Empleado, Opcione } from "../../types/response-cupones-empleado";


interface State {
    open: boolean;
    setOpen: (open: boolean) => void;
    checkId: string;
    setCheckId: (checkId: string) => void;
    selectedPaymentMethod: number;
    setSelectedPaymentMethod: (selectedPaymentMethod: number) => void;
    checks: Check[];
    setChecks: (checks: Check[]) => void;
    checksPrinted: Check[];
    setChecksPrinted: (checksPrinted: Check[]) => void;
    addCheckToChecksPrinted: () => void;
    selectedCheck: Check | null;
    setSelectedCheck: (selectedCheck: Check) => void;
    isLoadingPrinter: boolean;
    setIsLoadingPrinter: (isLoadingPrinter: boolean) => void;
    isLoadingPayment: boolean;
    setIsLoadingPayment: (isLoadingPayment: boolean) => void;
    notification: Notification | null;
    setNotification: (notification: Notification | null) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    checksPayment: Check[];
    setChecksPayment: (checksPrinted: Check[]) => void;
    addCheckToChecksPayment: (check: Check) => void;
    checksBilling: Check[];
    setChecksBilling: (checksPrinted: Check[]) => void;
    reloadChecks: boolean;
    setReloadChecks: (reloadChecks: boolean) => void;
    amountPaid: number;
    setAmountPaid: (amountPaid: number) => void;
    coupons: Cupone[];
    setCoupons: (coupones: Cupone[]) => void;
    selectedCoupon: Cupone | null;
    employeeCupon: Empleado | null;
    setEmployeeCupon: (employeeCupon: Empleado | null) => void;
    setSelectedCoupon: (selectedCoupon: Cupone | null) => void;
    setOptionSelected: (optionSelected: Opcione | null) => void;
    optionSelected: Opcione | null;
    employeeCode: number | null;
    setEmployeeCode: (employeeCode: number | null) => void;
    couponCode: string;
    setCouponCode: (couponCode: string) => void;
    authCode: string;
    setAuthCode: (authCode: string) => void;
    dpiEmployee: string;
    setDpiEmployee: (dpiEmployee: string) => void;
}

export const usePaymentStore = create<State>()((set, get) => ({
    open: false,
    setOpen: (open) => set({ open }),
    checkId: '',
    setCheckId: (checkId) => set({ checkId }),
    selectedPaymentMethod: 2,
    setSelectedPaymentMethod: (selectedPaymentMethod) => set({ selectedPaymentMethod }),
    checks: [],
    setChecks: (checks) => set({ checks }),
    checksPrinted: [],
    setChecksPrinted: (checksPrinted) => set({ checksPrinted }),
    addCheckToChecksPrinted: () => {
        const checksPrinted = get().checksPrinted;
        const check = get().selectedCheck;
        checksPrinted.push(check!);
        set({ checksPrinted });
    },
    selectedCheck: null,
    setSelectedCheck: (selectedCheck) => {

        set({ selectedCheck })

        if (selectedCheck) {
            set({ amountPaid: selectedCheck.pendingPayment })
            set({ checkId: selectedCheck.id })
        }

    },
    isLoadingPrinter: false,
    setIsLoadingPrinter: (isLoadingPrinter) => set({ isLoadingPrinter }),
    isLoadingPayment: false,
    setIsLoadingPayment: (isLoadingPayment) => set({ isLoadingPayment }),
    notification: null,
    setNotification: (notification) => set({ notification }),
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    checksPayment: [],
    setChecksPayment: (checksPayment) => set({ checksPayment }),
    addCheckToChecksPayment: (check) => {
        const checksPayment = get().checksPayment;
        checksPayment.push(check);
        set({ checksPayment });
    },
    checksBilling: [],
    setChecksBilling: (checksBilling) => set({ checksBilling }),
    reloadChecks: true,
    setReloadChecks: (reloadChecks) => set({ reloadChecks }),
    amountPaid: 0,
    setAmountPaid: (amountPaid) => set({ amountPaid }),
    coupons: [],
    setCoupons: (coupones) => set({ coupons: coupones }),
    selectedCoupon: null,
    setSelectedCoupon: (selectedCoupon) => {
        set({ selectedCoupon })

        if (selectedCoupon) {

            if (selectedCoupon.opciones.length > 0) {
                set({ optionSelected: selectedCoupon.opciones[0] })
                return;
            }

            set({
                optionSelected: {
                    segmento: selectedCoupon.segmento,
                    nombre: selectedCoupon.descripcionCupon,
                    valor: selectedCoupon.valor
                }
            })

        }

    },
    optionSelected: null,
    setOptionSelected: (optionSelected) => set({ optionSelected }),
    employeeCupon: null,
    setEmployeeCupon: (employeeCupon) => set({ employeeCupon }),
    employeeCode: null,
    setEmployeeCode: (employeeCode) => set({ employeeCode }),
    couponCode: '',
    setCouponCode: (couponCode) => set({ couponCode }),
    authCode: '',
    setAuthCode: (authCode) => set({ authCode }),
    dpiEmployee: '',
    setDpiEmployee: (dpiEmployee) => set({ dpiEmployee }),
}))