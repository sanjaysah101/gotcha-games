import { useCallback } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { GAME_CONFIGS } from "@/config/games";
import { useGame } from "@/hooks/useGame";
import { GameType } from "@/types/game";

import { GameCard } from "./GameCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface GameSelectorProps {
  random?: boolean;
}

const RandomGameCard = ({ onSelect }: { onSelect: (game: string) => void }) => {
  const gameEntries = Object.entries(GAME_CONFIGS);
  const [game, config] = gameEntries[Math.floor(Math.random() * gameEntries.length)];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-sm">
      <GameCard game={game} config={config} onSelect={onSelect} />;
    </motion.div>
  );
};

const GameGrid = ({ onSelect }: { onSelect: (game: string) => void }) => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    {Object.entries(GAME_CONFIGS).map(([game, config]) => (
      <GameCard key={game} game={game} config={config} onSelect={onSelect} />
    ))}
  </motion.div>
);

export const GameSelector = ({ random = false }: GameSelectorProps) => {
  const navigate = useNavigate();
  const { setCurrentGame, resetGame } = useGame();

  const handleGameSelect = useCallback(
    (game: string) => {
      resetGame();
      setCurrentGame(game as GameType);
      navigate(`/${game}`);
    },
    [navigate, resetGame, setCurrentGame]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-center text-lg font-semibold md:text-xl">
        {random ? "Complete the Challenge to Verify" : "Select a Challenge to Begin"}
      </h2>
      {random ? <RandomGameCard onSelect={handleGameSelect} /> : <GameGrid onSelect={handleGameSelect} />}
    </div>
  );
};
