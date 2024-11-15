import { GameConfig } from "@/types/game";

export const GAME_CONFIGS: Record<string, GameConfig> = {
  click: {
    title: "CAPTCHA Challenge",
    maxScore: 5,
    timeLimit: 30,
    description: "Click on the moving targets to score points. Get 5 points within 30 seconds to pass.",
  },
  pattern: {
    title: "Pattern Challenge",
    maxScore: 3,
    timeLimit: 45,
    description: "Memorize and repeat the pattern sequence. Complete 3 patterns to pass.",
  },
  memory: {
    title: "Memory Challenge",
    maxScore: 6,
    timeLimit: 60,
    description: "Match the pairs of cards. Find 6 pairs within 60 seconds to pass.",
  },
  puzzle: {
    title: "Puzzle Challenge",
    maxScore: 1,
    timeLimit: 90,
    description: "Solve the sliding puzzle. Complete the image within 90 seconds to pass.",
  },
};
