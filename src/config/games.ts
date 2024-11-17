import { GameConfig } from "@/types/game";

export const GAME_CONFIGS: Record<string, GameConfig> = {
  click: {
    title: "Target Practice",
    maxScore: 3,
    timeLimit: 20,
    description: "Click the colorful targets as they appear. Get 3 hits to verify you're human.",
  },
  pattern: {
    title: "Pattern Challenge",
    maxScore: 3,
    timeLimit: 45,
    description: "Memorize and repeat the pattern sequence. Complete 3 patterns to pass.",
  },
  memory: {
    title: "Memory Challenge",
    maxScore: 3,
    timeLimit: 30,
    description: "Match 3 pairs of cards to verify you're human.",
  },
  puzzle: {
    title: "Puzzle Challenge",
    maxScore: 1,
    timeLimit: 30,
    description: "Solve the 2x2 sliding puzzle to verify you're human.",
  },
};
