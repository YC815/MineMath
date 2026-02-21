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
    <div className="grid grid-cols-3 gap-3 w-full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <button
          key={num}
          onClick={() => onKeyPress(num.toString())}
          className="keypad-btn bg-stone-700 hover:bg-stone-600 active:bg-stone-500 text-white text-4xl font-bold py-4 rounded shadow-lg border-b-4 border-stone-900 active:border-b-0 active:translate-y-1 transition-all"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onDelete}
        className="keypad-btn bg-red-900 hover:bg-red-800 active:bg-red-700 text-white flex items-center justify-center rounded shadow-lg border-b-4 border-red-950 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Delete className="w-8 h-8" />
      </button>
      
      <button
        onClick={() => onKeyPress('0')}
        className="keypad-btn bg-stone-700 hover:bg-stone-600 active:bg-stone-500 text-white text-4xl font-bold py-4 rounded shadow-lg border-b-4 border-stone-900 active:border-b-0 active:translate-y-1 transition-all"
      >
        0
      </button>
      
      <button
        onClick={onSubmit}
        className="keypad-btn bg-green-600 hover:bg-green-500 active:bg-green-400 text-white flex items-center justify-center rounded shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Check className="w-10 h-10" />
      </button>
    </div>
  );
};
