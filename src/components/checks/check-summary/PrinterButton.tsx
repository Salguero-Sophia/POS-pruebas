import { PrinterIcon } from '@heroicons/react/24/outline';
import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast';

interface PrinterButtonProps {
    onPrint: () => Promise<void>;
    label: string;
}

export const PrinterButton = ({ onPrint, label }: PrinterButtonProps) => {

    const [isLoadingPrinter, setIsLoadingPrinter] = React.useState(false);

    const handlePrint = async () => {

        setIsLoadingPrinter(true);

        await onPrint();

        toast.success('Impresión realizada correctamente');

        setIsLoadingPrinter(false);
        
    }

    return (
        <Button
            variant="outlined"
            className="w-52"
            startIcon={(!isLoadingPrinter) && <PrinterIcon className="h-5 w-5 text-primary" />}
            onClick={handlePrint}
        >
            {
                isLoadingPrinter ? <CircularProgress /> : <span>{label}</span>
            }
        </Button>
    )
}
