import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { GameSelector } from "../GameSelector";
import { CaptchaButton } from "./CaptchaButton";

export const CaptchaWrapper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[400px]">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <CaptchaButton onClick={setIsExpanded} />
        ) : (
          <motion.div
            key="game-container"
            initial={{ opacity: 0, height: 100 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 100 }}
          >
            <GameSelector random />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
