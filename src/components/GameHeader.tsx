import { motion } from "framer-motion";
import { Shield, Gamepad2, Timer } from "lucide-react";
import { useLocation } from "react-router-dom";

import { GAME_CONFIGS } from "@/config/games";
import { useGame } from "@/hooks/useGame";
import { cn } from "@/lib/utils";

// Move features data outside component for better organization
const features = [
  {
    icon: Gamepad2,
    title: "Fun Challenges",
    description: "Interactive games that are actually enjoyable to play"
  },
  {
    icon: Shield,
    title: "Secure Verification",
    description: "Effectively prevents bots while being user-friendly"
  },
  {
    icon: Timer,
    title: "Quick & Easy",
    description: "Complete verification in seconds through gameplay"
  }
] as const;

export const GameHeader = ({ className }: { className?: string }) => {
  const { score, timeRemaining, active, currentGame } = useGame();
  const config = GAME_CONFIGS[currentGame];
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isInIframe = window !== window.parent;

  const getProgressColor = () => {
    if (score >= config.maxScore) return "text-green-500";
    if (timeRemaining <= 10) return "text-red-500";
    return "text-primary";
  };

  if (isHome) {
    return (
      <motion.div 
        key="home-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 md:space-y-8 mb-6 md:mb-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary">
            <Shield className="size-4" />
            GotCHA Challenge
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Play Games, Prove You're Human
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-[600px] mx-auto">
            A next-generation CAPTCHA that replaces boring challenges with fun mini-games. 
            No more clicking on traffic lights!
          </p>
        </div>

        {/* Responsive Features Grid */}
        <div className={cn(
          "grid gap-3",
          // Conditional grid columns based on iframe
          isInIframe 
            ? "grid-cols-1" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-lg border bg-card text-center",
                // Adjust padding based on iframe
                isInIframe ? "p-3" : "p-4 md:p-5"
              )}
            >
              <div className="space-y-2">
                <feature.icon className={cn(
                  "mx-auto text-primary",
                  isInIframe ? "size-5" : "size-6 md:size-8"
                )} />
                <h3 className={cn(
                  "font-semibold",
                  isInIframe ? "text-sm" : "text-base md:text-lg"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "text-muted-foreground",
                  isInIframe ? "text-xs" : "text-sm md:text-base"
                )}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-2xl font-bold">{config.title}</h1>
      {active ? (
        <>
          <div className="flex justify-between font-medium">
            <span>
              Score: {score}/{config.maxScore}
            </span>
            <span className={getProgressColor()}>Time: {timeRemaining}s</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(score / config.maxScore) * 100}%` }}
            />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">{config.description}</p>
      )}
    </div>
  );
};
