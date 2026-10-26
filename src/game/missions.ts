import type { GameState } from './types';

export interface MissionDefinition {
  id: string;
  title: string;
  description: string;
  isComplete: (state: GameState) => boolean;
  reward: number;
}

export const MISSIONS: MissionDefinition[] = [
  {
    id: 'green-boost',
    title: 'Grow greener space',
    description: 'Raise green coverage to at least 35%.',
    isComplete: (state) => state.greenCoverage >= 35,
    reward: 80,
  },
  {
    id: 'clean-energy',
    title: 'Cut energy demand',
    description: 'Keep total energy use below 60.',
    isComplete: (state) => state.energy <= 60,
    reward: 90,
  },
  {
    id: 'low-waste',
    title: 'Reduce waste output',
    description: 'Keep waste below 35 kg.',
    isComplete: (state) => state.waste <= 35,
    reward: 100,
  },
  {
    id: 'happy-neighbourhood',
    title: 'Boost resident happiness',
    description: 'Reach at least 70% resident happiness.',
    isComplete: (state) => state.happiness >= 70,
    reward: 110,
  },
];

export const LEVEL_TARGETS = [
  { level: 1, name: 'Starter estate', target: 150 },
  { level: 2, name: 'Sustainable expansion', target: 220 },
  { level: 3, name: 'Waste resilience', target: 300 },
  { level: 4, name: 'Urban cooling', target: 380 },
  { level: 5, name: 'Net-zero vision', target: 500 },
];
