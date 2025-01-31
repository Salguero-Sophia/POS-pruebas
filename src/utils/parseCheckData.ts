import { CheckData, Transaction } from '../interfaces/check-data.interface';
import { parseTimeString, parseDateString } from './';


export const parseCheckData = (data: string, nameFile: string): CheckData => {

    const lines = data.split('\n');

    const checkObject: CheckData = {
        nameFile: "",
        amountTrans: "",
        additionalAmount: ""
    };

    lines.forEach(line => {
        const [key, value] = line.split(/\s{2,}/);
        if (key) {
            checkObject[key.trim() as keyof CheckData] = value ? value.trim() : '';
        }
    });

    checkObject.nameFile = nameFile.split('.')[0];

    checkObject.amountTrans = Number(checkObject.TOTAL1ITEM).toFixed(2);
    
    checkObject.additionalAmount = (Number(checkObject.TOTAL1ITEM) * 0.10).toFixed(2);

    // Verificar si checkObject.ITEM es una cadena y dividirla en un arreglo de items
    const items = lines.filter(line => line.startsWith('ITEM')).map((itemLine) => {
        // const itemParts = itemLine.split(/\s{2,}/)[1].split('|').map(part => part.trim());
        const itemParts = itemLine.replace(/\s{2,}/g, ' ').replace('ITEM ', '').trim().split('|').map(part => part.trim());

        const [name, price, totalPrice, quantity, discount] = itemParts;
        return {
            name,
            price: Number(price),
            totalPrice: Number(totalPrice),
            quantity: Number(quantity),
            discount: Number(discount),
        };
    });

    // Transforming data into a transaction object
    const transaction: Transaction = {
        check: nameFile,
        closed: checkObject.CLOSED === 'TRUE',
        employee: {
            employeeId: Number(checkObject.EMPLOYEE?.trim().split('|')[0] || 0),
            lastName: checkObject.EMPLOYEE?.trim().split('|')[1] || '',
            firstName: checkObject.EMPLOYEE?.trim().split('|')[2] || '',
            role: checkObject.EMPLOYEE?.trim().split('|')[3] || '',
        },
        dob: parseDateString(checkObject.DOB || ''),
        date: parseDateString(checkObject.DATE || ''),
        time: parseTimeString(checkObject.TIME || ''),
        counter: Number(checkObject.COUNTER || 0),
        orderName: checkObject.ORDERNAME || '',
        guests: Number(checkObject.GUESTS || 0),
        revenueCenter: checkObject.REVENUECENTER || '',
        menuName: checkObject?.MENUNAME || '',
        dayPart: checkObject?.DAYPART || '',
        items: items,
        subTotal: Number(checkObject.SUBTOTAL),
        total1Item: Number(checkObject.TOTAL1ITEM),
        payment: {
            method: checkObject.PAYMENT?.trim().split('|')[0] || '',
            amount: Number(checkObject.PAYMENT?.trim().split('|')[1]) || 0,
            tip: Number(checkObject.PAYMENT?.trim().split('|')[2]) || 0,
            details: checkObject.PAYMENT?.trim().split('|')[3] || '',
            expiration: checkObject.PAYMENT?.trim().split('|')[4] || '',
        },
        balanceDue: Number(checkObject.BALANCEDUE || 0),
        inclusiveTax: {
            type: Number(checkObject.INCLUSIVETAX?.trim().split('|')[0] || 0),
            amount: Number(checkObject.INCLUSIVETAX?.trim().split('|')[1] || 0),
        },
    };

    checkObject.transaction = transaction;

    return checkObject;
};

