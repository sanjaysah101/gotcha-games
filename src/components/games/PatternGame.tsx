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
  const { handleScore, active } = useGame();
  const [pattern, setPattern] = useState<PatternStep[]>([]);
  const [userPattern, setUserPattern] = useState<PatternStep[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [hasScored, setHasScored] = useState(false);

  const generatePattern = useCallback(() => {
    const length = 3;
    const newPattern = Array.from({ length }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)].class,
    }));
    setPattern(newPattern);
    setUserPattern([]);
    setIsShowingPattern(true);
    setTimeout(() => setIsShowingPattern(false), 2000);
  }, []);

  const handleColorClick = (color: string) => {
    if (isShowingPattern || isChecking || hasScored) return;

    setUserPattern((prev) => {
      const newPattern = [...prev, { id: prev.length, color }];

      if (newPattern.length === pattern.length) {
        setIsChecking(true);
        const isCorrect = newPattern.every((step, i) => step.color === pattern[i].color);

        setTimeout(() => {
          if (isCorrect && !hasScored) {
            setHasScored(true);
            handleScore();
          } else if (!isCorrect) {
            setUserPattern([]);
          }
          setIsChecking(false);
        }, 500);
      }

      return newPattern;
    });
  };

  useEffect(() => {
    if (active) {
      setHasScored(false);
      generatePattern();
    }
  }, [active, generatePattern]);

  return (
    <BaseGame>
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        <div className="space-y-2 text-center">
          <div className="text-sm text-muted-foreground md:text-base">Remember and repeat the pattern to verify</div>
          <div className="text-xs text-muted-foreground/80">
            {isShowingPattern ? "Memorize the pattern..." : "Now repeat the pattern"}
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          {pattern.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "h-6 w-6 rounded-full transition-all md:h-8 md:w-8",
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
