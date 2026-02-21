import React from 'react';
import { Enemy as EnemyType } from '@/types';
import { MinecraftSprite } from '../shared/MinecraftSprite';

interface EnemyProps {
  enemy: EnemyType;
  onClick: (enemy: EnemyType) => void;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy, onClick }) => {
  return (
    <button 
      onClick={() => onClick(enemy)}
      className="absolute transform -translate-y-1/2 transition-transform hover:scale-110 active:scale-95 cursor-pointer outline-none touch-manipulation"
      style={{ 
        left: `${enemy.x}%`, 
        bottom: `${27.5 + (3 - enemy.y) * 15}vh`, 
        zIndex: 20
      }}
    >
      <div className="flex flex-col items-center group">
        {enemy.config.spriteType ? (
          <div className="w-16 h-24 filter drop-shadow-md">
            <MinecraftSprite type={enemy.config.spriteType} className="w-full h-full" />
          </div>
        ) : (
          <div className="text-5xl filter drop-shadow-md transform scale-x-[-1]">
            {enemy.config.emoji}
          </div>
        )}

        <div className="bg-white border-4 border-stone-800 px-3 py-1 rounded-xl mt-1 whitespace-nowrap text-3xl font-bold text-black shadow-lg animate-bounce group-hover:bg-yellow-100">
          <span className={enemy.problem.display.length > 8 ? "text-2xl" : "text-3xl"}>
            {enemy.problem.display.replace('=', '').trim()}
          </span>
        </div>

        <div className="w-10 h-1.5 bg-red-900 mt-1 rounded-full overflow-hidden border border-black/30">
          <div className="w-full h-full bg-red-500"></div>
        </div>
      </div>
    </button>
  );
};
