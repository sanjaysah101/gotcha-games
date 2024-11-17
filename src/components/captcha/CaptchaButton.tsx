import { motion } from "framer-motion";
import { Gamepad2, Shield } from "lucide-react";

import { Button } from "../ui/button";

export const CaptchaButton = ({ onClick }: { onClick: (value: boolean) => void }) => (
  <motion.div key="captcha-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Shield className="size-4 text-primary" />
          I'm not a robot
        </div>
        <div className="mt-1 text-xs text-muted-foreground">Verify through quick gameplay</div>
      </div>
      <Button onClick={() => onClick(true)} size="sm" className="gap-2">
        <Gamepad2 className="size-4" />
        Verify
      </Button>
    </div>

    <div className="mt-3 flex items-center gap-2 border-t pt-3">
      <div className="size-4 rounded-full bg-primary/10 p-0.5">
        <img src="/gotcha-logo.png" alt="GotCHA" className="size-full object-contain" />
      </div>
      <span className="text-xs text-muted-foreground">Protected by GotCHA Games</span>
    </div>
  </motion.div>
);
