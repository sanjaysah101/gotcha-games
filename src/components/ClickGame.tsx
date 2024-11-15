import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface ClickGameProps {
  onScore: () => void;
  gameActive: boolean;
  score: number;
}

export const ClickGame = ({ onScore, gameActive, score }: ClickGameProps) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);

  // Calculate difficulty based on score
  const getDifficultySettings = useCallback(() => {
    const baseSize = 32; // Base size in pixels
    const baseSpeed = 2000; // Base movement speed in ms

    return {
      size: Math.max(baseSize - score * 2, 16), // Decrease size as score increases
      speed: Math.max(baseSpeed - score * 150, 800), // Increase speed as score increases
      maxTargets: Math.min(2 + Math.floor(score / 2), 5), // Increase max targets
    };
  }, [score]);

  // Generate random position
  const generatePosition = () => ({
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
  });

  // Click effect animation
  const showClickEffect = (x: number, y: number) => {
    setLastClick({ x, y });
    setTimeout(() => setLastClick(null), 500);
  };

  // Handle target click
  const handleTargetClick = useCallback(
    (e: React.MouseEvent, targetId: number) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      showClickEffect(x, y);
      setTargets((prev) => prev.filter((t) => t.id !== targetId));
      onScore();
    },
    [onScore]
  );

  // Spawn targets
  useEffect(() => {
    if (!gameActive) {
      setTargets([]);
      return;
    }

    const { maxTargets, size, speed } = getDifficultySettings();

    const spawnInterval = setInterval(() => {
      if (targets.length < maxTargets) {
        const { x, y } = generatePosition();
        setTargets((prev) => [
          ...prev,
          {
            id: Date.now(),
            x,
            y,
            size,
            speed,
          },
        ]);
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, [gameActive, targets.length, getDifficultySettings]);

  // Move targets
  useEffect(() => {
    if (!gameActive) return;

    const moveTargets = () => {
      setTargets((prev) =>
        prev.map((target) => ({
          ...target,
          ...generatePosition(),
        }))
      );
    };

    const intervals = targets.map((target) => {
      return setInterval(moveTargets, target.speed);
    });

    return () => intervals.forEach(clearInterval);
  }, [gameActive, targets]);

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-muted">
      {targets.map((target) => (
        <button
          key={target.id}
          onClick={(e) => handleTargetClick(e, target.id)}
          className={cn(
            "absolute rounded-full bg-primary transition-all duration-300",
            "hover:bg-primary/80 active:scale-95",
            "animate-pulse shadow-lg"
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
      {lastClick && (
        <div
          className="absolute size-8 animate-ping rounded-full bg-primary/50"
          style={{
            left: lastClick.x,
            top: lastClick.y,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
};
