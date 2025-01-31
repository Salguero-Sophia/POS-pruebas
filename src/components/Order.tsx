import { CheckData } from "../interfaces";
import { currencyFormat } from "../utils";

interface Props {
    checkSelected?: CheckData;
}
export const Order = ({ checkSelected }: Props) => {
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div id="checkout-form" className="space-y-6">

                <div className="flex justify-center">
                    <div className="text-white text-4xl font-bold pb-10">
                        {checkSelected?.amountTrans && currencyFormat(+checkSelected?.amountTrans)}
                    </div>
                </div>

                <div className="mt-10 border-dashed border-t-2">
                    <div className="flex items-center justify-between mt-2">
                        <span className="block text-sm leading-6 text-white">Propina</span>
                    </div>
                    <div className=" text-white font-bold">
                        {checkSelected?.additionalAmount && currencyFormat(+checkSelected?.additionalAmount)}
                    </div>
                </div>

                
            </div>

        </div>
    )
}
