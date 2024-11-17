import { createBrowserRouter } from "react-router-dom";

import { GameSelector } from "@/components/GameSelector";
import { CaptchaWrapper } from "@/components/captcha/CaptchaWrapper";
import { ClickGame, MemoryGame, PatternGame, PuzzleGame } from "@/components/games";
import { CaptchaLayout } from "@/layouts/CaptchaLayout";
import { GameLayout } from "@/layouts/GameLayout";

import { Home } from "../components/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <GameLayout />,
    children: [
      {
        path: "",
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
    path: "/random",
    element: <CaptchaLayout />,
    children: [
      {
        path: "",
        element: <CaptchaWrapper />,
      },
    ],
  },
]);
