export function removeSpecialCharsAndKeepNumbers(str: string) {
    // Usamos una expresión regular para eliminar todo lo que no sean números
    return str.replace(/\D/g, '');
}