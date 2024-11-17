import { useCallback, useEffect, useState } from "react";

import { GAME_CONFIGS } from "@/config/games";
import { GameState, GameType } from "@/types/game";

import { GameContext } from "./GameContext";

const DEFAULT_TIME_LIMIT = 30; // Fallback time limit

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);
  const [isScoreHandled, setScoreHandled] = useState(false);
  // Initialize with safe default values
  const [state, setState] = useState<GameState>(() => ({
    active: false,
    score: 0,
    timeRemaining: 0,
  }));

  // Helper function to safely get game config
  const getGameTimeLimit = useCallback((game: GameType | null) => {
    if (!game) return DEFAULT_TIME_LIMIT;
    return GAME_CONFIGS[game]?.timeLimit ?? DEFAULT_TIME_LIMIT;
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/").pop() ?? "";
    if (path !== "" && Object.keys(GAME_CONFIGS).includes(path)) {
      setCurrentGame(path as GameType);
    }
  }, []);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      timeRemaining: getGameTimeLimit(currentGame),
    }));
  }, [currentGame, getGameTimeLimit]);

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
        timeRemaining: getGameTimeLimit(currentGame),
      }));
      setScoreHandled(false);
    },
    [currentGame, getGameTimeLimit]
  );

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      active: false,
      score: 0,
      timeRemaining: getGameTimeLimit(currentGame),
    }));
  }, [currentGame, getGameTimeLimit]);

  useEffect(() => {
    if (!state.active || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1),
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
