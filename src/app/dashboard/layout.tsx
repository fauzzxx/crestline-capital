import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_status")
    .eq("id", user.id)
    .single();

  if (profile?.membership_status === "pending") {
    redirect("/membership-under-review");
  }
  if (profile?.membership_status === "rejected") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="pt-24 pb-16">{children}</main>
    </div>
  );
}
