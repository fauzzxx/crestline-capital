"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { sendPhoneOtp, verifyPhoneOtp } from "@/app/actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectTo") || "/dashboard";

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Enter your phone number");
      return;
    }
    setLoading(true);
    const result = await sendPhoneOtp(phone.trim());
    setLoading(false);
    if (result.success) {
      setStep("otp");
      toast.success("OTP sent to your phone");
    } else {
      toast.error(result.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit code");
      return;
    }
    setLoading(true);
    const result = await verifyPhoneOtp(phone, otp);
    setLoading(false);
    if (result.success) {
      // Only route to admin when the user was trying to reach an admin URL.
      // If they just clicked "Log in" (default redirect), keep them on the normal member flow.
      const target = result.role === "admin" && redirectTo.startsWith("/admin") ? "/admin" : redirectTo;
      router.push(target);
      router.refresh();
    } else {
      toast.error(result.error || "Invalid code");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-surface-elevated border border-border text-foreground placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-body";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="section-container max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-heading font-bold mb-2">
              Member <span className="gold-gradient-text">Login</span>
            </h1>
            <p className="text-cream-muted text-sm">
              Sign in with your phone number. We&apos;ll send you a one-time code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-2xl"
          >
            {step === "phone" ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-sm text-cream-muted mb-1.5 block">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-gradient-bg text-accent-foreground hover:opacity-90"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="text-sm text-cream-muted mb-2 block">Enter 6-digit code</label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup className="gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot key={i} index={i} className="rounded-lg border border-border bg-surface-elevated text-foreground" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full gold-gradient-bg text-accent-foreground hover:opacity-90"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="w-full text-sm text-cream-muted hover:text-gold transition-colors"
                >
                  Use a different number
                </button>
              </form>
            )}
          </motion.div>

          <p className="text-center text-sm text-cream-muted mt-6">
            Don&apos;t have membership?{" "}
            <Link href="/membership" className="text-gold hover:underline">
              Request Membership
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
