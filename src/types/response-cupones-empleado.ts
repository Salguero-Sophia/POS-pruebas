export interface ResponseCuponesEmpleado {
    empleado: Empleado;
    cupones: Cupone[];
}


export interface Cupone {
    id: number;
    empresa: number;
    segmento: string;
    codigo: string;
    cupon: string;
    fechaCreacion: Date;
    anio: string;
    mes: number;
    canjeadoTienda: number;
    valor: number;
    moneda: string;
    pais: string;
    usuarioCrea: string;
    canjeadoWordPress: number;
    fechaInicio: Date;
    fechaFin: Date;
    fechaCanje: Date;
    tiendaCanje: number;
    descripcionCupon: string;
    noOrden: string;
    segmentoAloha: string;
    codProductoCanj: string;
    idCompraLoyalty: number;
    nombreBeneficiario: string;
    telefonoBeneficiario: string;
    cuponEditable: number;
    opciones: Opcione[];
}

export interface Opcione {
    segmento: string;
    nombre: string;
    valor: number;
}

export interface Empleado {
    codigoEmpleado: string;
    primerApellido: string;
    segundoApellido: string;
    apellidoCasado: string;
    primerNombre: string;
    segundoNombre: string;
    otroNombre: string;
    paisNacionalidad: string;
    paisNacimiento: string;
    sexo: string;
    edad: number;
    profesion: string;
    estadoCivil: string;
    fechaNacimiento: Date;
    correoElectronico: string;
    estadoEmpleado: string;
    fechaIngreso: Date;
    cumpleAnio: boolean;
    identificacion: string;
}
