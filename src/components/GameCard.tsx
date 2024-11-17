import { FC } from "react";

import { motion } from "framer-motion";
import { Brain, Gamepad2, Puzzle, Target } from "lucide-react";

import { GameConfig } from "@/types/game";

import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";

const gameIcons = {
  click: Target,
  pattern: Brain,
  memory: Gamepad2,
  puzzle: Puzzle,
} as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface GameCardProps {
  game: string;
  config: GameConfig;
  onSelect: (game: string) => void;
}

export const GameCard: FC<GameCardProps> = ({ game, config, onSelect }) => {
  const Icon = gameIcons[game as keyof typeof gameIcons];
  const { description, maxScore, timeLimit } = config;

  return (
    <motion.div variants={item}>
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
              <span className="font-medium">{maxScore} points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Limit</span>
              <span className="font-medium">{timeLimit}s</span>
            </div>
          </div>
          <p className="border-l-2 border-primary/20 pl-3 text-xs text-muted-foreground md:text-sm">{description}</p>
          <Button
            onClick={() => onSelect(game)}
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
};
