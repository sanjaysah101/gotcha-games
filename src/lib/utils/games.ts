import { GameType } from "@/types/game";

const AVAILABLE_GAMES: GameType[] = ["click", "pattern", "memory", "puzzle"];

export const getRandomGame = (): GameType => {
  const randomIndex = Math.floor(Math.random() * AVAILABLE_GAMES.length);
  return AVAILABLE_GAMES[randomIndex];
}; 