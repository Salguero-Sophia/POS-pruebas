import { BackspaceIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
    handleInput: (value: string) => void;
    handleDelete: () => void;
    handleConfirm: () => void;
}

export const NumericKeyboard = ({ handleInput, handleDelete, handleConfirm }: Props) => {


    return (
        <>
            <div className="m-2 flex justify-between gap-2">

                <button onClick={() => handleInput("7")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">7</button>

                <button onClick={() => handleInput("8")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">8</button>

                <button onClick={() => handleInput("9")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">9</button>

                <button onClick={() => handleDelete()} className="bg-red-500 shadow-md rounded-2xl w-12 h-12 text-white font-medium text-xl flex justify-center items-center">
                    <BackspaceIcon className="w-6 h-6" />
                </button>

            </div>

            <div className="m-2 flex justify-between gap-2">

                <button onClick={() => handleInput("4")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">4</button>

                <button onClick={() => handleInput("5")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">5</button>

                <button onClick={() => handleInput("6")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">6</button>

                <div className="bg-yellow-500 shadow-md rounded-2xl w-12 h-12 text-white font-medium text-xl flex justify-center items-center"></div>

            </div>

            <div className="m-2 flex justify-between gap-2">

                <button onClick={() => handleInput("1")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">1</button>

                <button onClick={() => handleInput("2")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">2</button>

                <button onClick={() => handleInput("3")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">3</button>

                <div className="bg-yellow-500 shadow-md rounded-2xl w-12 h-12 text-white font-medium text-xl flex justify-center items-center"></div>

            </div>

            <div className="m-2 flex justify-between gap-2">

                <button onClick={() => handleInput("0")} className="bg-gray-200 shadow-md rounded-2xl w-full h-12 text-black font-medium flex justify-center items-center">0</button>

                <div className="flex w-full ml-3 justify-between gap-2">

                    <button onClick={() => handleInput(".")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">.</button>

                    <button onClick={() => handleConfirm()} className="bg-green-500 shadow-md rounded-2xl w-12 h-12 text-white font-medium text-xl flex justify-center items-center"><CheckCircleIcon className="w-6 h-6" /> </button>

                </div>

            </div>
        </>

    )

}
