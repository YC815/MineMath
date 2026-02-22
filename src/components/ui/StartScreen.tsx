import React, { useState } from 'react';
import { BookOpen, BrainCircuit, ArrowLeft } from 'lucide-react';
import { DifficultyMode } from '@/types';

interface StartScreenProps {
  onStartGame: (mode: DifficultyMode, selectedTables: number[]) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [showTableSelection, setShowTableSelection] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const handleBasicModeClick = () => {
    setShowTableSelection(true);
    setSelectedNumbers([]);
  };

  const handleNumberToggle = (num: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(num)) {
        return prev.filter(n => n !== num);
      } else {
        return [...prev, num].sort((a, b) => a - b);
      }
    });
  };

  const handleStartWithSelection = () => {
    onStartGame('BASIC', selectedNumbers);
  };

  const handleRandomMix = () => {
    onStartGame('BASIC', []);
  };

  const handleBack = () => {
    setShowTableSelection(false);
    setSelectedNumbers([]);
  };

  if (showTableSelection) {
    return (
      <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center text-white p-6 font-pixel overflow-y-auto">
        <button 
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>返回</span>
        </button>

        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-800 mb-2 filter drop-shadow-lg text-center">
          選擇乘法表
        </h1>
        <h2 className="text-2xl text-stone-400 mb-8 tracking-widest text-center">選擇你要練習的數字（可多選）</h2>
        
        <div className="bg-stone-800/80 p-6 rounded-xl border-4 border-stone-600 max-w-4xl w-full mb-8 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num}
                onClick={() => handleNumberToggle(num)}
                className={`flex flex-col items-center p-4 border-b-4 rounded-xl transition-all group ${
                  selectedNumbers.includes(num)
                    ? 'bg-green-600 border-green-800'
                    : 'bg-stone-700 hover:bg-green-600 border-stone-900 active:border-b-0 active:translate-y-1'
                }`}
              >
                <span className="text-4xl font-bold text-white mb-1">{num}</span>
                <span className={`text-sm ${selectedNumbers.includes(num) ? 'text-white' : 'text-stone-400 group-hover:text-white'}`}>
                  {num}×?
                </span>
              </button>
            ))}
          </div>

          <div className="border-t-2 border-stone-600 pt-6 space-y-4">
            <button 
              onClick={handleStartWithSelection}
              disabled={selectedNumbers.length === 0}
              className={`w-full flex flex-col items-center p-4 border-b-4 rounded-xl transition-all group ${
                selectedNumbers.length > 0
                  ? 'bg-green-600 hover:bg-green-500 border-green-800 active:border-b-0 active:translate-y-1'
                  : 'bg-stone-600 border-stone-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="text-2xl font-bold text-white mb-1">
                {selectedNumbers.length > 0 
                  ? `開始練習 (${selectedNumbers.join(', ')} 乘法表)`
                  : '請選擇至少一個數字'
                }
              </span>
              <span className="text-sm text-white/80">
                {selectedNumbers.length > 0 
                  ? `只出現 ${selectedNumbers.join(', ')} 的乘法題目`
                  : '點擊上方數字選擇範圍'
                }
              </span>
            </button>

            <button 
              onClick={handleRandomMix}
              className="w-full flex flex-col items-center p-4 bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 rounded-xl transition-all group"
            >
              <span className="text-2xl font-bold text-white mb-1">隨機混合模式</span>
              <span className="text-sm text-white/80">隨機 1-9 乘法（全範圍）</span>
            </button>
          </div>

          <div className="text-center text-stone-500 text-lg mt-6">
            {selectedNumbers.length > 0 
              ? `已選擇 ${selectedNumbers.length} 個數字，點擊上方綠色按鈕開始`
              : '點擊數字選擇範圍，或直接選擇隨機混合模式'
            }
          </div>
        </div>
      </div>
    );
  }

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
            onClick={handleBasicModeClick}
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
            onClick={() => onStartGame('ADVANCED', [])}
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
