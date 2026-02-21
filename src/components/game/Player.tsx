import React from 'react';
import { MinecraftSprite } from '../shared/MinecraftSprite';
import { WEAPONS } from '@/constants';
import { WeaponTier } from '@/types';

interface PlayerProps {
  currentWeapon: WeaponTier;
}

export const Player: React.FC<PlayerProps> = ({ currentWeapon }) => {
  const currentWeaponObj = WEAPONS[currentWeapon];
  
  return (
    <div className="absolute left-4 bottom-[20vh] z-20 flex flex-col items-center">
      <div className="relative w-48 h-80 filter drop-shadow-lg animate-bounce-short">
        <MinecraftSprite type="STEVE" className="w-full h-full" />
        <div className="absolute -right-12 top-16 w-24 h-24 transform rotate-12 origin-bottom-left transition-all duration-500">
          <MinecraftSprite type={currentWeapon} className="w-full h-full" />
        </div>
      </div>
      <div className="w-20 h-4 bg-black/40 rounded-[50%] blur-sm mt-2"></div>
    </div>
  );
};
