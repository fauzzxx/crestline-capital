"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Lock, Users, Timer } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    name: "Emerald Heights",
    location: "Gachibowli, Hyderabad",
    discount: 9,
    currentMembers: 8,
    requiredMembers: 10,
    deadline: "2026-04-15",
  },
  {
    id: 2,
    name: "Skyline Residences",
    location: "Kokapet, Hyderabad",
    discount: 7,
    currentMembers: 5,
    requiredMembers: 12,
    deadline: "2026-05-01",
  },
  {
    id: 3,
    name: "The Crest Towers",
    location: "Narsingi, Hyderabad",
    discount: 11,
    currentMembers: 14,
    requiredMembers: 15,
    deadline: "2026-03-30",
  },
];

const CountdownTimer = ({ deadline }: { deadline: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) return;
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

  return (
    <div className="flex gap-3 text-center">
      {[
        { v: timeLeft.days, l: "Days" },
        { v: timeLeft.hours, l: "Hrs" },
        { v: timeLeft.mins, l: "Min" },
      ].map((t) => (
        <div key={t.l} className="bg-maroon-deep rounded-lg px-3 py-1.5">
          <span className="text-lg font-heading font-bold text-gold">{t.v}</span>
          <p className="text-[10px] text-cream-muted uppercase">{t.l}</p>
        </div>
      ))}
    </div>
  );
};

const ActiveOpportunities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="opportunities" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/20 to-background" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
            Curated Opportunities
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            Active <span className="gold-gradient-text">Opportunities</span>
          </h2>
          <p className="text-cream-muted mt-3 max-w-2xl mx-auto">
            Limited preview. Members get full details and can join Capital Pools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {mockProjects.map((project, i) => {
            const progress = (project.currentMembers / project.requiredMembers) * 100;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-6 group hover:gold-glow transition-all duration-500 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-cream-muted text-sm">
                      <MapPin size={14} className="text-gold" />
                      {project.location}
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full gold-gradient-bg text-accent-foreground text-sm font-bold">
                    {project.discount}% Structured Discount
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-cream-muted flex items-center gap-1">
                      <Users size={14} /> Pool Status
                    </span>
                    <span className="text-gold font-medium">
                      {project.currentMembers}/{project.requiredMembers} Locked
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-maroon-dark overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${progress}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                      className="h-full rounded-full gold-gradient-bg"
                    />
                  </div>
                  <p className="text-xs text-cream-muted mt-1.5">
                    {project.requiredMembers - project.currentMembers} more members required
                  </p>
                </div>

                {/* Countdown */}
                <div className="mb-6">
                  <div className="flex items-center gap-1.5 text-sm text-cream-muted mb-2">
                    <Timer size={14} className="text-gold" /> Deal Countdown
                  </div>
                  <CountdownTimer deadline={project.deadline} />
                </div>

                <Link
                  href="/login?redirectTo=/dashboard"
                  className="mt-auto w-full py-3 rounded-lg glass-card gold-border text-gold font-medium hover:gold-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Unlock Full Details (Members Only)
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActiveOpportunities;
