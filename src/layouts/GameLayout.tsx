import { Outlet } from "react-router-dom";

import { GameHeader } from "@/components/GameHeader";
import { GameProvider } from "@/context";
import { cn } from "@/lib/utils";

export const GameLayout = () => {
  return (
    <GameProvider>
      <div className={cn("min-h-screen w-full bg-gradient-to-b from-background to-muted/20")}>
        <div className={cn("container mx-auto max-w-7xl p-4 md:p-8")}>
          <GameHeader className="mb-6" />
          <main className={cn("rounded-xl border bg-card p-4 shadow-lg md:p-6")}>
            <Outlet />
          </main>
        </div>
      </div>
    </GameProvider>
  );
};
