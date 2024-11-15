import { motion } from "framer-motion";
import { Brain, Gamepad2, Puzzle, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { GAME_CONFIGS } from "@/config/games";
import { useGame } from "@/hooks/useGame";

import { GameType } from "../types/game";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const gameIcons = {
  click: Target,
  pattern: Brain,
  memory: Gamepad2,
  puzzle: Puzzle,
} as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const GameSelector = () => {
  const navigate = useNavigate();
  const { setCurrentGame, resetGame } = useGame();

  const handleGameSelect = (game: string) => {
    resetGame();
    setCurrentGame(game as GameType);
    navigate(`/${game}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-center text-lg font-semibold md:text-xl">Select a Challenge to Begin</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {Object.entries(GAME_CONFIGS).map(([game, config]) => {
          const Icon = gameIcons[game as keyof typeof gameIcons];
          return (
            <motion.div key={game} variants={item}>
              <Card className="group h-full transition-all duration-300 hover:border-primary/20 hover:shadow-md">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                      <Icon className="size-4 text-primary md:size-5" />
                    </div>
                    <span className="capitalize">{game}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4 pt-0">
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Score</span>
                      <span className="font-medium">{config.maxScore} points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Limit</span>
                      <span className="font-medium">{config.timeLimit}s</span>
                    </div>
                  </div>
                  <p className="border-l-2 border-primary/20 pl-3 text-xs text-muted-foreground md:text-sm">
                    {config.description}
                  </p>
                  <Button
                    onClick={() => handleGameSelect(game)}
                    className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    variant="outline"
                    size="sm"
                  >
                    Start Challenge
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
