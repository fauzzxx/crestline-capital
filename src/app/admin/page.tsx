import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Users, UserCheck, Briefcase, UsersRound } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalMembers },
    { count: pendingApprovals },
    { count: activeProjects },
    { count: poolParticipants },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("membership_status", "approved"),
    supabase.from("membership_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("projects").select("id", { count: "exact", head: true }).in("status", ["open", "unlocked"]),
    supabase.from("pool_members").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { title: "Total Members", value: totalMembers ?? 0, icon: Users, href: "/admin/members" },
    { title: "Pending Approvals", value: pendingApprovals ?? 0, icon: UserCheck, href: "/admin/members?status=pending" },
    { title: "Active Projects", value: activeProjects ?? 0, icon: Briefcase, href: "/admin/projects" },
    { title: "Pool Participants", value: poolParticipants ?? 0, icon: UsersRound, href: "/admin/pools" },
  ];

  return (
    <div className="section-container">
      <h1 className="text-2xl font-heading font-bold mb-8">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ title, value, icon: Icon, href }) => (
          <Link key={href} href={href}>
            <div className="glass-card p-6 rounded-xl border border-border hover:border-gold/30 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cream-muted">{title}</p>
                  <p className="text-2xl font-heading font-bold text-foreground mt-1">{value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg maroon-gradient-bg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
