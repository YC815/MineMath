# AGENTS.md

Guidelines for AI agents working in the MineMath codebase.

## Build Commands

```bash
# Development server (runs on port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Note:** This project uses Vite. There are currently no lint or test commands configured. If adding tests, use a framework like Vitest and add the appropriate scripts to package.json.

## Project Structure

```
src/
├── components/
│   ├── game/          # Game entities (Enemy, Player, Particles, etc.)
│   ├── ui/            # UI components (HUD, Keypad, Modals)
│   └── shared/        # Shared components (MinecraftSprite)
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── constants/         # Game constants and configuration
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript with explicit types
- Prefer `interface` over `type` for object shapes
- Use PascalCase for types/interfaces, camelCase for variables/functions
- Export types from `@/types` index file

```typescript
// Good
export interface EnemyConfig {
  type: EnemyType;
  speed: number;
}

// Avoid
export type EnemyConfig = {
  type: string;
  speed: number;
}
```

### Imports

- Use `@/` alias for src imports
- Group imports: React, third-party, internal (@/), relative
- Use named exports for components

```typescript
import React, { useCallback } from 'react';
import { Heart } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { Enemy } from './Enemy';
```

### Component Structure

- Use functional components with React.FC type
- Props interface named with ComponentName + Props
- Destructure props in function parameters

```typescript
interface EnemyProps {
  enemy: EnemyType;
  onClick: (enemy: EnemyType) => void;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy, onClick }) => {
  // Component logic
};
```

### Naming Conventions

- Components: PascalCase (e.g., `CombatOverlay`)
- Hooks: camelCase with `use` prefix (e.g., `useGameState`)
- Types: PascalCase (e.g., `WeaponTier`)
- Constants: UPPER_SNAKE_CASE for true constants
- Files: PascalCase for components, camelCase for hooks/utils

### State Management

- Use custom hooks to encapsulate state logic
- Keep component state minimal; lift to hooks when shared
- Use `useCallback` for event handlers passed to children

### Error Handling

- Validate props and state before use
- Use early returns for guard clauses
- Provide fallback UI for missing data

### CSS/Tailwind

- Use Tailwind classes exclusively (no CSS modules)
- Prefer semantic color names (e.g., `bg-stone-800`)
- Group related classes together
- Use `className` template literals for conditional classes

```typescript
<div className={`bg-stone-800 ${isActive ? 'border-green-500' : 'border-stone-600'}`}>
```

### Performance

- Use `React.memo` for expensive renders if needed
- Use `useCallback` for stable function references
- Avoid inline object/array creation in render

## Key Technologies

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

## Path Aliases

- `@/` maps to `src/` directory
- Use for all imports outside the current directory
