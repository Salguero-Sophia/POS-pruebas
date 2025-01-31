import { BanknotesIcon, BuildingLibraryIcon, CreditCardIcon, GiftIcon } from "@heroicons/react/24/outline";
import { PaymentMethod } from "../types";

export const payments: PaymentMethod[] = [
    {
        code: 1,
        icon: <BanknotesIcon className="h-5 w-5 text-primary" />
    },
    {
        code: 2,
        icon: <CreditCardIcon className="h-5 w-5 text-primary" />
    },
    {
        code: 4,
        icon: <BuildingLibraryIcon className="h-5 w-5 text-primary" />
    },
    {
        code: 5,
        icon: <BuildingLibraryIcon className="h-5 w-5 text-primary" />
    },
    {
        code: 6,
        icon: <CreditCardIcon className="h-5 w-5 text-primary" />
    },
    {
        code: 69,
        icon: <GiftIcon className="h-5 w-5 text-primary" />
    }
]