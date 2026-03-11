"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { submitContactMessage } from "@/app/actions/contact";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitContactMessage(form);
    setSubmitting(false);
    if (result.success) {
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error(result.error ?? "Failed to send message. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-body";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="glass-card p-8 rounded-2xl space-y-6"
    >
      <input
        type="text"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={inputClass}
        placeholder="Your Name"
      />
      <input
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={inputClass}
        placeholder="Email Address"
      />
      <textarea
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={inputClass}
        placeholder="Your Message"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-lg gold-gradient-bg text-accent-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </motion.form>
  );
}
