import { createBrowserRouter } from "react-router-dom";

import { GameSelector } from "@/components/GameSelector";
import { Layout } from "@/components/Layout";
import { ClickGame } from "@/components/games/ClickGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { PatternGame } from "@/components/games/PatternGame";
import { PuzzleGame } from "@/components/games/PuzzleGame";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
]);
