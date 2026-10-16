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
    <div className="absolute inset-x-0 bottom-0 z-30 pointer-events-none h-[clamp(3.5rem,14vh,5.5rem)]">
      {/* 頂部狀態列 - 絕對定位在畫面上方 */}
      <div className="absolute top-[-85vh] left-0 right-0 pointer-events-none p-2 sm:p-3">
        <div className="flex justify-between items-start max-w-7xl mx-auto">
          <div className="flex gap-0.5 sm:gap-1">
            {Array.from({length: MAX_HEALTH}).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 sm:w-6 sm:h-6 ${i < gameState.health ? 'fill-red-500 text-red-600' : 'fill-black/50 text-black/50'} filter drop-shadow-sm`}
              />
            ))}
          </div>

          <div className="text-center">
            <div className="text-lg sm:text-2xl text-white font-bold drop-shadow-md">
              {gameState.score}
            </div>
            <div className={`text-[10px] sm:text-sm font-bold uppercase ${currentBiome.textColor} bg-black/30 px-2 py-0.5 rounded`}>
              {currentBiome.name}
            </div>
          </div>

          <div className="w-8 sm:w-12"></div>
        </div>
      </div>

      {/* 底部升級欄 */}
      <div className="pointer-events-auto h-full w-full bg-stone-900/95 px-2 sm:px-4 border-t-4 border-stone-600 shadow-2xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform ${inventoryBounce ? 'scale-125' : 'scale-100'}`}>
            <MinecraftSprite type="DIAMOND" className="w-full h-full" />
          </div>
          <div>
            <div className="text-stone-400 text-[10px] sm:text-xs font-bold">寶石</div>
            <div className="text-lg sm:text-xl text-white font-bold leading-none">{gameState.resources.diamond}</div>
          </div>
        </div>

        <div className="w-px h-6 sm:h-8 bg-stone-700 hidden sm:block"></div>

        {nextWeaponObj ? (
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2 max-w-[50%]">
            <div className="flex justify-between text-xs sm:text-sm text-stone-300 font-bold mb-0.5">
              <span className="flex items-center gap-1 truncate">
                <span className={`${nextWeaponObj.color}`}>{nextWeaponObj.name}</span>
              </span>
              <span className="text-white text-[10px] sm:text-xs">{gameState.resources.diamond}/{nextWeaponObj.cost}</span>
            </div>
            <div className="w-full h-2.5 sm:h-3 bg-stone-800 rounded-full overflow-hidden border border-stone-600">
              <div
                className="h-full bg-cyan-500 transition-all duration-300 ease-out"
                style={{ width: `${upgradeProgress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center text-yellow-400 font-bold text-xs sm:text-sm py-1 bg-yellow-900/20 rounded border border-yellow-700/50">
            已達最高等級
          </div>
        )}

        <div className="flex justify-end">
          {nextWeaponObj && (
            canUpgrade ? (
              <button
                onClick={onUpgradeClick}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-1 px-2 sm:px-3 rounded border-b-4 border-yellow-800 active:border-b-0 active:translate-y-1 transition-all animate-pulse text-sm sm:text-base shadow-lg flex items-center justify-center gap-1"
              >
                <Hammer className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">鍛造</span>
              </button>
            ) : (
              <div className="text-stone-500 text-[10px] sm:text-xs font-bold text-center leading-tight opacity-60 px-1">
                收集寶石
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
