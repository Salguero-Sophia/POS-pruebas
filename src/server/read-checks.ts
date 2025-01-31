import fs from 'node:fs';
import { getConfig, getEmployeeFile } from '../utils';
import { CheckItem, OrderData } from '../types';

export const readChecks = async (): Promise<OrderData[]> => {

    try {

        const checksFolder = import.meta.env['VITE_PATH_CHECKS']!;
        const extensionFile = '.CHK';

        const files = fs.readdirSync(checksFolder);

        const { storeId } = await getConfig();
        const { id: employeeId } = await getEmployeeFile();

        const checks = files
            .filter(file => file.endsWith(extensionFile))
            .map(file => {

                const content = fs.readFileSync(`${checksFolder}/${file}`, 'utf-8');

                const normalizedContent = content.replace("�", '').replace(/�/g, '').replace('�', '');

                const lines = normalizedContent.split('\n');

                const checkObject: any = {};

                lines.forEach(line => {
                    const [key, value] = line.split(/\s{2,}/);
                    if (key) {
                        checkObject[key.trim()] = value ? value.trim() : '';
                    }
                });

                const revenueCenter = lines.find(line => line.startsWith('REVENUECENTER'))?.split(' ')[1].replace(/\s{2,}/g, ' ').trim();

                const items = getItems2(lines, 'ITEM');
                const promos = getItems2(lines, 'PROMO');

                const itemsFiltes = items.filter(item => item.name.trim().length > 2);

                const data: Partial<OrderData> = {
                    storeId: storeId,
                    employeeId,
                    checkNumber: Number(file.split('.')[0]),
                    total: Number(checkObject.TOTAL1ITEM?.replace(',', '')),
                    subTotal: Number(checkObject.SUBTOTAL?.replace(',', '')) || 0,
                    balanceDue: Number(checkObject.BALANCEDUE?.replace(',', '')) || 0,
                    orderName: checkObject.ORDERNAME,
                    employeeName: `${checkObject.EMPLOYEE?.split('|')[2]} ${checkObject.EMPLOYEE?.split('|')[1]}`,
                    time: checkObject.TIME,
                    dayPart: checkObject.DAYPART,
                    revenueCenter: revenueCenter,
                    checkItems: [...itemsFiltes, ...promos],
                };

                return data as OrderData;
            });

        return checks;

    } catch (error) {
        
        console.log(error);

        return []

    }

}

const getItems2 = (lines: string[], regex: string): CheckItem[] => {
    return lines.filter(line => line.startsWith(regex)).map((itemLine) => {
        const itemParts = itemLine.replace(/\s{2,}/g, ' ').replace(`${regex} `, '').trim().split('|').map(part => part.trim());

        const [name, totalPriceStrNoParse, _, quantityStr] = itemParts;

        const totalPriceStr = totalPriceStrNoParse.replace(',', '');

        // Detectar si el nombre del ítem o el precio sugiere un descuento (por ejemplo, si contiene la palabra "Descuento")
        const isNegative = name.toLowerCase().includes('descuento') || Number(totalPriceStr) < 0;

        // Convertir los valores a números
        const totalPrice = Number(totalPriceStr || 0 ) || 0;
        const quantity = Number(quantityStr || 1) || 1;

        // Si es negativo, multiplicar por -1
        const finalPrice = isNegative ? -Math.abs(totalPrice) : totalPrice;

        const price = (finalPrice / quantity) || 0;
        
        return {
            name,
            price: Number(price.toFixed(2)),
            quantity,
            total: finalPrice,
        };
    });
}
