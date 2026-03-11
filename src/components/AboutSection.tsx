"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Shield, Network } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Building2,
      title: "Structured Capital Pool Model",
      desc: "We aggregate buyer demand into structured pools, enabling institutional-grade negotiation with builders.",
    },
    {
      icon: Shield,
      title: "Private Negotiated Opportunities",
      desc: "Private negotiated opportunities. Terms are exclusive and not available through public channels.",
    },
    {
      icon: Network,
      title: "Membership-Based Network",
      desc: "Only vetted, financially-ready buyers gain access, ensuring seriousness and deal integrity for all parties.",
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={ref}>
      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-6">
            About <span className="gold-gradient-text">Crestline Capital</span>
          </h2>
          <p className="text-cream-muted max-w-2xl mx-auto leading-relaxed">
            We operate a structured Capital Pool model—not a listing portal. Every opportunity
            is privately negotiated and exclusive to our member network.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-8 text-center group hover:gold-glow transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl maroon-gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <f.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                {f.title}
              </h3>
              <p className="text-sm text-cream-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
