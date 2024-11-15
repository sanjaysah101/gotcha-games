import { useCallback, useEffect } from "react";

import { onChallengeError, onChallengeExpired, onChallengeResponse } from "@gotcha-widget/lib";

import { Button } from "@/components/ui/button";
import { useGame } from "@/hooks/useGame";

import { GAME_CONFIGS } from "../../config/games";

export const BaseGame = ({ children }: { children: React.ReactNode }) => {
  const { active, score, timeRemaining, currentGame, resetGame, setActive } = useGame();
  const isInIframe = window !== window.parent;

  const handleGameComplete = useCallback(async () => {
    const config = GAME_CONFIGS[currentGame];
    const success = score >= config.maxScore;

    // Get secret from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret") || "api_test_key";

    await onChallengeResponse(success);
    resetGame();
  }, [currentGame, resetGame, score]);

  const handleGameExpired = useCallback(async () => {
    await onChallengeExpired();
    resetGame();
  }, [resetGame]);

  const handleError = useCallback(async () => {
    await onChallengeError();
    resetGame();
  }, [resetGame]);

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
      <div className="flex min-h-[200px] items-center justify-center">
        <Button onClick={() => setActive(true)} className="w-full max-w-xs" size={isInIframe ? "default" : "lg"}>
          Start Challenge
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex-1">{children}</div>
      <Button
        onClick={() => void handleError()}
        variant="destructive"
        size={isInIframe ? "default" : "lg"}
        className="mx-auto w-full max-w-xs"
      >
        Give Up
      </Button>
    </div>
  );
};
