import React from 'react';
import { Heart, Hammer } from 'lucide-react';
import { MinecraftSprite } from '../shared/MinecraftSprite';
import { GameState, Weapon } from '@/types';
import { MAX_HEALTH } from '@/constants';
import { BIOMES } from '@/constants';

interface HUDProps {
  gameState: GameState;
  nextWeaponObj: Weapon | null;
  upgradeProgress: number;
  canUpgrade: boolean;
  inventoryBounce: boolean;
  onUpgradeClick: () => void;
}

export const HUD: React.FC<HUDProps> = ({ 
  gameState, 
  nextWeaponObj, 
  upgradeProgress, 
  canUpgrade, 
  inventoryBounce,
  onUpgradeClick 
}) => {
  const currentBiome = BIOMES[gameState.biome];

  return (
    <div className="absolute inset-0 z-30 pointer-events-none p-2 sm:p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex gap-0.5 sm:gap-1">
          {Array.from({length: MAX_HEALTH}).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 sm:w-8 sm:h-8 ${i < gameState.health ? 'fill-red-500 text-red-600' : 'fill-black/50 text-black/50'} filter drop-shadow-sm`}
            />
          ))}
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-4xl text-white font-bold drop-shadow-md">
            SCORE: {gameState.score}
          </div>
          <div className={`text-xs sm:text-xl font-bold uppercase ${currentBiome.textColor} bg-black/20 px-2 rounded flex items-center gap-2 justify-center`}>
            {currentBiome.name}
            <span className="text-[10px] sm:text-xs opacity-70">
              [{gameState.difficultyMode === 'BASIC' ? '基礎' : '進階'}]
            </span>
          </div>
        </div>
        <div className="w-12 sm:w-24"></div>
      </div>

      <div className="pointer-events-auto mx-auto w-full max-w-5xl bg-stone-900/95 p-2 sm:p-4 rounded-t-xl border-t-4 border-l-4 border-r-4 border-stone-600 shadow-2xl flex items-center justify-between gap-2 sm:gap-6 mb-0 translate-y-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-[100px] sm:min-w-[180px]">
          <div className={`w-10 h-10 sm:w-16 sm:h-16 transition-transform ${inventoryBounce ? 'scale-125' : 'scale-100'}`}>
            <MinecraftSprite type="DIAMOND" className="w-full h-full" />
          </div>
          <div>
            <div className="text-stone-400 text-xs sm:text-xl font-bold">寶石</div>
            <div className="text-2xl sm:text-5xl text-white font-bold leading-none">{gameState.resources.diamond}</div>
          </div>
        </div>

        <div className="w-1 h-8 sm:h-12 bg-stone-700 rounded hidden md:block"></div>

        {nextWeaponObj ? (
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-4">
            <div className="flex justify-between text-sm sm:text-2xl text-stone-300 font-bold mb-1">
              <span className="flex items-center gap-1 sm:gap-2">
                下一級: <span className={`${nextWeaponObj.color} text-lg sm:text-3xl`}>{nextWeaponObj.name}</span>
              </span>
              <span className="text-white hidden sm:inline">{gameState.resources.diamond} / {nextWeaponObj.cost}</span>
            </div>
            <div className="w-full h-4 sm:h-8 bg-stone-800 rounded-full overflow-hidden border-2 border-stone-600 relative">
              <div
                className="h-full bg-cyan-500 transition-all duration-300 ease-out"
                style={{ width: `${upgradeProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center text-yellow-400 font-bold text-lg sm:text-3xl py-1 sm:py-2 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
            已達最高等級
          </div>
        )}

        <div className="min-w-[80px] sm:min-w-[160px] flex justify-end">
          {nextWeaponObj && (
            canUpgrade ? (
              <button
                onClick={onUpgradeClick}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 transition-all animate-pulse text-base sm:text-2xl shadow-lg flex items-center justify-center gap-1 sm:gap-2"
              >
                <Hammer className="w-5 h-5 sm:w-8 sm:h-8" />
                <span className="hidden sm:inline">鍛造</span>
              </button>
            ) : (
              <div className="text-stone-500 text-xs sm:text-xl font-bold text-center leading-tight opacity-60">
                收集寶石<br className="hidden sm:block"/>以升級
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
