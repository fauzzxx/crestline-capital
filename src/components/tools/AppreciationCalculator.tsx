"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AppreciationCalculator() {
  const [price, setPrice] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const futureValue = useMemo(() => {
    const P = parseFloat(price) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseInt(years, 10) || 0;
    if (P <= 0 || n <= 0) return null;
    const fv = P * Math.pow(1 + r, n);
    return Math.round(fv * 100) / 100;
  }, [price, rate, years]);

  return (
    <Card className="glass-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-heading">Appreciation Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-cream-muted">Current Property Price (₹)</Label>
          <Input
            type="number"
            min="0"
            placeholder="e.g. 10000000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        <div>
          <Label className="text-cream-muted">Annual Appreciation Rate (%)</Label>
          <Input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 6"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        <div>
          <Label className="text-cream-muted">Years</Label>
          <Input
            type="number"
            min="1"
            placeholder="e.g. 5"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-1 bg-surface-elevated border-border"
          />
        </div>
        {futureValue != null && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-cream-muted">Estimated Future Value</p>
            <p className="text-2xl font-heading font-bold text-gold">₹{futureValue.toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
