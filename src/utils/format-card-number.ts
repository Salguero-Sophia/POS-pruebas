export const formatCardNumber = (cardNumber: string) => {
    const cardNumberArray = cardNumber.split('');
    const formattedCardNumber = cardNumberArray.map((char, index) => {
        if (index < 4 || index > cardNumber.length - 5) {
            return char;
        } else {
            return '*';
        }
    });
    return formattedCardNumber.join('');
}