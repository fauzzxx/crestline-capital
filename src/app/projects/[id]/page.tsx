import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { trackEvent } from "@/lib/analytics";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) notFound();

  const { data: media } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", id)
    .order("created_at");

  const { data: { user } } = await supabase.auth.getUser();
  trackEvent(user?.id ?? null, "project_viewed", { project_id: id }).catch(() => {});

  let isMember = false;
  if (user) {
    const { data: pm } = await supabase
      .from("pool_members")
      .select("id")
      .eq("user_id", user.id)
      .eq("project_id", id)
      .single();
    isMember = !!pm;
  }

  return (
    <div className="section-container">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-cream-muted hover:text-gold transition-colors">
          ← Back to Dashboard
        </Link>
      </div>
      <ProjectDetailClient
        project={project as import("@/types/database").Project}
        media={(media ?? []) as import("@/types/database").ProjectMedia[]}
        isMember={isMember}
      />
    </div>
  );
}
