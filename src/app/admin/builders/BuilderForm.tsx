"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBuilder, updateBuilder } from "@/app/actions/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Builder } from "@/types/database";

interface BuilderFormProps {
    builder?: Builder;
    onSuccess?: () => void;
}

export function BuilderForm({ builder, onSuccess }: BuilderFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: builder?.name ?? "",
        contact_person: builder?.contact_person ?? "",
        phone: builder?.phone ?? "",
        email: builder?.email ?? "",
        past_performance: builder?.past_performance ?? "",
        trust_score: builder?.trust_score?.toString() ?? "5",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name: form.name.trim(),
            contact_person: form.contact_person.trim() || null,
            phone: form.phone.trim() || null,
            email: form.email.trim() || null,
            past_performance: form.past_performance.trim() || null,
            trust_score: parseInt(form.trust_score, 10) || 5,
        };

        if (builder) {
            const result = await updateBuilder(builder.id, payload);
            if (result.success) {
                toast.success("Builder updated");
                onSuccess?.();
            } else {
                toast.error(result.error);
            }
        } else {
            const result = await createBuilder(payload);
            if (result.success) {
                toast.success("Builder created");
                onSuccess?.();
            } else {
                toast.error(result.error);
            }
        }
        setLoading(false);
    };

    const inputClass = "w-full px-4 py-2 rounded-lg bg-surface-elevated border border-border text-foreground focus:outline-none focus:border-gold/50";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs text-cream-muted block mb-1">Builder Name</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-cream-muted block mb-1">Contact Person</label>
                    <Input value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} className={inputClass} />
                </div>
                <div>
                    <label className="text-xs text-cream-muted block mb-1">Phone</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>
            </div>
            <div>
                <label className="text-xs text-cream-muted block mb-1">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs text-cream-muted block mb-1">Trust Score (1-10)</label>
                <Input type="number" min="1" max="10" value={form.trust_score} onChange={(e) => setForm({ ...form, trust_score: e.target.value })} className={inputClass} />
            </div>
            <div>
                <label className="text-xs text-cream-muted block mb-1">Past Performance</label>
                <textarea
                    value={form.past_performance}
                    onChange={(e) => setForm({ ...form, past_performance: e.target.value })}
                    rows={3}
                    className={`${inputClass} resize-none`}
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full gold-gradient-bg text-accent-foreground">
                {loading ? "Saving..." : builder ? "Update Builder" : "Create Builder"}
            </Button>
        </form>
    );
}
