import { useCallback, useEffect, useState } from "react";

import { useGame } from "@/hooks/useGame";
import { cn } from "@/lib/utils";

import { BaseGame } from "./BaseGame";

interface PatternStep {
  id: number;
  color: string;
}

const colors = [
  { name: "red", class: "bg-red-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "green", class: "bg-green-500" },
  { name: "yellow", class: "bg-yellow-500" },
];

export const PatternGame = () => {
  const { handleScore, active, score } = useGame();
  const [pattern, setPattern] = useState<PatternStep[]>([]);
  const [userPattern, setUserPattern] = useState<PatternStep[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const generatePattern = useCallback(() => {
    const length = Math.min(3 + score, 7); // Pattern length increases with score
    const newPattern = Array.from({ length }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)].class,
    }));
    setPattern(newPattern);
    setUserPattern([]);
    setIsShowingPattern(true);

    // Show pattern with increasing speed based on score
    const showTime = Math.max(3000 - score * 300, 1500);
    setTimeout(() => setIsShowingPattern(false), showTime);
  }, [score]);

  const handleColorClick = (color: string) => {
    if (isShowingPattern || isChecking) return;

    setUserPattern((prev) => {
      const newPattern = [...prev, { id: prev.length, color }];

      // Check pattern when user has input the same length as the target
      if (newPattern.length === pattern.length) {
        setIsChecking(true);
        const isCorrect = newPattern.every((step, i) => step.color === pattern[i].color);

        setTimeout(() => {
          if (isCorrect) {
            handleScore();
            generatePattern();
          } else {
            setUserPattern([]);
          }
          setIsChecking(false);
        }, 500);
      }

      return newPattern;
    });
  };

  // Start new pattern when game becomes active
  useEffect(() => {
    if (active) {
      generatePattern();
    }
  }, [active, generatePattern]);

  return (
    <BaseGame>
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        <div className="flex justify-center space-x-3">
          {pattern.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-4 w-4 md:h-6 md:w-6 rounded-full transition-all",
                isShowingPattern ? step.color : "bg-muted",
                userPattern[index]?.color
              )}
            />
          ))}
        </div>

        <div className="grid w-full max-w-xs grid-cols-2 gap-3 md:gap-4">
          {colors.map(({ name, class: colorClass }) => (
            <button
              key={name}
              className={cn(
                "aspect-square rounded-lg transition-all",
                colorClass,
                "hover:opacity-90 active:scale-95",
                (isShowingPattern || isChecking) && "pointer-events-none opacity-50"
              )}
              onClick={() => handleColorClick(colorClass)}
            />
          ))}
        </div>
      </div>
    </BaseGame>
  );
};
