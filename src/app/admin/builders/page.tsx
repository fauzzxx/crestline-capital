import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminBuildersPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, project_name, builder_name, location, status, discount_percentage, current_members_joined, minimum_members_required");

  // Aggregate by builder_name
  const builderMap = new Map<string, { name: string; projects: typeof projects }>();
  (projects ?? []).forEach((p) => {
    const name = p.builder_name || "Unknown";
    if (!builderMap.has(name)) builderMap.set(name, { name, projects: [] });
    builderMap.get(name)!.projects!.push(p);
  });
  const builders = Array.from(builderMap.values());

  return (
    <div className="section-container">
      <h1 className="text-2xl font-heading font-bold mb-2">Builder Management</h1>
      <p className="text-cream-muted text-sm mb-8">
        Builders are derived from active projects. Contact details and commission structure can be managed per project.
      </p>

      <div className="space-y-6">
        {builders.map((b) => (
          <div key={b.name} className="glass-card p-6 rounded-xl border border-border">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-heading font-semibold text-foreground">{b.name}</h2>
              <span className="text-sm text-cream-muted bg-surface-elevated px-3 py-1 rounded-full">
                {b.projects?.length ?? 0} active project{b.projects?.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-xs text-cream-muted mb-4">
              Contact details, negotiated discount structure, and trust score can be added in a future phase.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-cream-muted text-left">
                    <th className="py-2 pr-4">Project</th>
                    <th className="py-2 pr-4">Location</th>
                    <th className="py-2 pr-4">Discount</th>
                    <th className="py-2 pr-4">Pool</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {(b.projects ?? []).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-4">
                        <Link href={`/admin/projects/${p.id}`} className="text-gold hover:underline">
                          {p.project_name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-cream-muted">{p.location}</td>
                      <td className="py-3 pr-4">{p.discount_percentage}%</td>
                      <td className="py-3 pr-4">{p.current_members_joined} / {p.minimum_members_required}</td>
                      <td className="py-3 capitalize">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {builders.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl border border-dashed border-border">
          <p className="text-cream-muted">No builders yet. Create a project to see builders here.</p>
          <Link href="/admin/projects/new" className="inline-block mt-4 text-gold hover:underline">
            Create Project
          </Link>
        </div>
      )}
    </div>
  );
}
