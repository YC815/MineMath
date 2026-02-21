import { useCallback, useRef, useEffect } from 'react';
import { Enemy, FlyingResource, BiomeType, DifficultyMode, WeaponTier } from '@/types';
import { BIOMES, ENEMIES, WEAPONS, GAME_SPEED_BASE } from '@/constants';
import { GameActions } from './useGameState';

const LANE_COUNT = 3;

interface GameLoopDeps {
  gameState: {
    isPlaying: boolean;
    isGameOver: boolean;
    depth: number;
    biome: BiomeType;
    currentWeapon: WeaponTier;
    difficultyMode: DifficultyMode;
  };
  enemies: Enemy[];
  flyingLoot: FlyingResource[];
  focusedEnemy: Enemy | null;
  upgradeModalOpen: boolean;
  actions: GameActions;
}

export function useGameLoop(deps: GameLoopDeps) {
  const { gameState, enemies, flyingLoot, focusedEnemy, upgradeModalOpen, actions } = deps;
  const requestRef = useRef<number>(0);

  const spawnEnemy = useCallback((currentEnemies: Enemy[]) => {
    const biome = BIOMES[gameState.biome];
    const type = biome.enemyTypes[Math.floor(Math.random() * biome.enemyTypes.length)];
    const config = ENEMIES[type];
    
    const lane = Math.floor(Math.random() * LANE_COUNT);
    const enemiesInLane = currentEnemies.filter(e => e.y === lane);
    const rightMostX = Math.max(...enemiesInLane.map(e => e.x), 0);

    if (rightMostX > 85) return;

    const newEnemy: Enemy = {
      id: Math.random().toString(36).substr(2, 9),
      x: 100,
      y: lane,
      config,
      problem: generateProblem(gameState.biome, gameState.difficultyMode),
      isDying: false
    };

    actions.setEnemies(prev => [...prev, newEnemy]);
  }, [gameState.biome, gameState.difficultyMode, actions]);

  const animate = useCallback((time: number) => {
    if (!gameState.isPlaying || gameState.isGameOver) return;
    
    if (focusedEnemy || upgradeModalOpen) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    actions.updateDepth();

    const weaponStats = WEAPONS[gameState.currentWeapon].stats;
    const speedMod = weaponStats.speedModifier;

    actions.setEnemies(prevEnemies => {
      const speedMultiplier = 1 + (gameState.depth / 2000);
      const effectiveSpeed = GAME_SPEED_BASE * speedMultiplier * speedMod;

      let nextEnemies = prevEnemies.map(e => ({
        ...e,
        x: e.x - (e.config.speed * effectiveSpeed)
      }));

      const hitEnemy = nextEnemies.find(e => e.x <= 10);
      
      if (hitEnemy) {
        const isDodged = Math.random() < weaponStats.dodgeChance;

        if (isDodged) {
          actions.setParticles(prev => [...prev, { 
            id: Math.random().toString(), 
            x: 12, 
            y: hitEnemy.y, 
            emoji: '🛡️', 
            life: 30 
          }]);
        } else {
          actions.takeDamage();
        }
        return nextEnemies.filter(e => e.id !== hitEnemy.id);
      }

      return nextEnemies;
    });

    actions.setFlyingLoot(prevLoot => {
      const nextLoot: FlyingResource[] = [];
      let resourceGained = 0;

      prevLoot.forEach(loot => {
        const speed = 0.04;
        const newProgress = loot.progress + speed;

        if (newProgress >= 1) {
          resourceGained += 1;
        } else {
          nextLoot.push({
            ...loot,
            progress: newProgress,
            currentX: loot.startX + (20 - loot.startX) * loot.progress,
            currentY: 90 - (loot.progress * 85)
          });
        }
      });

      if (resourceGained > 0) {
        actions.addResource('diamond', resourceGained);
        actions.setInventoryBounce(true);
        setTimeout(() => actions.setInventoryBounce(false), 300);
      }

      return nextLoot;
    });

    if (time - deps.lastSpawnTime > Math.max(800, 2000 - gameState.depth)) {
      spawnEnemy(enemies);
      actions.setLastSpawnTime(time);
    }

    actions.setParticles(prev => prev.filter(p => p.life > 0).map(p => ({...p, life: p.life - 1})));

    requestRef.current = requestAnimationFrame(animate);
  }, [gameState, enemies, flyingLoot, focusedEnemy, upgradeModalOpen, actions, spawnEnemy, deps.lastSpawnTime]);

  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState.isPlaying, gameState.isGameOver, animate]);

  return { spawnEnemy };
}

function generateProblem(biomeId: BiomeType, mode: DifficultyMode) {
  let min = 2, max = 9;
  if (biomeId === 'CAVE') { max = 12; }
  if (biomeId === 'NETHER') { min = 4; max = 15; }
  if (biomeId === 'END') { min = 6; max = 19; }

  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  const product = a * b;

  if (mode === 'BASIC') {
    return { a, b, answer: product, display: `${a} × ${b} = ?` };
  } 
  
  const type = Math.floor(Math.random() * 3);

  if (type === 0) {
    return { a, b, answer: product, display: `${a} × ${b} = ?` };
  } else if (type === 1) {
    return { a, b, answer: a, display: `? × ${b} = ${product}` };
  } else {
    return { a, b, answer: b, display: `${a} × ? = ${product}` };
  }
}
