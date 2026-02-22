
import { BiomeConfig, EnemyConfig, Weapon, WeaponTier } from "./types";

export const GAME_SPEED_BASE = 0.05;
export const SPAWN_RATE_BASE = 2000; // ms
export const MAX_HEALTH = 5;

export const WEAPONS: Record<WeaponTier, Weapon> = {
  WOOD: {
    tier: 'WOOD',
    name: '木劍',
    damage: 1,
    emoji: '🗡️',
    color: 'text-amber-700',
    cost: 0,
    description: '基礎裝備。無特殊效果。',
    stats: {
      scoreMultiplier: 1,
      speedModifier: 1,
      dodgeChance: 0
    }
  },
  STONE: {
    tier: 'STONE',
    name: '石劍',
    damage: 1,
    emoji: '⚔️',
    color: 'text-stone-400',
    cost: 5,
    description: '打擊感更重。積分 x1.5 倍',
    stats: {
      scoreMultiplier: 1.5,
      speedModifier: 1,
      dodgeChance: 0
    }
  },
  IRON: {
    tier: 'IRON',
    name: '鐵劍',
    damage: 2,
    emoji: '🛡️',
    color: 'text-slate-200',
    cost: 10,
    description: '寒冰效果。積分 x2 倍 + 凍結敵人',
    stats: {
      scoreMultiplier: 2,
      speedModifier: 0.8, // Enemies move at 80% speed
      dodgeChance: 0
    }
  },
  DIAMOND: {
    tier: 'DIAMOND',
    name: '鑽石劍',
    damage: 3,
    emoji: '💠',
    color: 'text-cyan-400',
    cost: 20,
    description: '鋒利且幸運。積分 x3 倍 + 30% 閃避',
    stats: {
      scoreMultiplier: 3,
      speedModifier: 0.8,
      dodgeChance: 0.3
    }
  },
  NETHERITE: {
    tier: 'NETHERITE',
    name: '獄髓劍',
    damage: 5,
    emoji: '🔥',
    color: 'text-purple-900',
    cost: 40,
    description: '終極武器。積分 x5 倍 + 駭客模式',
    stats: {
      scoreMultiplier: 5,
      speedModifier: 0.5, // 50% speed
      dodgeChance: 0.3
    }
  },
  VICTORY: {
    tier: 'VICTORY',
    name: '通關',
    damage: 10,
    emoji: '🏆',
    color: 'text-yellow-400',
    cost: 80,
    description: '你已精通數學！鍛造此劍即可通關',
    stats: {
      scoreMultiplier: 10,
      speedModifier: 0.3,
      dodgeChance: 0.5
    }
  }
};

// Define progression order for the UI
export const WEAPON_ORDER: WeaponTier[] = ['WOOD', 'STONE', 'IRON', 'DIAMOND', 'NETHERITE', 'VICTORY'];

export const BIOMES: Record<string, BiomeConfig> = {
  PLAINS: {
    id: 'PLAINS',
    name: 'Overworld Plains',
    bgGradient: 'from-sky-300 to-sky-100',
    groundColor: 'bg-green-600',
    textColor: 'text-slate-800',
    enemyTypes: ['ZOMBIE', 'HARD_SKELETON'] // Replaced Creeper
  },
  CAVE: {
    id: 'CAVE',
    name: 'Deep Caves',
    bgGradient: 'from-stone-800 to-stone-900',
    groundColor: 'bg-stone-700',
    textColor: 'text-stone-300',
    enemyTypes: ['ZOMBIE', 'SKELETON', 'HARD_SKELETON']
  },
  NETHER: {
    id: 'NETHER',
    name: 'The Nether',
    bgGradient: 'from-red-900 to-orange-900',
    groundColor: 'bg-red-950',
    textColor: 'text-red-200',
    enemyTypes: ['SKELETON', 'GHOST']
  },
  END: {
    id: 'END',
    name: 'The End',
    bgGradient: 'from-purple-950 to-black',
    groundColor: 'bg-indigo-950',
    textColor: 'text-purple-200',
    enemyTypes: ['ENDERMAN', 'GHOST']
  }
};

export const ENEMIES: Record<string, EnemyConfig> = {
  ZOMBIE: {
    type: 'ZOMBIE',
    emoji: '🧟', // Fallback
    spriteType: 'ZOMBIE',
    speed: 1.0,
    hp: 1,
    scoreValue: 10,
    dropRate: 1.0,
    dropType: 'DIAMOND'
  },
  SKELETON: {
    type: 'SKELETON',
    emoji: '💀',
    spriteType: 'SKELETON',
    speed: 1.2,
    hp: 1,
    scoreValue: 15,
    dropRate: 1.0,
    dropType: 'DIAMOND'
  },
  HARD_SKELETON: { // Formerly Creeper/Cucumber
    type: 'HARD_SKELETON',
    emoji: '☠️',
    spriteType: 'HARD_SKELETON',
    speed: 0.8,
    hp: 1,
    scoreValue: 25,
    dropRate: 1.0,
    dropType: 'DIAMOND'
  },
  GHOST: { type: 'GHOST', emoji: '👻', speed: 1.5, hp: 1, scoreValue: 30, dropRate: 1.0, dropType: 'DIAMOND' },
  ENDERMAN: { type: 'ENDERMAN', emoji: '👾', speed: 2.0, hp: 1, scoreValue: 50, dropRate: 1.0, dropType: 'DIAMOND' },
};
