import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useGame } from "@/hooks/useGame";
import { isAdjacent, isSolvable, isSolved } from "@/lib/puzzle";
import { cn } from "@/lib/utils";

import { BaseGame } from "./BaseGame";

interface Tile {
  id: number;
  value: number | null;
  position: number;
}

export const PuzzleGame = () => {
  const { handleScore, active } = useGame();
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const size = 3; // Changed from 2 to 3 for a 3x3 grid

  const initializePuzzle = useCallback(() => {
    const totalTiles = size * size;
    let numbers: (number | null)[] = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    numbers.push(null);

    // Ensure puzzle is solvable and not already solved
    do {
      numbers = numbers.sort(() => Math.random() - 0.5);
    } while (!isSolvable(numbers as number[]) || isSolved(numbers as number[]));

    setTiles(
      numbers.map((value, index) => ({
        id: value ?? totalTiles,
        value,
        position: index,
      }))
    );
    setMoves(0);
  }, []);

  const handleTileClick = (clickedTile: Tile) => {
    if (isShuffling) return;

    const emptyTile = tiles.find((tile) => tile.value === null)!;
    if (!isAdjacent(clickedTile.position, emptyTile.position, size)) return;

    setTiles((prev) =>
      prev.map((tile) => {
        if (tile.id === clickedTile.id) return { ...tile, position: emptyTile.position };
        if (tile.id === emptyTile.id) return { ...tile, position: clickedTile.position };
        return tile;
      })
    );

    setMoves((prev) => prev + 1);
  };

  // Check for puzzle completion
  useEffect(() => {
    if (!active || moves === 0) return;

    const values = tiles.sort((a, b) => a.position - b.position).map((tile) => tile.value);

    if (isSolved(values as number[])) {
      handleScore();
    }
  }, [tiles, active, moves, handleScore]);

  // Initialize puzzle when game becomes active
  useEffect(() => {
    if (active) {
      setIsShuffling(true);
      initializePuzzle();
      setTimeout(() => setIsShuffling(false), 500);
    }
  }, [active, initializePuzzle]);

  return (
    <BaseGame>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="text-sm text-muted-foreground md:text-base">Arrange the numbers in order</div>
          <div className="text-xs text-muted-foreground/80">Moves: {moves}</div>
        </div>

        <div
          className="mx-auto grid aspect-square w-full max-w-[300px] gap-2 rounded-xl bg-muted/30 p-4"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence mode="popLayout">
            {Array.from({ length: size * size }).map((_, index) => {
              const tile = tiles.find((t) => t.position === index);
              return (
                <motion.button
                  key={tile?.id ?? index}
                  layout="position"
                  initial={false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "tween",
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "aspect-square rounded-xl text-2xl font-bold",
                    "shadow-md",
                    tile?.value !== null ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted/50",
                    isShuffling && "pointer-events-none",
                    "transition-transform duration-150 hover:-translate-y-0.5"
                  )}
                  onClick={() => tile?.value !== null && handleTileClick(tile!)}
                >
                  {tile?.value}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="text-center text-xs text-muted-foreground/70">
          Click tiles adjacent to the empty space to move them
        </div>
      </div>
    </BaseGame>
  );
};
