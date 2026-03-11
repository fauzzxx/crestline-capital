"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  required: number;
  className?: string;
}

export function ProgressBar({ current, required, className = "" }: ProgressBarProps) {
  const value = required > 0 ? Math.min(100, (current / required) * 100) : 0;

  return (
    <div className={className}>
      <div className="h-2 w-full rounded-full bg-maroon-deep overflow-hidden">
        <motion.div
          className="h-full rounded-full gold-gradient-bg"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="text-sm text-cream-muted mt-1">
        {current} / {required} Members Joined
      </p>
      {current < required && (
        <p className="text-xs text-gold mt-0.5">
          {required - current} More Member{required - current !== 1 ? "s" : ""} Required to Unlock Discount
        </p>
      )}
    </div>
  );
}
