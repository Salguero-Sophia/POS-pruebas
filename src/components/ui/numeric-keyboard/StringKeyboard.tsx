import { BackspaceIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Props {
    handleInput: (value: string) => void;
    handleDelete: () => void;
    handleConfirm: () => void;
}

export const StringKeyboard = ({ handleInput, handleDelete, handleConfirm }: Props) => {
    return (
        <>
            <div className="m-2 flex justify-between gap-4 mb-4">

                <button onClick={() => handleInput("1")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">1</button>
                <button onClick={() => handleInput("2")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">2</button>
                <button onClick={() => handleInput("3")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">3</button>
                <button onClick={() => handleInput("4")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">4</button>
                <button onClick={() => handleInput("5")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">5</button>
                <button onClick={() => handleInput("6")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">6</button>
                <button onClick={() => handleInput("7")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">7</button>
                <button onClick={() => handleInput("8")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">8</button>
                <button onClick={() => handleInput("9")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">9</button>
                <button onClick={() => handleInput("0")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">0</button>

                <div className="bg-yellow-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center"></div>

            </div>
            <div className="m-2 flex justify-between gap-4 mb-4">

                <button onClick={() => handleInput("Q")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">Q</button>
                <button onClick={() => handleInput("W")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">W</button>
                <button onClick={() => handleInput("E")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">E</button>
                <button onClick={() => handleInput("R")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">R</button>
                <button onClick={() => handleInput("T")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">T</button>
                <button onClick={() => handleInput("Y")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">Y</button>
                <button onClick={() => handleInput("U")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">U</button>
                <button onClick={() => handleInput("I")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">I</button>
                <button onClick={() => handleInput("O")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">O</button>
                <button onClick={() => handleInput("P")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">P</button>

                <button onClick={() => handleDelete()} className="bg-red-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center">
                    <BackspaceIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="m-2 flex justify-between gap-4 mb-4">

                <button onClick={() => handleInput("A")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">A</button>
                <button onClick={() => handleInput("S")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">S</button>
                <button onClick={() => handleInput("D")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">D</button>
                <button onClick={() => handleInput("F")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">F</button>
                <button onClick={() => handleInput("G")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">G</button>
                <button onClick={() => handleInput("H")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">H</button>
                <button onClick={() => handleInput("J")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">J</button>
                <button onClick={() => handleInput("K")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">K</button>
                <button onClick={() => handleInput("L")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">L</button>
                <button onClick={() => handleInput("Ñ")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">Ñ</button>

                <div className="bg-yellow-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center"></div>

            </div>

            <div className="m-2 flex justify-between gap-4 mb-4">

                <button onClick={() => handleInput("Z")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">Z</button>
                <button onClick={() => handleInput("X")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">X</button>
                <button onClick={() => handleInput("C")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">C</button>
                <button onClick={() => handleInput("V")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">V</button>
                <button onClick={() => handleInput("B")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">B</button>
                <button onClick={() => handleInput("N")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">N</button>
                <button onClick={() => handleInput("M")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">M</button>
                <button onClick={() => handleInput(";")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">;</button>
                <button onClick={() => handleInput(":")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">:</button>

                <div className="bg-yellow-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center"></div>
                <div className="bg-yellow-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center"></div>

            </div>

            <div className="m-2 flex justify-between gap-4 mb-4">

                {/* <div className="flex w-full ml-3 justify-between"> */}

                <button onClick={() => handleInput(".")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">-</button>
                <button onClick={() => handleInput(".")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">/</button>


                {/* </div> */}

                <button onClick={() => handleInput(" ")} className="bg-gray-200 shadow-md rounded-2xl w-full h-16 text-black font-medium flex justify-center items-center"></button>

                {/* <div className="flex w-full ml-3 justify-between"> */}

                <button onClick={() => handleInput(".")} className="bg-gray-200 shadow-md rounded-2xl w-16 h-16 text-black font-medium flex justify-center items-center">.</button>

                <button onClick={() => handleConfirm()} className="bg-green-500 shadow-md rounded-2xl w-16 h-16 text-white font-medium text-xl flex justify-center items-center"><CheckCircleIcon className="w-6 h-6" /> </button>

                {/* </div> */}

            </div>

        </>
    )
}
