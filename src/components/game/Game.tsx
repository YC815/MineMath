import React, { useEffect, useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useSound } from '@/hooks/useSound';
import { Lane } from './Lane';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Particles } from './Particles';
import { FlyingLoot } from './FlyingLoot';
import { HUD } from '../ui/HUD';
import { CombatOverlay } from '../ui/CombatOverlay';
import { UpgradeModal } from '../ui/UpgradeModal';
import { StartScreen } from '../ui/StartScreen';
import { GameOverScreen } from '../ui/GameOverScreen';
import { BIOMES, WEAPONS, WEAPON_ORDER } from '@/constants';
import { Enemy as EnemyType, WeaponTier } from '@/types';

const LANE_COUNT = 4;

export const Game: React.FC = () => {
  const {
    gameState,
    enemies,
    particles,
    flyingLoot,
    focusedEnemy,
    keypadInput,
    upgradeModalOpen,
    pendingWeaponUpgrade,
    inventoryBounce,
    lastSpawnTime,
    nextTier,
    nextWeaponObj,
    upgradeProgress,
    canUpgrade,
    actions
  } = useGameState();

  const { playSound } = useSound();
  const [isInputShaking, setIsInputShaking] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  useGameLoop({
    gameState,
    enemies,
    flyingLoot,
    focusedEnemy,
    upgradeModalOpen,
    actions,
    lastSpawnTime
  });

  useEffect(() => {
    if (gameState.health <= 0 && !gameState.isGameOver) {
      actions.setEnemies([]);
      actions.setFocusedEnemy(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.health, gameState.isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.isPlaying || gameState.isGameOver) return;

      if (upgradeModalOpen) {
        if (e.key === 'Escape') actions.setUpgradeModalOpen(false);
        return;
      }

      if (focusedEnemy) {
        if (e.key >= '0' && e.key <= '9') {
          handleKeypadPress(e.key);
        } else if (e.key === 'Backspace') {
          handleKeypadPress('DEL');
        } else if (e.key === 'Enter') {
          handleSubmit();
        } else if (e.key === 'Escape') {
          actions.setFocusedEnemy(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isPlaying, gameState.isGameOver, focusedEnemy, upgradeModalOpen, keypadInput]);

  const handleEnemyClick = useCallback((enemy: EnemyType) => {
    playSound('tap');
    actions.setFocusedEnemy(enemy);
    actions.setKeypadInput('');
    setIsInputShaking(false);
  }, [playSound, actions]);

  const handleKeypadPress = useCallback((key: string) => {
    playSound('tap');
    if (key === 'DEL') {
      actions.setKeypadInput(prev => prev.slice(0, -1));
      return;
    }
    if (keypadInput.length < 6) {
      actions.setKeypadInput(prev => prev + key);
    }
  }, [keypadInput.length, playSound, actions]);

  const handleSubmit = useCallback(() => {
    if (!focusedEnemy) return;
    const numVal = parseInt(keypadInput);
    if (isNaN(numVal)) {
      triggerShake();
      return;
    }
    if (numVal === focusedEnemy.problem.answer) {
      killFocusedEnemy();
    } else {
      triggerShake();
    }
  }, [focusedEnemy, keypadInput]);

  const triggerShake = useCallback(() => {
    playSound('wrong');
    setIsInputShaking(true);
    setTimeout(() => {
      setIsInputShaking(false);
      actions.setKeypadInput('');
    }, 400);
  }, [playSound, actions]);

  const killFocusedEnemy = useCallback(() => {
    if (!focusedEnemy) return;
    
    const enemy = focusedEnemy;
    
    playSound('hit');
    actions.setFocusedEnemy(null);
    actions.setKeypadInput('');

    const weaponStats = WEAPONS[gameState.currentWeapon].stats;
    const scoreGain = Math.floor(enemy.config.scoreValue * weaponStats.scoreMultiplier * (gameState.combo > 5 ? 2 : 1));

    actions.addScore(scoreGain);
    actions.incrementCombo();

    const shouldDrop = Math.random() < enemy.config.dropRate;
    if (shouldDrop) {
      actions.setFlyingLoot(prev => [...prev, {
        id: Math.random().toString(),
        startX: enemy.x,
        startY: enemy.y,
        currentX: enemy.x,
        currentY: 0,
        targetX: 20,
        targetY: 92,
        progress: 0,
        type: enemy.config.dropType,
        emoji: '💎'
      }]);
    }

    actions.setParticles(prev => [
      ...prev, 
      { id: Math.random().toString(), x: enemy.x, y: enemy.y, emoji: '💥', life: 20 },
      { id: Math.random().toString(), x: enemy.x, y: enemy.y, emoji: '+' + scoreGain, life: 30 }
    ]);

    actions.setEnemies(prev => prev.filter(e => e.id !== enemy.id));
    actions.incrementEnemiesKilled();
  }, [focusedEnemy, gameState.currentWeapon, gameState.combo, playSound, actions]);

  const handleOpenUpgradeModal = useCallback(() => {
    if (nextTier) {
      actions.setPendingWeaponUpgrade(nextTier);
      actions.setUpgradeModalOpen(true);
    }
  }, [nextTier, actions]);

  const confirmUpgrade = useCallback(() => {
    if (!pendingWeaponUpgrade) return;
    
    const success = actions.upgradeWeapon(pendingWeaponUpgrade);
    if (success) {
      playSound('levelup');
      actions.setParticles(prev => [
        ...prev,
        { id: Math.random().toString(), x: 10, y: 0, emoji: '❤️', life: 40 }
      ]);
    }
    actions.setUpgradeModalOpen(false);
    actions.setPendingWeaponUpgrade(null);
  }, [pendingWeaponUpgrade, playSound, actions]);

  const handleRespawn = useCallback(() => {
    actions.startGame(gameState.difficultyMode);
  }, [gameState.difficultyMode, actions]);

  const currentBiome = BIOMES[gameState.biome];
  const currentWeaponObj = WEAPONS[gameState.currentWeapon];

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-b ${currentBiome.bgGradient} font-pixel select-none`}>
      <div className="absolute inset-0 z-0 flex flex-col justify-end pb-[20vh]"> 
        {Array.from({ length: LANE_COUNT }).map((_, i) => (
          <Lane key={i} index={i} />
        ))}
        <div className={`absolute bottom-0 w-full h-[20vh] ${currentBiome.groundColor} border-t-8 border-black/20 z-10`}></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-[20vh]">
        <Player currentWeapon={gameState.currentWeapon} />

        {enemies.map(enemy => (
          <Enemy key={enemy.id} enemy={enemy} onClick={handleEnemyClick} />
        ))}

        <FlyingLoot loot={flyingLoot} />

        <Particles particles={particles} />
      </div>

      {flash && <div className={`absolute inset-0 z-40 ${flash} pointer-events-none`}></div>}

      {!focusedEnemy && !upgradeModalOpen && (
        <HUD 
          gameState={gameState}
          nextWeaponObj={nextWeaponObj}
          upgradeProgress={upgradeProgress}
          canUpgrade={canUpgrade}
          inventoryBounce={inventoryBounce}
          onUpgradeClick={handleOpenUpgradeModal}
        />
      )}

      <UpgradeModal
        isOpen={upgradeModalOpen}
        pendingUpgrade={pendingWeaponUpgrade}
        currentWeapon={currentWeaponObj}
        onClose={() => actions.setUpgradeModalOpen(false)}
        onConfirm={confirmUpgrade}
      />

      <CombatOverlay
        enemy={focusedEnemy}
        input={keypadInput}
        isShaking={isInputShaking}
        onClose={() => actions.setFocusedEnemy(null)}
        onKeyPress={handleKeypadPress}
        onSubmit={handleSubmit}
        onDelete={() => handleKeypadPress('DEL')}
      />

      {!gameState.isPlaying && !gameState.isGameOver && (
        <StartScreen onStartGame={actions.startGame} />
      )}

      {gameState.isGameOver && (
        <GameOverScreen 
          gameState={gameState}
          onRespawn={handleRespawn}
          onReturnToMenu={actions.returnToMenu}
        />
      )}
    </div>
  );
};
