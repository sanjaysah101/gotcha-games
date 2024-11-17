import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export const FadeIn = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={fadeIn} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
    {children}
  </motion.div>
);

export const SlideUp = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={slideUp} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
    {children}
  </motion.div>
);
