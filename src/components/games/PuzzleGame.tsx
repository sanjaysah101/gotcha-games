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
  const size = 2; // Fixed 2x2 grid

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
      <div className="space-y-4">
        <div className="text-center text-xs text-muted-foreground md:text-sm">Arrange the numbers in order</div>
        <div
          className="mx-auto grid aspect-square w-full max-w-[200px] gap-2"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          }}
        >
          <AnimatePresence>
            {Array.from({ length: size * size }).map((_, index) => {
              const tile = tiles.find((t) => t.position === index);
              return (
                <motion.button
                  key={tile?.id ?? index}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "aspect-square rounded-lg text-xl font-bold transition-colors",
                    tile?.value !== null ? "bg-primary hover:bg-primary/90" : "bg-muted",
                    isShuffling && "pointer-events-none"
                  )}
                  onClick={() => tile?.value !== null && handleTileClick(tile!)}
                >
                  {tile?.value}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </BaseGame>
  );
};
