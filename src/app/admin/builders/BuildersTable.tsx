"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBuilder } from "@/app/actions/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ExternalLink } from "lucide-react";
import type { Builder } from "@/types/database";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BuilderForm } from "./BuilderForm";

interface BuildersTableProps {
    builders: Builder[];
}

export function BuildersTable({ builders }: BuildersTableProps) {
    const router = useRouter();
    const [editingBuilder, setEditingBuilder] = useState<Builder | null>(null);
    const [open, setOpen] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will not delete projects linked to this builder.")) return;
        const result = await deleteBuilder(id);
        if (result.success) {
            toast.success("Builder deleted");
            router.refresh();
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-border text-cream-muted text-sm font-medium">
                        <th className="py-4 px-4 font-normal">Builder Name</th>
                        <th className="py-4 px-4 font-normal">Contact</th>
                        <th className="py-4 px-4 font-normal text-center">Trust Score</th>
                        <th className="py-4 px-4 font-normal">Created</th>
                        <th className="py-4 px-4 font-normal text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {builders.map((builder) => (
                        <tr key={builder.id} className="border-b border-border/50 group hover:bg-surface-elevated/30 transition-colors">
                            <td className="py-4 px-4 font-medium text-foreground">{builder.name}</td>
                            <td className="py-4 px-4 text-cream-muted">
                                {builder.contact_person && <div>{builder.contact_person}</div>}
                                {builder.phone && <div className="text-xs opacity-70">{builder.phone}</div>}
                            </td>
                            <td className="py-4 px-4 text-center">
                                <span className="px-2 py-1 rounded bg-gold/10 text-gold text-xs font-semibold">
                                    {builder.trust_score}/10
                                </span>
                            </td>
                            <td className="py-4 px-4 text-cream-muted whitespace-nowrap">
                                {new Date(builder.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Dialog open={open && editingBuilder?.id === builder.id} onOpenChange={(val) => {
                                        setOpen(val);
                                        if (!val) setEditingBuilder(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 hover:text-gold"
                                                onClick={() => {
                                                    setEditingBuilder(builder);
                                                    setOpen(true);
                                                }}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Builder</DialogTitle>
                                            </DialogHeader>
                                            <BuilderForm
                                                builder={builder}
                                                onSuccess={() => {
                                                    setOpen(false);
                                                    setEditingBuilder(null);
                                                    router.refresh();
                                                }}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                        onClick={() => handleDelete(builder.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {builders.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-12 text-center text-cream-muted italic">
                                No builders found. Create your first builder to get started.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
