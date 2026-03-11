import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ProjectsTable } from "./ProjectsTable";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="section-container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold">Project Management</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg gold-gradient-bg text-accent-foreground font-medium hover:opacity-90"
        >
          Create Project
        </Link>
      </div>
      <ProjectsTable projects={(projects ?? []) as import("@/types/database").Project[]} />
    </div>
  );
}
