"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  deadline: string | null;
  className?: string;
}

export function CountdownTimer({ deadline, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    if (!deadline) return;
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, [deadline]);

  if (!deadline) return null;

  return (
    <div className={`flex gap-3 text-center ${className}`}>
      {[
        { v: timeLeft.days, l: "Days" },
        { v: timeLeft.hours, l: "Hrs" },
        { v: timeLeft.mins, l: "Min" },
      ].map((t) => (
        <div key={t.l} className="bg-maroon-deep rounded-lg px-3 py-1.5 min-w-[3rem]">
          <div className="text-gold font-semibold tabular-nums">{t.v}</div>
          <div className="text-xs text-cream-muted">{t.l}</div>
        </div>
      ))}
    </div>
  );
}
