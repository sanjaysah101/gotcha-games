import { useCallback, useState } from "react";

import { GAME_CONFIGS } from "@/config/games";
import { GameState, GameType } from "@/types/game";

import { GameContext } from "./GameContext";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentGame, setCurrentGame] = useState<GameType>("click");
  const [state, setState] = useState<GameState>({
    active: false,
    score: 0,
    timeRemaining: GAME_CONFIGS[currentGame].timeLimit,
  });

  const resetGame = useCallback(() => {
    setState({
      active: false,
      score: 0,
      timeRemaining: GAME_CONFIGS[currentGame].timeLimit,
    });
  }, [currentGame]);

  const handleScore = useCallback(() => {
    setState((prev) => ({
      ...prev,
      score: prev.score + 1,
    }));
  }, []);

  const setActive = useCallback((active: boolean) => {
    setState((prev) => ({
      ...prev,
      active,
    }));
  }, []);

  return (
    <GameContext.Provider
      value={{
        ...state,
        currentGame,
        setCurrentGame,
        resetGame,
        handleScore,
        setActive,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
