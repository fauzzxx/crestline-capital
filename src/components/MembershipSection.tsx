"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { MembershipForm } from "@/app/membership/MembershipForm";

export default function MembershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="membership-form" className="py-24 md:py-32 relative" ref={ref}>
      <div className="relative z-10 section-container max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-[0.2em] font-medium">
            Join the Member Network
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-4">
            Request <span className="gold-gradient-text">Membership</span>
          </h2>
          <p className="text-cream-muted">
            Submit your profile. Approved members get access to curated opportunities and Capital Pools.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MembershipForm />
        </motion.div>
      </div>
    </section>
  );
}
