"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, UserCheck, Zap, Lock } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Assured 10–15 Unit Closures",
    description: "Guaranteed volume commitments that builders can rely on for planning.",
  },
  {
    icon: UserCheck,
    title: "Pre-Qualified Buyers",
    description: "Every member is vetted for financial readiness and genuine buying intent.",
  },
  {
    icon: Zap,
    title: "Faster Inventory Movement",
    description: "Accelerated inventory movement that benefits both builders and buyers.",
  },
  {
    icon: Lock,
    title: "Controlled Deal Distribution",
    description: "Structured, exclusive distribution ensures deal integrity and confidentiality.",
  },
];

const stats = [
  { label: "Members Enrolled", value: 500, suffix: "+" },
  { label: "Projects Sourced", value: 12, suffix: "" },
  { label: "Avg. Discount Unlocked", value: 8, suffix: "%" },
  { label: "Capital Pooled", value: 120, suffix: "Cr+" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-heading font-bold gold-gradient-text">
      {count}{suffix}
    </span>
  );
};

const WhyBuilders = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
            Builder Partnerships
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4">
            Why Builders <span className="gold-gradient-text">Work With Us</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 group hover:gold-glow transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl maroon-gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <b.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2 text-foreground">
                {b.title}
              </h3>
              <p className="text-sm text-cream-muted leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card p-8 md:p-12 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-cream-muted mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBuilders;
