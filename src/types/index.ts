
export type BiomeType = 'PLAINS' | 'CAVE' | 'NETHER' | 'END';

export interface BiomeConfig {
  id: BiomeType;
  name: string;
  bgGradient: string;
  groundColor: string;
  textColor: string;
  enemyTypes: EnemyType[];
  musicTrack?: string; // Placeholder
}

// Replaced 'CREEPER' with 'HARD_SKELETON' (The "Cucumber" replacement)
export type EnemyType = 'ZOMBIE' | 'SKELETON' | 'HARD_SKELETON' | 'GHOST' | 'ENDERMAN';

export interface EnemyConfig {
  type: EnemyType;
  emoji: string; // Fallback or used for non-pixel mobs
  speed: number;
  hp: number;
  scoreValue: number;
  dropRate: number; // 0-1
  dropType: 'IRON' | 'DIAMOND';
  spriteType?: 'ZOMBIE' | 'SKELETON' | 'HARD_SKELETON'; // For custom renderer
}

export interface Enemy {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Lane 0-2
  config: EnemyConfig;
  problem: {
    a: number;
    b: number;
    answer: number; // The number the user must type
    display: string; // The equation string shown (e.g., "? x 5 = 15")
  };
  isDying: boolean;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  life: number;
}

export interface FlyingResource {
  id: string;
  startX: number;
  startY: number; // Lane index
  currentX: number;
  currentY: number; // Viewport percentage usually
  targetX: number;
  targetY: number;
  progress: number; // 0 to 1
  type: 'IRON' | 'DIAMOND';
  emoji: string;
}

export type WeaponTier = 'WOOD' | 'STONE' | 'IRON' | 'DIAMOND' | 'NETHERITE' | 'VICTORY';

export interface Weapon {
  tier: WeaponTier;
  name: string;
  damage: number;
  emoji: string;
  color: string;
  cost: number; // Gem cost
  description: string;
  stats: {
    scoreMultiplier: number;
    speedModifier: number; // 1.0 is normal, 0.8 is slow
    dodgeChance: number; // 0.0 to 1.0
  };
}

export type DifficultyMode = 'BASIC' | 'ADVANCED';

export type GameOverReason = 'DEFEAT' | 'VICTORY';

export interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  gameOverReason: GameOverReason;
  difficultyMode: DifficultyMode;
  selectedTable: number[]; // 選擇的數字範圍（1-9），空陣列表示隨機混合
  score: number;
  depth: number; // Progression metric
  health: number;
  maxHealth: number;
  resources: {
    iron: number; // Legacy resource, kept for compatibility if needed
    diamond: number; // Main currency now
    emerald: number;
  };
  currentWeapon: WeaponTier;
  biome: BiomeType;
  combo: number;
  enemiesKilled: number; // 用於階段切換
}