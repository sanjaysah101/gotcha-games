import { Gamepad2, Shield, Timer } from "lucide-react";

export const HEADER_FEATURES = [
  {
    icon: Gamepad2,
    title: "Fun Challenges",
    description: "Interactive games that are actually enjoyable to play",
  },
  {
    icon: Shield,
    title: "Secure Verification",
    description: "Effectively prevents bots while being user-friendly",
  },
  {
    icon: Timer,
    title: "Quick & Easy",
    description: "Complete verification in seconds through gameplay",
  },
] as const; 