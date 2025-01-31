import fondoTarjeta from '../../../assets/fondo_tarjeta.png'
import logo from '../../../assets/logo.svg'
import { formatCardNumber, formatDatetimaCard } from '../../../utils';

interface Props {
    name?: string;
    cardNumber: string;
    expirationDate: Date | null;
    cvv?: string;
}
export const CreditCard = ({
    name = 'Tarjeta de regalo',
    cardNumber,
    expirationDate,
}: Props) => {

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                <img className="relative object-cover w-full h-full rounded-xl" src={fondoTarjeta} />

                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light">
                                Nombre
                            </p>
                            <p className="font-medium tracking-widest">
                                {name}
                            </p>
                        </div>
                        <img className="w-14 h-14 bg-transparent" src={logo} />
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Número de Tarjeta
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {formatCardNumber(cardNumber)}
                        </p>
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Válido hasta
                                </p>
                                {
                                    expirationDate && <p className="font-bold tracking-more-wider text-sm">
                                        {formatDatetimaCard(expirationDate)}
                                    </p>
                                }
                            </div>

                            <div className="">
                                <p className="font-light text-xs">
                                    CVV
                                </p>
                                <p className="font-bold tracking-more-wider text-sm">
                                    {'***'}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
