import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-body";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="section-container max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Get in <span className="gold-gradient-text">Touch</span>
            </h1>
            <p className="text-cream-muted">We'd love to hear from you.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="glass-card p-6 flex items-start gap-4">
              <Mail className="text-gold mt-1" size={20} />
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Email</h3>
                <p className="text-sm text-cream-muted">info@crestlinecapital.in</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <MapPin className="text-gold mt-1" size={20} />
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">Office</h3>
                <p className="text-sm text-cream-muted">Financial District, Hyderabad</p>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6"
          >
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your Name" />
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="Email Address" />
            <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} placeholder="Your Message" />
            <button type="submit" disabled={submitting} className="w-full py-4 rounded-lg gold-gradient-bg text-accent-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50">
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
