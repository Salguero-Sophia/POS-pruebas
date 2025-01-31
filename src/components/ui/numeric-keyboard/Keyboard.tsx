import { useKeyboardStore } from '../../../store';
import { NumericKeyboard } from './NumericKeyboard';
import { StringKeyboard } from './StringKeyboard';

interface Props {
    isNumeric?: boolean;
}

export const Keyboard = ({ isNumeric = false }: Props) => {

    const keyboardValue = useKeyboardStore(state => state.keyboardValue);
    const setkeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
    const onConfirm = useKeyboardStore(state => state.onConfirm);

    const handleInput = (value: string) => {

        setkeyboardValue(keyboardValue + value);

    }

    const handleDelete = () => {

        setkeyboardValue(keyboardValue.slice(0, -1));

    }

    const handleConfirm = () => {

        onConfirm();

    }

    return (
        <div className="flex flex-col h-auto p= justify-center items-center">

            {/* <div className="w-64 h-auto bg-white rounded-2xl shadow-xl border-4 border-gray-100"> */}



            <div className="w-auto m-3 h-14 text-right space-y-2 py-2 bg-grey-50">

                <div className="text-black font-bold text-3xl">{keyboardValue}</div>

            </div>

            <div className="w-auto m-1 h-auto mb-2 ">

                {/* <NumericKeyboard handleInput={handleInput} handleDelete={handleDelete} /> */}

                {
                    isNumeric
                        ? <NumericKeyboard handleInput={handleInput} handleDelete={handleDelete} handleConfirm={handleConfirm} />
                        : <StringKeyboard handleInput={handleInput} handleDelete={handleDelete} handleConfirm={handleConfirm} />
                }



                {/* <div className="m-2 flex justify-between">

                    <button onClick={() => handleInput("0")} className="bg-gray-200 shadow-md rounded-2xl w-full h-12 text-black font-medium flex justify-center items-center">0</button>

                    <div className="flex w-full ml-3 justify-between">

                        <button onClick={() => handleInput(".")} className="bg-gray-200 shadow-md rounded-2xl w-12 h-12 text-black font-medium flex justify-center items-center">.</button>

                        <button onClick={() => handleConfirm()} className="bg-green-500 shadow-md rounded-2xl w-12 h-12 text-white font-medium text-xl flex justify-center items-center"><CheckCircleIcon className="w-6 h-6" /> </button>

                    </div>

                </div> */}

                <div className="flex justify-center mt-5">

                    <div className="w-20 h-1 bg-gray-100 rounded-l-xl rounded-r-xl"></div>

                </div>

            </div>

            {/* </div> */}

        </div>

    )

}
