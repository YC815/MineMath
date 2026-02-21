import React from 'react';
import { FlyingResource } from '@/types';
import { MinecraftSprite } from '../shared/MinecraftSprite';

interface FlyingLootProps {
  loot: FlyingResource[];
}

export const FlyingLoot: React.FC<FlyingLootProps> = ({ loot }) => {
  return (
    <>
      {loot.map(item => {
        const startYPerc = 27.5 + ((3 - item.startY) * 15); 
        const endYPerc = 5; 

        const renderX = item.startX + (20 - item.startX) * item.progress;
        const renderY = startYPerc + (endYPerc - startYPerc) * item.progress;

        return (
          <div 
            key={item.id}
            className="absolute z-30 pointer-events-none"
            style={{
              left: `${renderX}%`,
              bottom: `${renderY}%`,
              transform: `scale(${1 - item.progress * 0.5})`,
              opacity: 1,
              width: '48px',
              height: '48px'
            }}
          >
            {item.emoji === '💎' ? (
              <MinecraftSprite type="DIAMOND" className="w-full h-full drop-shadow-lg" />
            ) : (
              <span className="text-4xl">{item.emoji}</span>
            )}
          </div>
        );
      })}
    </>
  );
};
