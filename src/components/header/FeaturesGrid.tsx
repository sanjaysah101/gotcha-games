import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: readonly Feature[];
}

export const FeaturesGrid = ({ features }: FeaturesGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3")}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn("rounded-lg border bg-card p-4 text-center md:p-5")}
        >
          <div className="space-y-2">
            <feature.icon className={cn("mx-auto size-6 text-primary md:size-8")} />
            <h3 className={cn("text-base font-semibold md:text-lg")}>{feature.title}</h3>
            <p className={cn("text-sm text-muted-foreground md:text-base")}>{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
