import { GameConfig } from "@/types/game";

interface GameProgressProps {
  score: number;
  timeRemaining: number;
  config: GameConfig;
}

export const GameProgress = ({ score, timeRemaining, config }: GameProgressProps) => {
  const getProgressColor = () => {
    if (score >= config.maxScore) return "text-green-500";
    if (timeRemaining <= 10) return "text-red-500";
    return "text-primary";
  };

  return (
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
  );
};
