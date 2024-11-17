import { useCallback, useEffect, useState } from "react";

import { GAME_CONFIGS } from "@/config/games";
import { GameState, GameType } from "@/types/game";

import { GameContext } from "./GameContext";

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentGame, setCurrentGame] = useState<GameType>("click");
  const [isScoreHandled, setScoreHandled] = useState(false);
  const [state, setState] = useState<GameState>({
    active: false,
    score: 0,
    timeRemaining: GAME_CONFIGS[currentGame].timeLimit,
  });

  const handleScore = useCallback(() => {
    if (!isScoreHandled) {
      setState((prev) => ({
        ...prev,
        score: prev.score + 1,
      }));
      setScoreHandled(true);
    }
  }, [isScoreHandled]);

  const setActive = useCallback(
    (value: boolean) => {
      setState((prev) => ({
        ...prev,
        active: value,
        score: 0,
        timeRemaining: GAME_CONFIGS[currentGame].timeLimit,
      }));
      setScoreHandled(false);
    },
    [currentGame]
  );

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      active: false,
      score: 0,
      timeRemaining: GAME_CONFIGS[currentGame].timeLimit,
    }));
  }, [currentGame]);

  // Timer effect
  useEffect(() => {
    if (!state.active || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timeRemaining: prev.timeRemaining - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.active, state.timeRemaining]);

  return (
    <GameContext.Provider
      value={{
        ...state,
        currentGame,
        setCurrentGame,
        setActive,
        resetGame,
        handleScore,
        isScoreHandled,
        setScoreHandled,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
