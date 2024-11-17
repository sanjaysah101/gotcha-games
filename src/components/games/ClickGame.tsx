import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useGame } from "@/hooks/useGame";
import { cn } from "@/lib/utils";

import { BaseGame } from "./BaseGame";

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"];

export const ClickGame = () => {
  const { handleScore, active, score } = useGame();
  const [targets, setTargets] = useState<Target[]>([]);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);
  const [combo, setCombo] = useState(0);

  // Simplified difficulty settings for CAPTCHA
  const getDifficultySettings = useCallback(
    () => ({
      size: 40, // Larger, fixed size for better clickability
      speed: 1500, // Consistent, moderate speed
      maxTargets: 2, // Maximum 2 targets at once
    }),
    []
  );

  const generatePosition = () => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  });

  const handleTargetClick = useCallback(
    (e: React.MouseEvent, targetId: number) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setLastClick({ x, y });
      setTimeout(() => setLastClick(null), 500);

      setTargets((prev) => prev.filter((t) => t.id !== targetId));
      setCombo((prev) => prev + 1);
      handleScore();
    },
    [handleScore]
  );

  // Reset combo if no click for 2 seconds
  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => setCombo(0), 2000);
    return () => clearTimeout(timeout);
  }, [combo, active]);

  // Spawn targets
  useEffect(() => {
    if (!active) {
      setTargets([]);
      return;
    }

    const { maxTargets, size, speed } = getDifficultySettings();

    const spawnInterval = setInterval(() => {
      if (targets.length < maxTargets) {
        setTargets((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...generatePosition(),
            size,
            speed,
            color: colors[Math.floor(Math.random() * colors.length)],
          },
        ]);
      }
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [active, targets.length, getDifficultySettings]);

  // Move targets
  useEffect(() => {
    if (!active) return;

    const intervals = targets.map((target) => {
      return setInterval(() => {
        setTargets((prev) => prev.map((t) => (t.id === target.id ? { ...t, ...generatePosition() } : t)));
      }, target.speed);
    });

    return () => intervals.forEach(clearInterval);
  }, [active, targets]);

  return (
    <BaseGame>
      <div className="space-y-3">
        <div className="text-center text-xs text-muted-foreground">
          Click the targets to verify ({score}/3)
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted/50 backdrop-blur-sm">
          <AnimatePresence>
            {targets.map((target) => (
              <motion.button
                key={target.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={(e) => handleTargetClick(e, target.id)}
                className={cn(
                  "absolute rounded-full transition-all duration-300",
                  target.color,
                  "hover:brightness-110 active:scale-95",
                  "shadow-lg ring-2 ring-white/20"
                )}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </AnimatePresence>

          {lastClick && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              className="absolute size-8 rounded-full bg-white/30"
              style={{
                left: lastClick.x,
                top: lastClick.y,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </div>
      </div>
    </BaseGame>
  );
};
