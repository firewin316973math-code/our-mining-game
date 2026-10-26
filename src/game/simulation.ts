import type { BuildingType, Challenge, GameState, Grid } from './types';

export const BUILDING_EFFECTS: Record<
  BuildingType,
  { carbon: number; energy: number; waste: number; green: number; happiness: number; cost: number }
> = {
  solar: { carbon: -20, energy: -16, waste: 0, green: 0, happiness: 4, cost: 18 },
  garden: { carbon: -10, energy: -4, waste: -3, green: 18, happiness: 10, cost: 10 },
  farm: { carbon: -12, energy: -7, waste: -6, green: 14, happiness: 7, cost: 14 },
  recycle: { carbon: -15, energy: -4, waste: -18, green: 2, happiness: 6, cost: 12 },
  rain: { carbon: -8, energy: -5, waste: -4, green: 9, happiness: 5, cost: 9 },
  bike: { carbon: -16, energy: -5, waste: -2, green: 3, happiness: 10, cost: 11 },
  transit: { carbon: -18, energy: -8, waste: -3, green: 1, happiness: 12, cost: 18 },
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const createStartingGrid = (size = 6): Grid =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => null));

export const getBuildingCount = (grid: Grid, type: BuildingType) =>
  grid.flat().filter((cell) => cell === type).length;

export const getEffectTotals = (grid: Grid) => {
  const totals = { carbon: 0, energy: 0, waste: 0, green: 0, happiness: 0 };

  for (const row of grid) {
    for (const cell of row) {
      if (!cell) continue;
      const effect = BUILDING_EFFECTS[cell];
      totals.carbon += effect.carbon;
      totals.energy += effect.energy;
      totals.waste += effect.waste;
      totals.green += effect.green;
      totals.happiness += effect.happiness;
    }
  }

  return totals;
};

export const getRandomChallenge = (day: number): Challenge | null => {
  if (day % 3 !== 0) return null;

  const options: Challenge[] = [
    {
      type: 'waste',
      title: 'Excessive waste generation',
      description: 'Plastic packaging and food waste are rising across the estate.',
    },
    {
      type: 'energy',
      title: 'High electricity demand',
      description: 'Air conditioners and evening lighting are pushing energy use much higher.',
    },
    {
      type: 'green',
      title: 'Insufficient greenery',
      description: 'Shade and cooling are low, making the neighbourhood less comfortable.',
    },
  ];

  return options[(day + 1) % options.length];
};

export const simulateTurn = (state: GameState): GameState => {
  const totals = getEffectTotals(state.grid);
  const challengeBoost = state.challenge
    ? state.challenge.type === 'waste'
      ? 13
      : state.challenge.type === 'energy'
        ? 15
        : 10
    : 0;

  const next: GameState = {
    ...state,
    day: state.day + 1,
    challenge: getRandomChallenge(state.day + 1),
    carbon: clamp(state.carbon + (24 + state.level * 3 - totals.carbon + challengeBoost * 0.5), 0, 200),
    energy: clamp(state.energy + (19 + state.level * 2 - totals.energy + challengeBoost * 0.7), 0, 200),
    waste: clamp(state.waste + (18 + state.level * 3 - totals.waste + challengeBoost * 0.8), 0, 180),
    greenCoverage: clamp(state.greenCoverage + totals.green * 0.7 - 3 + (state.challenge?.type === 'green' ? 1.5 : 0), 0, 100),
    happiness: clamp(state.happiness + totals.happiness * 0.5 - 4 + (state.challenge ? 2 : 0), 0, 100),
    population: state.population + 4 + state.level,
    score: state.score + Math.round((totals.green * 1.2 + totals.happiness * 1.5) / 2),
    money: state.money + 8 + Math.round(totals.green * 0.5),
  };

  const missionRewards = [
    { id: 'green-boost', complete: next.greenCoverage >= 35 },
    { id: 'clean-energy', complete: next.energy <= 60 },
    { id: 'low-waste', complete: next.waste <= 35 },
    { id: 'happy-neighbourhood', complete: next.happiness >= 70 },
  ];

  const completed = missionRewards
    .filter((mission) => mission.complete)
    .map((mission) => mission.id);

  const newCompleted = [...new Set([...state.completedMissions, ...completed])];
  const rewardTotal = newCompleted.filter((id) => !state.completedMissions.includes(id)).length * 50;

  next.completedMissions = newCompleted;
  next.score += rewardTotal;
  next.money += rewardTotal;

  return next;
};
