export type BuildingType = 'solar' | 'garden' | 'farm' | 'recycle' | 'rain' | 'bike' | 'transit';
export type CellValue = BuildingType | null;
export type Grid = CellValue[][];
export type ChallengeType = 'waste' | 'energy' | 'green';

export interface Challenge {
  type: ChallengeType;
  title: string;
  description: string;
}

export interface GameState {
  day: number;
  money: number;
  carbon: number;
  energy: number;
  waste: number;
  greenCoverage: number;
  happiness: number;
  score: number;
  population: number;
  grid: Grid;
  selectedTool: BuildingType | null;
  level: number;
  challenge: Challenge | null;
  completedMissions: string[];
}
