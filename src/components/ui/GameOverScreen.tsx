import React from 'react';
import { GameState } from '@/types';

interface GameOverScreenProps {
  gameState: GameState;
  onRespawn: () => void;
  onReturnToMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  gameState,
  onRespawn,
  onReturnToMenu
}) => {
  const isVictory = gameState.gameOverReason === 'VICTORY';

  return (
    <div className={`absolute inset-0 z-[60] flex flex-col items-center justify-center font-pixel animate-in fade-in duration-500 ${
      isVictory ? 'bg-yellow-500/60' : 'bg-red-900/60'
    }`}>
      <h1 className={`text-7xl md:text-8xl mb-2 drop-shadow-[4px_4px_0_#000] font-medium tracking-wide ${
        isVictory ? 'text-yellow-300' : 'text-white'
      }`}>
        {isVictory ? '通關！' : '你死了！'}
      </h1>

      <div className="text-xl md:text-3xl text-white mb-2 drop-shadow-[2px_2px_0_#000] tracking-wide opacity-90">
        {isVictory
          ? 'Steve 已精通所有數學難題！'
          : 'Steve 被數學難題擊敗了'}
      </div>

      <div className="text-2xl md:text-3xl text-yellow-400 mb-16 drop-shadow-[2px_2px_0_#000] tracking-wide font-bold">
        分數: {gameState.score}
      </div>

      <div className="flex flex-col gap-6 w-80 md:w-96">
        {!isVictory && (
          <button
            onClick={onRespawn}
            className="relative bg-[#989898] hover:bg-[#a8a8a8] active:bg-[#787878] w-full py-3 border-2 border-black group transition-colors"
            style={{
              boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.5), inset -2px -2px 0px rgba(0,0,0,0.5)'
            }}
          >
            <span className="text-white text-2xl drop-shadow-[2px_2px_0_#000]">重生</span>
          </button>
        )}

        <button
          onClick={onReturnToMenu}
          className="relative bg-[#989898] hover:bg-[#a8a8a8] active:bg-[#787878] w-full py-3 border-2 border-black group transition-colors"
          style={{
            boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.5), inset -2px -2px 0px rgba(0,0,0,0.5)'
          }}
        >
          <span className="text-white text-2xl drop-shadow-[2px_2px_0_#000]">
            {isVictory ? '返回標題' : '標題畫面'}
          </span>
        </button>
      </div>
    </div>
  );
};
