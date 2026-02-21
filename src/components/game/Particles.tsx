import React from 'react';
import { Particle as ParticleType } from '@/types';

interface ParticlesProps {
  particles: ParticleType[];
}

export const Particles: React.FC<ParticlesProps> = ({ particles }) => {
  return (
    <>
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute text-5xl animate-pulse pointer-events-none font-bold text-white drop-shadow-md"
          style={{ 
            left: `${p.x}%`, 
            bottom: `${27.5 + (3 - p.y) * 15}vh`,
            opacity: p.life / 20 
          }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  );
};
