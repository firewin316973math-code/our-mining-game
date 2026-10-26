import { createStartingGrid, getRandomChallenge } from './simulation';
import type { BuildingType, GameState } from './types';

export const TOOL_OPTIONS: Array<{ type: BuildingType; label: string; accent: string }> = [
  { type: 'solar', label: 'Solar Panels', accent: '#f2c86b' },
  { type: 'garden', label: 'Rooftop Garden', accent: '#62c673' },
  { type: 'farm', label: 'Urban Farm', accent: '#9bdc5d' },
  { type: 'recycle', label: 'Recycler', accent: '#4db5d1' },
  { type: 'rain', label: 'Rain Capture', accent: '#61b6ff' },
  { type: 'bike', label: 'Cycleway', accent: '#67d4ae' },
  { type: 'transit', label: 'Transit Hub', accent: '#7b82ff' },
];

export const createInitialState = (): GameState => ({
  day: 1,
  money: 120,
  carbon: 72,
  energy: 88,
  waste: 62,
  greenCoverage: 18,
  happiness: 55,
  score: 0,
  population: 120,
  grid: createStartingGrid(6),
  selectedTool: 'solar',
  level: 1,
  challenge: getRandomChallenge(1),
  completedMissions: [],
});
