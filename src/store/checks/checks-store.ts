import { create } from 'zustand'

interface State {
    pendienteDePago: number
    setPendienteDePago: (pendienteDePago: number) => void
    cantidades: Cantidad[]
    setCantidades: (cantidades: Cantidad[]) => void
    setSelectCantidad: (index: number) => void
    getCantidadAPagar: () => Cantidad,
    setCantidadPagada: (index: number) => void,
    isLoadingPayment: boolean,
    setIsLoadingPayment: (isLoadingPayment: boolean) => void
    selectedPaymentMethod: number,
    setSelectedPaymentMethod: (selectedPaymentMethod: number) => void
    isActiveRoutes: boolean,
    setIsActiveRoutes: (isActiveRoutes: boolean) => void
}

interface Cantidad {
    amount: number,
    index: number,
    paid: boolean,
    select: boolean
}

export const useChecksStore = create<State>()((set) => ({
    pendienteDePago: 0,
    setPendienteDePago: (pendienteDePago) => set({ pendienteDePago }),
    cantidades: [],
    setCantidades: (cantidades) => set({ cantidades }),
    setSelectCantidad: (index) => set(state => {
        const cantidades = state.cantidades.map((c, i) => i === index ? { ...c, select: true } : { ...c, select: false })
        return { cantidades }
    }),
    getCantidadAPagar: () => {

        const { cantidades } = useChecksStore.getState() as State

        return cantidades.find((c: Cantidad) => c.select) as Cantidad
    },
    setCantidadPagada: (index) => set(state => {
        const cantidadadPagada = state.cantidades.map((c, i) => i === index ? { ...c, paid: true, select: false } : c)

        //seleccionar el primer index que no haya sido pagado
        const cantidades = cantidadadPagada.map((c, i) => !c.paid && i === 0 ? { ...c, select: true } : c)

        return { cantidades }
    }),
    isLoadingPayment: false,
    setIsLoadingPayment: (isLoadingPayment) => set({ isLoadingPayment }),
    selectedPaymentMethod: 0,
    setSelectedPaymentMethod: (selectedPaymentMethod) => set({ selectedPaymentMethod }),
    isActiveRoutes: false,
    setIsActiveRoutes: (isActiveRoutes) => set({ isActiveRoutes })
}))