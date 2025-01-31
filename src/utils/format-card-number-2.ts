import { removeSpecialCharsAndKeepNumbers } from ".";

export const formatCardNumber2 = (value:string) => {
    if (!value) return '';

    const sanitizedValue = removeSpecialCharsAndKeepNumbers(value);

    if(!sanitizedValue) return '';

    if (sanitizedValue.length <= 4) {
        return sanitizedValue; // Muestra el valor si es menor o igual a 4 dígitos.
    }

    const firstFour = sanitizedValue.slice(0, 4) || '';
    const lastFour = sanitizedValue.slice(-4) || '';
    const middleMask = '*'.repeat(Math.max(sanitizedValue.length - 8, 0)) || '';

    const valueToSend = `${firstFour}${middleMask}${lastFour}`;

    return valueToSend?.match(/.{1,4}/g)?.join(' '); // Añade espacio entre bloques.
};