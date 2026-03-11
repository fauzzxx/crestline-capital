"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenureMonths, setTenureMonths] = useState("");

  const emi = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = parseInt(tenureMonths, 10) || 0;
    if (P <= 0 || n <= 0) return null;
    if (r === 0) return P / n;
    const e = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(e * 100) / 100;
  }, [principal, rate, tenureMonths]);

  const totalPayment = emi != null && tenureMonths ? emi * parseInt(tenureMonths, 10) : null;
  const totalInterest = totalPayment != null && principal ? totalPayment - parseFloat(principal) : null;

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-heading">EMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-cream-muted">Property / Loan Amount (₹)</Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 10000000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        <div>
          <Label className="text-cream-muted">Interest Rate (% per annum)</Label>
          <Input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 8.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        <div>
          <Label className="text-cream-muted">Loan Tenure (months)</Label>
          <Input
            type="number"
            min="1"
            placeholder="e.g. 240"
            value={tenureMonths}
            onChange={(e) => setTenureMonths(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        {emi != null && (
          <div className="pt-4 border-t border-border space-y-1">
            <p className="text-sm text-cream-muted">Monthly EMI</p>
            <p className="text-2xl font-heading font-bold text-gold">₹{emi.toLocaleString()}</p>
            {totalPayment != null && (
              <p className="text-sm text-cream-muted">
                Total payment: ₹{totalPayment.toLocaleString()}
                {totalInterest != null && (
                  <span> (Interest: ₹{totalInterest.toLocaleString()})</span>
                )}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
