import { useMemo } from "react";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

import { HEADER_FEATURES } from "@/config/features";
import { GAME_CONFIGS } from "@/config/games";
import { useGame } from "@/hooks/useGame";
import { cn } from "@/lib/utils";

import { FeaturesGrid } from "./header/FeaturesGrid";
import { GameProgress } from "./header/GameProgress";

export const HomeHeader = () => {
  return (
    <motion.div
      key="home-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 space-y-6 md:mb-8 md:space-y-8"
    >
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Shield className="size-4" />
          GotCHA Challenge
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Play Games, Prove You're Human</h1>
        <p className="mx-auto max-w-[600px] text-sm text-muted-foreground md:text-base">
          A next-generation CAPTCHA that replaces boring challenges with fun mini-games. No more clicking on traffic
          lights!
        </p>
      </div>
      <FeaturesGrid features={HEADER_FEATURES} />
    </motion.div>
  );
};

export const GameHeader = ({ className }: { className?: string }) => {
  const { score, timeRemaining, active, currentGame } = useGame();
  const config = useMemo(() => (currentGame ? GAME_CONFIGS[currentGame] : null), [currentGame]);

  if (!config) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {active ? (
        <GameProgress score={score} timeRemaining={timeRemaining} config={config} />
      ) : (
        <>
          <h1 className="text-2xl font-bold">{config.title}</h1>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </>
      )}
    </div>
  );
};
