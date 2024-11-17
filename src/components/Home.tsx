import { HomeHeader } from "@/components/GameHeader";
import { cn } from "@/lib/utils";

import { GameSelector } from "./GameSelector";

export const Home = () => {
  return (
    <div className={cn("min-h-screen w-full bg-gradient-to-b from-background to-muted/20")}>
      <div className={cn("container mx-auto max-w-7xl p-4 md:p-8")}>
        <HomeHeader />
        <main className={cn("rounded-xl border bg-card p-4 shadow-lg md:p-6")}>
          <GameSelector />
        </main>
      </div>
    </div>
  );
};
