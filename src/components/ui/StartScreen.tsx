import React from 'react';
import { BookOpen, BrainCircuit } from 'lucide-react';
import { DifficultyMode } from '@/types';

interface StartScreenProps {
  onStartGame: (mode: DifficultyMode) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center text-white p-6 font-pixel overflow-y-auto">
      <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-800 mb-2 filter drop-shadow-lg text-center">
        MineMath
      </h1>
      <h2 className="text-3xl text-stone-400 mb-8 tracking-widest text-center">數學礦坑：無限防守</h2>
      
      <div className="bg-stone-800/80 p-6 rounded-xl border-4 border-stone-600 max-w-3xl w-full mb-8 shadow-2xl backdrop-blur-sm">
        <h3 className="text-3xl text-yellow-400 mb-6 text-center border-b-2 border-stone-600 pb-2">選擇難度</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <button 
            onClick={() => onStartGame('BASIC')}
            className="flex flex-col items-center p-6 bg-stone-700 hover:bg-stone-600 border-b-8 border-stone-900 active:border-b-0 active:translate-y-2 rounded-xl transition-all group"
          >
            <BookOpen className="w-16 h-16 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-bold text-green-400 mb-2">基礎模式</h4>
            <div className="text-stone-300 text-center">
              <p className="text-xl mb-1">標準乘法</p>
              <div className="bg-black/40 px-3 py-1 rounded text-white font-mono">3 × 5 = ?</div>
            </div>
          </button>

          <button 
            onClick={() => onStartGame('ADVANCED')}
            className="flex flex-col items-center p-6 bg-red-950/50 hover:bg-red-900/50 border-b-8 border-red-950 active:border-b-0 active:translate-y-2 rounded-xl transition-all group ring-2 ring-red-900/50"
          >
            <BrainCircuit className="w-16 h-16 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-2xl font-bold text-red-400 mb-2">進階模式</h4>
            <div className="text-stone-300 text-center">
              <p className="text-xl mb-1">代數挑戰</p>
              <div className="bg-black/40 px-3 py-1 rounded text-white font-mono mb-1">? × 5 = 15</div>
              <div className="bg-black/40 px-3 py-1 rounded text-white font-mono">3 × ? = 15</div>
            </div>
          </button>
        </div>

        <div className="text-center text-stone-500 text-lg">
          點擊上方按鈕開始遊戲
        </div>
      </div>
    </div>
  );
};
