import React from 'react';
import assets from '../../../assets.json';

interface MinecraftSpriteProps {
  type: string;
  className?: string;
}

export const MinecraftSprite: React.FC<MinecraftSpriteProps> = ({ type, className }) => {
  const getAssetConfig = (key: string) => {
    const p = assets.player as Record<string, any>;
    const e = assets.enemies as Record<string, any>;
    const i = assets.items as Record<string, any>;
    const w = assets.weapons as Record<string, any>;

    if (p[key]) return p[key];
    if (e[key]) return e[key];
    if (i[key]) return i[key];
    if (w[key]) return w[key];
    return null;
  };

  const config = getAssetConfig(type);

  if (!config || !config.src) return null;

  const style: React.CSSProperties = {
    imageRendering: 'pixelated',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    ...(config.style || {})
  };

  return (
    <img 
      src={config.src} 
      alt={config.name || type} 
      className={`${className} object-contain drop-shadow-md select-none`} 
      style={style}
      draggable={false}
    />
  );
};
