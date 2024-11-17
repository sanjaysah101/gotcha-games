import { createContext } from "react";

import { GameState, GameType } from "@/types/game";

interface GameContextType extends GameState {
  currentGame: GameType | null;
  setCurrentGame: (game: GameType) => void;
  setActive: (value: boolean) => void;
  resetGame: () => void;
  handleScore: () => void;
  isScoreHandled: boolean;
  setScoreHandled: (value: boolean) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);
