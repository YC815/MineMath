import React from 'react';
import { X, ArrowRight, Hammer, Heart } from 'lucide-react';
import { MinecraftSprite } from '../shared/MinecraftSprite';
import { Weapon, WeaponTier } from '@/types';
import { WEAPONS } from '@/constants';

interface UpgradeModalProps {
  isOpen: boolean;
  pendingUpgrade: WeaponTier | null;
  currentWeapon: Weapon;
  onClose: () => void;
  onConfirm: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  pendingUpgrade,
  currentWeapon,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !pendingUpgrade) return null;

  const nextWeapon = WEAPONS[pendingUpgrade];

  return (
    <div className="absolute inset-0 z-[70] bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#C6C6C6] border-4 border-[#373737] rounded-none max-w-2xl w-full p-0 shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center p-2 px-4 bg-[#C6C6C6] border-b-4 border-[#373737]/20">
          <h2 className="text-3xl text-[#3f3f3f] font-bold">Repair & Upgrade</h2>
          <button onClick={onClose} className="text-[#3f3f3f] hover:text-black">
            <X className="w-8 h-8" />
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-8 w-full">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#8B8B8B] border-b-2 border-r-2 border-white border-t-2 border-l-2 border-[#373737] flex items-center justify-center mb-2 shadow-inner">
                <MinecraftSprite type={currentWeapon.tier} className="w-16 h-16" />
              </div>
              <span className="text-[#3f3f3f] font-bold">{currentWeapon.name}</span>
            </div>

            <div className="text-4xl text-[#3f3f3f] font-bold pb-6">+</div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#8B8B8B] border-b-2 border-r-2 border-white border-t-2 border-l-2 border-[#373737] flex items-center justify-center mb-2 shadow-inner relative">
                <MinecraftSprite type="DIAMOND" className="w-16 h-16" />
                <span className="absolute bottom-1 right-1 text-white text-xl font-bold drop-shadow-md">{nextWeapon.cost}</span>
              </div>
              <span className="text-[#3f3f3f] font-bold">Cost</span>
            </div>

            <div className="px-4 pb-6 text-[#3f3f3f]">
              <ArrowRight className="w-12 h-12" />
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#8B8B8B] border-b-2 border-r-2 border-white border-t-2 border-l-2 border-[#373737] flex items-center justify-center mb-2 shadow-inner bg-yellow-900/10">
                <MinecraftSprite type={nextWeapon.tier} className="w-16 h-16 animate-bounce-short" />
              </div>
              <span className="text-[#3f3f3f] font-bold">{nextWeapon.name}</span>
            </div>
          </div>

          <div className="w-full bg-[#8B8B8B] border-2 border-[#373737] p-4 mb-6 text-white text-xl shadow-inner">
            <p className="font-bold text-yellow-200 text-2xl mb-1">{nextWeapon.name}</p>
            <p className="mb-2">{nextWeapon.description}</p>
            <p className="text-green-300 flex items-center gap-2">
              <Heart className="w-5 h-5 fill-green-300" /> 鍛造獎勵: 恢復 1 顆心
            </p>
          </div>

          <button 
            onClick={onConfirm}
            className="w-full bg-[#3FB955] hover:bg-[#329845] text-white py-4 text-2xl font-bold border-b-4 border-[#256e33] active:border-b-0 active:translate-y-1 flex items-center justify-center gap-3 shadow-lg"
          >
            <Hammer className="w-8 h-8 fill-current" />
            鍛造升級
          </button>
        </div>
      </div>
    </div>
  );
};
