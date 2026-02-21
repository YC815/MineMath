import React from 'react';
import { Enemy as EnemyType } from '@/types';
import { MinecraftSprite } from '../shared/MinecraftSprite';
import { Keypad } from './Keypad';

interface CombatOverlayProps {
  enemy: EnemyType | null;
  input: string;
  isShaking: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
  onDelete: () => void;
}

export const CombatOverlay: React.FC<CombatOverlayProps> = ({
  enemy,
  input,
  isShaking,
  onClose,
  onKeyPress,
  onSubmit,
  onDelete
}) => {
  if (!enemy) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center animate-in fade-in duration-200">
      <div className="bg-stone-800 border-4 border-stone-500 rounded-xl p-6 w-[90%] max-w-md shadow-2xl flex flex-col items-center relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-stone-400 hover:text-white"
        >
          ✕
        </button>
        
        <div className="w-32 h-48 mb-4 animate-bounce-short drop-shadow-2xl">
          {enemy.config.spriteType ? (
            <MinecraftSprite type={enemy.config.spriteType} className="w-full h-full" />
          ) : (
            <div className="text-8xl">{enemy.config.emoji}</div>
          )}
        </div>

        <div className="bg-black/50 w-full text-center py-4 rounded-lg mb-4 border-2 border-stone-600">
          <div className="text-gray-400 text-lg mb-1">SOLVE TO ATTACK</div>
          <div className="text-6xl text-white font-bold tracking-wider font-mono">
            {enemy.problem.display}
          </div>
        </div>
        
        <div className={`h-16 w-full bg-stone-900 rounded mb-6 flex items-center justify-center border-2 ${isShaking ? 'border-red-500 animate-shake bg-red-900/20' : 'border-stone-600'}`}>
          <span className="text-5xl text-yellow-400 font-mono tracking-[0.5em]">
            {input || '_'}
          </span>
        </div>
        
        <Keypad 
          input={input}
          isShaking={isShaking}
          onKeyPress={onKeyPress}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
        
        <div className="mt-4 text-stone-500 text-sm font-pixel text-center">
          可以使用鍵盤輸入數字與 Enter
        </div>
      </div>
    </div>
  );
};
