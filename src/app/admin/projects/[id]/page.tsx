import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectForm } from "../ProjectForm";
import { MediaManager } from "./MediaManager";

export default async function AdminEditProjectPage({
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

  return (
    <div className="section-container max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/projects" className="text-sm text-cream-muted hover:text-gold">
          ← Back to Projects
        </Link>
      </div>
      <h1 className="text-2xl font-heading font-bold mb-6">Edit Project</h1>
      <ProjectForm project={project as import("@/types/database").Project} />
      <div className="mt-10">
        <h2 className="text-lg font-heading font-semibold mb-4">Media</h2>
        <MediaManager
          projectId={id}
          media={(media ?? []) as import("@/types/database").ProjectMedia[]}
        />
      </div>
    </div>
  );
}
