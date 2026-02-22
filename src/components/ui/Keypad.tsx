import React from 'react';
import { Delete, Check } from 'lucide-react';

interface KeypadProps {
  input: string;
  isShaking: boolean;
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  input,
  isShaking,
  onKeyPress,
  onSubmit,
  onDelete
}) => {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          onClick={() => onKeyPress(num.toString())}
          className="keypad-btn bg-stone-700 hover:bg-stone-600 active:bg-stone-500 text-white font-bold rounded shadow-lg border-b-4 border-stone-900 active:border-b-0 active:translate-y-1 transition-all
            text-[clamp(1rem,3.5vh,1.5rem)]
            py-[clamp(0.25rem,2vh,0.75rem)]
            min-h-[clamp(2rem,7vh,3rem)]"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onDelete}
        className="keypad-btn bg-red-900 hover:bg-red-800 active:bg-red-700 text-white flex items-center justify-center rounded shadow-lg border-b-4 border-red-950 active:border-b-0 active:translate-y-1 transition-all
          min-h-[clamp(2rem,7vh,3rem)]"
      >
        <Delete className="w-[clamp(1rem,3vh,1.5rem)] h-[clamp(1rem,3vh,1.5rem)]" />
      </button>

      <button
        onClick={() => onKeyPress('0')}
        className="keypad-btn bg-stone-700 hover:bg-stone-600 active:bg-stone-500 text-white font-bold rounded shadow-lg border-b-4 border-stone-900 active:border-b-0 active:translate-y-1 transition-all
          text-[clamp(1rem,3.5vh,1.5rem)]
          py-[clamp(0.25rem,2vh,0.75rem)]
          min-h-[clamp(2rem,7vh,3rem)]"
      >
        0
      </button>

      <button
        onClick={onSubmit}
        className="keypad-btn bg-green-600 hover:bg-green-500 active:bg-green-400 text-white flex items-center justify-center rounded shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all
          min-h-[clamp(2rem,7vh,3rem)]"
      >
        <Check className="w-[clamp(1.25rem,3.5vh,1.75rem)] h-[clamp(1.25rem,3.5vh,1.75rem)]" />
      </button>
    </div>
  );
};
