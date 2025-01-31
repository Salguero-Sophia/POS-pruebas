import { BackspaceIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Box, Modal } from "@mui/material";
import { useRef } from 'react';
import { useKeyboardStore } from '../../../store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const NumberKeyboard = () => {

  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = useKeyboardStore((state) => state.openNumeric);
  const setOpenModal = useKeyboardStore((state) => state.setOpenNumeric);

  const keyboardValue = useKeyboardStore(state => state.keyboardValue);
  const setkeyboardValue = useKeyboardStore(state => state.setkeyboardValue);
  const onConfirm = useKeyboardStore(state => state.onConfirm);


  const insertValue = (value: string) => {
    const input = inputRef.current;
    if (!input) return;

    const cursorPosition = input.selectionStart ?? 0;

    // Insertar el valor en la posición del cursor
    const newValue =
      keyboardValue.slice(0, cursorPosition) +
      value +
      keyboardValue.slice(cursorPosition);

    setkeyboardValue(newValue);

    // Mover el cursor después de insertar
    setTimeout(() => {
      input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      input.focus();
    }, 0);
  };

  const deleteValue = () => {
    const input = inputRef.current;
    if (!input || keyboardValue.length === 0) return;

    const cursorPosition = input.selectionStart ?? 0;
    const cursorEnd = input.selectionEnd ?? 0;

    // Si hay una selección, eliminamos el texto seleccionado
    if (cursorPosition !== cursorEnd) {
      const newValue =
        keyboardValue.slice(0, cursorPosition) + keyboardValue.slice(cursorEnd);
      setkeyboardValue(newValue);
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
        input.focus();
      }, 0);
      return;
    }

    // Si no hay selección, eliminamos el carácter anterior al cursor
    if (cursorPosition > 0) {
      const newValue =
        keyboardValue.slice(0, cursorPosition - 1) +
        keyboardValue.slice(cursorPosition);
      setkeyboardValue(newValue);

      // Mover el cursor después de eliminar
      setTimeout(() => {
        input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        input.focus();
      }, 0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setkeyboardValue(e.target.value);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

        <div className="flex flex-col h-full">

          <div className="w-auto m-3 text-right space-y-2 py-2 bg-grey-50">

            <input
              ref={inputRef}
              type="text"
              className="border p-2 w-full mb-4 h-full text-4xl"
              value={keyboardValue}
              onChange={handleChange}
            />

          </div>

          <div className="flex flex-col w-full gap-3">

            <div className="flex gap-2 w-full">

              <button onClick={() => insertValue("7")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black text-center p-3">7</button>

              <button onClick={() => insertValue("8")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black text-center p-3">8</button>

              <button onClick={() => insertValue("9")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black text-center p-3">9</button>

              <button onClick={() => deleteValue()} className="bg-red-500 shadow-md rounded-2xl w-full h-full  text-white text-xl flex justify-center items-center p-3">
                <BackspaceIcon className="w-10 h-10" />
              </button>

            </div>

            <div className="flex gap-2 w-full">

              <button onClick={() => insertValue("4")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">4</button>

              <button onClick={() => insertValue("5")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">5</button>

              <button onClick={() => insertValue("6")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">6</button>

              <button onClick={() => insertValue("-")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">-</button>


            </div>

            <div className="flex gap-2 w-full">

              <button onClick={() => insertValue("1")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">1</button>

              <button onClick={() => insertValue("2")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">2</button>

              <button onClick={() => insertValue("3")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">3</button>

              <div className="bg-yellow-500 shadow-md rounded-2xl w-full h-full text-4xl text-yellow-500 flex justify-center items-center p-3">.</div>

            </div>

            <div className="flex gap-2 w-full">

              <button onClick={() => insertValue("0")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">0</button>

              <div className="flex w-full justify-between gap-2">

                <button onClick={() => insertValue(".")} className="bg-gray-200 shadow-md rounded-2xl w-full h-full text-4xl text-black flex justify-center items-center p-3">.</button>

                <button onClick={() => onConfirm()} className="bg-green-500 shadow-md rounded-2xl w-full h-full text-4xl text-white flex justify-center items-center p-3">
                  <CheckCircleIcon className="w-10 h-10" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </Box>

    </Modal>
  )
}
