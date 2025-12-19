export interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  timer: number;
  isGameActive: boolean;
  isGameComplete: boolean;
  bestScore: number | null;
}

export enum GameDifficulty {
  EASY = 12,   // 3x4
  MEDIUM = 16, // 4x4
  HARD = 20,   // 4x5
}