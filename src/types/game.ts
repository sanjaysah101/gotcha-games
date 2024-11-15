export interface GameProps {
  onScore: () => void;
  gameActive: boolean;
  score: number;
}

export interface GameConfig {
  title: string;
  maxScore: number;
  timeLimit: number;
  description: string;
}

export type GameType = "click" | "pattern" | "memory" | "puzzle";

export interface GameState {
  active: boolean;
  score: number;
  timeRemaining: number;
}
