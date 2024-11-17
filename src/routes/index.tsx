import { createBrowserRouter } from "react-router-dom";

import { GameSelector } from "@/components/GameSelector";
import { CaptchaWrapper } from "@/components/captcha/CaptchaWrapper";
import { ClickGame, MemoryGame, PatternGame, PuzzleGame } from "@/components/games";
import { CaptchaLayout } from "@/layouts/CaptchaLayout";
import { GameLayout } from "@/layouts/GameLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GameLayout />,
    children: [
      {
        path: "/",
        element: <GameSelector />,
      },
      {
        path: "click",
        element: <ClickGame />,
      },
      {
        path: "pattern",
        element: <PatternGame />,
      },
      {
        path: "memory",
        element: <MemoryGame />,
      },
      {
        path: "puzzle",
        element: <PuzzleGame />,
      },
    ],
  },
  {
    path: "/games",
    element: <CaptchaLayout />,
    children: [
      {
        path: "",
        element: <CaptchaWrapper />,
      },
    ],
  },
]);
