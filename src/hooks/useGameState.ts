import { useState, useCallback } from 'react';
import { GameState, Enemy, Particle, FlyingResource, WeaponTier, DifficultyMode, BiomeType } from '@/types';
import { MAX_HEALTH, WEAPONS, WEAPON_ORDER } from '@/constants';

export interface GameActions {
  startGame: (mode: DifficultyMode, selectedTable?: number[]) => void;
  returnToMenu: () => void;
  updateDepth: () => void;
  takeDamage: () => void;
  addScore: (points: number) => void;
  incrementCombo: () => void;
  resetCombo: () => void;
  addResource: (type: 'diamond', amount: number) => void;
  upgradeWeapon: (tier: WeaponTier) => boolean;
    heal: (amount: number) => void;
    incrementEnemiesKilled: () => void;
    setEnemies: React.Dispatch<React.SetStateAction<Enemy[]>>;
  setParticles: React.Dispatch<React.SetStateAction<Particle[]>>;
  setFlyingLoot: React.Dispatch<React.SetStateAction<FlyingResource[]>>;
  setFocusedEnemy: React.Dispatch<React.SetStateAction<Enemy | null>>;
  setKeypadInput: React.Dispatch<React.SetStateAction<string>>;
  setUpgradeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPendingWeaponUpgrade: React.Dispatch<React.SetStateAction<WeaponTier | null>>;
  setInventoryBounce: React.Dispatch<React.SetStateAction<boolean>>;
  setLastSpawnTime: React.Dispatch<React.SetStateAction<number>>;
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isGameOver: false,
    gameOverReason: 'DEFEAT',
    difficultyMode: 'BASIC',
    selectedTable: [],
    score: 0,
    depth: 0,
    health: MAX_HEALTH,
    maxHealth: MAX_HEALTH,
    resources: { iron: 0, diamond: 0, emerald: 0 },
    currentWeapon: 'WOOD',
    biome: 'PLAINS',
    combo: 0,
    enemiesKilled: 0
  });

  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [flyingLoot, setFlyingLoot] = useState<FlyingResource[]>([]);
  const [focusedEnemy, setFocusedEnemy] = useState<Enemy | null>(null);
  const [keypadInput, setKeypadInput] = useState<string>('');
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [pendingWeaponUpgrade, setPendingWeaponUpgrade] = useState<WeaponTier | null>(null);
  const [inventoryBounce, setInventoryBounce] = useState(false);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);

  const startGame = useCallback((mode: DifficultyMode, selectedTable: number[] = []) => {
    setGameState({
      isPlaying: true,
      isGameOver: false,
      gameOverReason: 'DEFEAT',
      difficultyMode: mode,
      selectedTable: selectedTable,
      score: 0,
      depth: 0,
      health: MAX_HEALTH,
      maxHealth: MAX_HEALTH,
      resources: { iron: 0, diamond: 0, emerald: 0 },
      currentWeapon: 'WOOD',
      biome: 'PLAINS',
      combo: 0,
      enemiesKilled: 0
    });
    setEnemies([]);
    setFocusedEnemy(null);
    setKeypadInput('');
    setLastSpawnTime(0);
    setFlyingLoot([]);
  }, []);

  const returnToMenu = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isGameOver: false
    }));
  }, []);

  const updateDepth = useCallback(() => {
    setGameState(prev => {
      const newDepth = prev.depth + 0.1;
      return {
        ...prev,
        depth: newDepth
      };
    });
  }, []);

  const incrementEnemiesKilled = useCallback(() => {
    setGameState(prev => {
      const newKilled = prev.enemiesKilled + 1;
      let newBiome: BiomeType = prev.biome;
      
      // 根據擊殺數量切換階段
      if (newKilled >= 40) newBiome = 'END';
      else if (newKilled >= 25) newBiome = 'NETHER';
      else if (newKilled >= 12) newBiome = 'CAVE';
      else newBiome = 'PLAINS';
      
      return {
        ...prev,
        enemiesKilled: newKilled,
        biome: newBiome
      };
    });
  }, []);

  const takeDamage = useCallback(() => {
    setGameState(prev => {
      const newHealth = prev.health - 1;
      const isGameOver = newHealth <= 0;
      return {
        ...prev,
        health: newHealth,
        combo: 0,
        isGameOver: isGameOver,
        gameOverReason: isGameOver ? 'DEFEAT' : prev.gameOverReason
      };
    });
  }, []);

  const addScore = useCallback((points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  }, []);

  const incrementCombo = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      combo: prev.combo + 1
    }));
  }, []);

  const resetCombo = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      combo: 0
    }));
  }, []);

  const addResource = useCallback((type: 'diamond', amount: number) => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        [type]: prev.resources[type] + amount
      }
    }));
  }, []);

  const upgradeWeapon = useCallback((tier: WeaponTier) => {
    const cost = WEAPONS[tier].cost;
    let success = false;

    setGameState(prev => {
      if (prev.resources.diamond >= cost) {
        success = true;
        // 如果鍛造到通關劍，直接觸發勝利
        if (tier === 'VICTORY') {
          return {
            ...prev,
            resources: {
              ...prev.resources,
              diamond: prev.resources.diamond - cost
            },
            currentWeapon: tier,
            isGameOver: true, // 通關也算遊戲結束，顯示勝利畫面
            gameOverReason: 'VICTORY'
          };
        }
        return {
          ...prev,
          resources: {
            ...prev.resources,
            diamond: prev.resources.diamond - cost
          },
          currentWeapon: tier,
          health: Math.min(prev.maxHealth, prev.health + 1)
        };
      }
      return prev;
    });

    return success;
  }, []);

  const heal = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount)
    }));
  }, []);

  const actions: GameActions = {
    startGame,
    returnToMenu,
    updateDepth,
    takeDamage,
    addScore,
    incrementCombo,
    resetCombo,
    addResource,
    upgradeWeapon,
    heal,
    incrementEnemiesKilled,
    setEnemies,
    setParticles,
    setFlyingLoot,
    setFocusedEnemy,
    setKeypadInput,
    setUpgradeModalOpen,
    setPendingWeaponUpgrade,
    setInventoryBounce,
    setLastSpawnTime
  };

  const currentTierIndex = WEAPON_ORDER.indexOf(gameState.currentWeapon);
  const nextTier = currentTierIndex < WEAPON_ORDER.length - 1 ? WEAPON_ORDER[currentTierIndex + 1] : null;
  const nextWeaponObj = nextTier ? WEAPONS[nextTier] : null;
  const upgradeProgress = nextWeaponObj ? Math.min(100, (gameState.resources.diamond / nextWeaponObj.cost) * 100) : 100;
  const canUpgrade = nextWeaponObj ? gameState.resources.diamond >= nextWeaponObj.cost : false;

  return {
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
  };
}
