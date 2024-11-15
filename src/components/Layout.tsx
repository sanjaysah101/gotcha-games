import { Outlet } from "react-router-dom";

import { GameProvider } from "@/context/GameProvider";
import { cn } from "@/lib/utils";

import { GameHeader } from "./GameHeader";

export const Layout = () => {
  const isInIframe = window !== window.parent;

  return (
    <GameProvider>
      <div
        className={cn(
          "bg-gradient-to-b from-background to-muted/20",
          isInIframe 
            ? "h-[580px] w-[400px] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20" 
            : "min-h-screen w-full"
        )}
      >
        <div 
          className={cn(
            isInIframe 
              ? "h-full p-4" 
              : "container mx-auto max-w-7xl p-4 md:p-8"
          )}
        >
          <GameHeader className={isInIframe ? "mb-4" : "mb-6"} />
          <main 
            className={cn(
              "rounded-xl border bg-card shadow-lg",
              isInIframe ? "p-4" : "p-4 md:p-6"
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </GameProvider>
  );
};
