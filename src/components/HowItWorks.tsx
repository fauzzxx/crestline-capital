"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Search, Users, Unlock } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Apply for Membership",
    description: "Submit your profile and investment preferences to join our exclusive network.",
    step: "01",
  },
  {
    icon: Search,
    title: "Access Curated Opportunities",
    description: "Browse handpicked premium residential projects with negotiated terms.",
    step: "02",
  },
  {
    icon: Users,
    title: "Join a Capital Pool",
    description: "Commit to a project pool alongside other verified, serious buyers.",
    step: "03",
  },
  {
    icon: Unlock,
    title: "Unlock Tier Discount",
    description: "When the pool fills, the structured bulk discount is unlocked for all members.",
    step: "04",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 md:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/30 to-background" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
            The Process
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            How <span className="gold-gradient-text">It Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center group"
            >
              <div className="relative mx-auto w-20 h-20 rounded-2xl maroon-gradient-bg flex items-center justify-center mb-6 gold-border group-hover:gold-glow transition-all duration-500">
                <step.icon className="w-8 h-8 text-gold" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gold-gradient-bg text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-heading font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-cream-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
