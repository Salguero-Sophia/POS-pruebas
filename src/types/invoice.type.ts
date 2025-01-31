import { Check } from "./check.type";

export interface Invoice {
    id: string;
    checkId: string;
    numeroDeAutorizacion: string;
    serie: string;
    numero: string;
    fechaDeEmision: Date;
    nitReceptor: string;
    nombreReceptor: string;
    direccionReceptor: string;
    tipoVenta: string;
    destinoVenta: string;
    fecha: Date;
    moneda: string;
    tasa: string;
    referencia: string;
    numeroAcceso: string;
    serieAdmin: string;
    numeroAdmin: string;
    bruto: number;
    descuento: number;
    exento: number;
    otros: number;
    neto: number;
    isr: number;
    iva: number;
    total: number;
    createdAt: Date;
    check: Check;
}
