export function sumarHoras(fecha: Date) {
    let nuevaFecha = new Date(fecha);
    const horas = import.meta.env.VITE_SESSION_DURATION_HOURS;
    nuevaFecha.setHours(nuevaFecha.getHours() + Number(horas));
    return nuevaFecha;
}