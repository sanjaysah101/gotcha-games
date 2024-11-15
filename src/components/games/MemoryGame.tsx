import { useCallback, useEffect, useState } from "react";

import { useGame } from "@/hooks/useGame";
import { cn } from "@/lib/utils";

import { BaseGame } from "./BaseGame";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}
const symbols = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎸", "🎺", "🎨", "🎭"];

export const MemoryGame = () => {
  const { handleScore, active, score } = useGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const initializeCards = useCallback(() => {
    const pairCount = Math.min(6 + score, 10); // Increase number of pairs with score
    const gameSymbols = symbols.slice(0, pairCount);
    const cardPairs = [...gameSymbols, ...gameSymbols]
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(cardPairs);
    setFlippedCards([]);
  }, [score]);

  const handleCardClick = (cardId: number) => {
    if (isChecking || flippedCards.length >= 2) return;

    setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)));

    setFlippedCards((prev) => {
      const newFlipped = [...prev, cardId];

      if (newFlipped.length === 2) {
        setIsChecking(true);

        const [first, second] = newFlipped.map((id) => cards.find((card) => card.id === id)!);

        setTimeout(
          () => {
            if (first.value === second.value) {
              setCards((prev) =>
                prev.map((card) => (newFlipped.includes(card.id) ? { ...card, isMatched: true } : card))
              );
              handleScore();
            } else {
              setCards((prev) =>
                prev.map((card) => (newFlipped.includes(card.id) ? { ...card, isFlipped: false } : card))
              );
            }
            setFlippedCards([]);
            setIsChecking(false);
          },
          1000 - score * 100
        ); // Decrease reveal time as score increases
      }

      return newFlipped;
    });
  };

  useEffect(() => {
    if (active) {
      initializeCards();
    }
  }, [active, initializeCards]);

  return (
    <BaseGame>
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            className={cn(
              "aspect-square w-full rounded-lg border-2 transition-all duration-300",
              card.isFlipped || card.isMatched ? "rotate-0 bg-primary" : "rotate-180 bg-muted",
              card.isMatched && "opacity-50",
              !card.isFlipped && !card.isMatched && "hover:bg-muted/80"
            )}
            onClick={() => !card.isFlipped && !card.isMatched && handleCardClick(card.id)}
            disabled={isChecking || card.isFlipped || card.isMatched}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-base md:text-2xl">{card.value}</span>
            )}
          </button>
        ))}
      </div>
    </BaseGame>
  );
};
