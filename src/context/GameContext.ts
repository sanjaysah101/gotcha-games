import { createContext } from "react";

import { GameState, GameType } from "@/types/game";

interface GameContextType extends GameState {
  currentGame: GameType;
  setCurrentGame: (game: GameType) => void;
  resetGame: () => void;
  handleScore: () => void;
  setActive: (active: boolean) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);
