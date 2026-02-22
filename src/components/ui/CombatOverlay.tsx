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
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center animate-in fade-in duration-200 p-2 sm:p-4">
      <div className="bg-stone-800 border-2 sm:border-4 border-stone-500 rounded-xl p-2 sm:p-4 w-full max-w-[min(90vw,28rem)] shadow-2xl flex flex-col items-center relative max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 text-stone-400 hover:text-white z-10 text-lg sm:text-xl"
        >
          ✕
        </button>

        {/* 敵人圖示區 - 使用 vh 和 vw 混合單位 */}
        <div className="w-[clamp(3rem,12vh,6rem)] h-[clamp(4rem,16vh,8rem)] mb-1 sm:mb-2 animate-bounce-short drop-shadow-2xl flex-shrink-0">
          {enemy.config.spriteType ? (
            <MinecraftSprite type={enemy.config.spriteType} className="w-full h-full" />
          ) : (
            <div className="text-[clamp(2rem,8vh,4rem)] flex items-center justify-center h-full">
              {enemy.config.emoji}
            </div>
          )}
        </div>

        {/* 題目顯示區 */}
        <div className="bg-black/50 w-full text-center py-1.5 sm:py-2 rounded-lg mb-1.5 sm:mb-2 border-2 border-stone-600">
          <div className="text-gray-400 text-[clamp(0.65rem,2vh,0.875rem)] mb-0.5">SOLVE TO ATTACK</div>
          <div className="text-[clamp(1.25rem,5vh,2.5rem)] text-white font-bold tracking-wider font-mono leading-tight">
            {enemy.problem.display}
          </div>
        </div>

        {/* 輸入顯示區 */}
        <div className={`h-[clamp(2rem,6vh,3rem)] w-full bg-stone-900 rounded mb-1.5 sm:mb-2 flex items-center justify-center border-2 ${isShaking ? 'border-red-500 animate-shake bg-red-900/20' : 'border-stone-600'}`}>
          <span className="text-[clamp(1.25rem,4vh,2rem)] text-yellow-400 font-mono tracking-[0.5em]">
            {input || '_'}
          </span>
        </div>

        {/* 數字鍵盤 */}
        <Keypad
          input={input}
          isShaking={isShaking}
          onKeyPress={onKeyPress}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />

        {/* 提示文字 */}
        <div className="mt-1 sm:mt-2 text-stone-500 text-[clamp(0.6rem,1.8vh,0.75rem)] font-pixel text-center">
          可以使用鍵盤輸入數字與 Enter
        </div>
      </div>
    </div>
  );
};
