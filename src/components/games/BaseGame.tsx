import { useCallback, useEffect } from "react";

import { onChallengeError, onChallengeExpired, onChallengeResponse } from "@gotcha-widget/lib";
import { Gamepad2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GAME_CONFIGS } from "@/config/games";
import { useGame } from "@/hooks/useGame";

export const BaseGame = ({ children }: { children: React.ReactNode }) => {
  const { active, score, timeRemaining, currentGame, resetGame, setActive } = useGame();

  const handleError = useCallback(async () => {
    try {
      await onChallengeError();
      resetGame();
    } catch {
      resetGame();
    }
  }, [resetGame]);

  const handleGameComplete = useCallback(async () => {
    const config = GAME_CONFIGS[currentGame];
    const success = score >= config.maxScore;

    try {
      await onChallengeResponse(success);
      resetGame();
    } catch {
      await handleError();
    }
  }, [currentGame, score, resetGame, handleError]);

  const handleGameExpired = useCallback(async () => {
    try {
      await onChallengeExpired();
      resetGame();
    } catch {
      await handleError();
    }
  }, [handleError, resetGame]);

  useEffect(() => {
    if (!active || timeRemaining > 0) return;
    void handleGameExpired();
  }, [active, handleGameExpired, timeRemaining]);

  useEffect(() => {
    if (!active) return;
    const config = GAME_CONFIGS[currentGame];
    if (score >= config.maxScore) {
      void handleGameComplete();
    }
  }, [active, score, currentGame, handleGameComplete]);

  if (!active) {
    return (
      <div className="flex min-h-[200px] items-center justify-center p-4">
        <Button onClick={() => setActive(true)} size={"default"} className="w-full max-w-[200px] gap-2">
          <Gamepad2 className="size-4" />
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex-1">{children}</div>
      <Button onClick={() => void handleError()} variant="outline" size="sm" className="mx-auto w-full max-w-[200px]">
        Cancel
      </Button>
    </div>
  );
};
