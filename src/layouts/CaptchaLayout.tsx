import { Outlet } from "react-router-dom";

import { GameProvider } from "@/context";
import { cn } from "@/lib/utils";

export const CaptchaLayout = () => {
  return (
    <GameProvider>
      <div className={cn("w-full bg-background p-4")}>
        <main className={cn("mx-auto w-full max-w-[400px]")}>
          <Outlet />
        </main>
      </div>
    </GameProvider>
  );
};
