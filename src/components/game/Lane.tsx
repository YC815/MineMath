import React from 'react';

interface LaneProps {
  index: number;
}

export const Lane: React.FC<LaneProps> = ({ index }) => {
  return (
    <div className="relative w-full h-[15vh] border-b-2 border-black/10 flex items-center">
      <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-black/5' : 'bg-transparent'}`}></div>
    </div>
  );
};
