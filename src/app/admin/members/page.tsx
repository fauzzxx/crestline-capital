import { createClient } from "@/lib/supabase/server";
import { MembersTable } from "./MembersTable";

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; budget?: string; location?: string; purpose?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let q = supabase
    .from("membership_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (params.status === "pending") {
    q = q.eq("status", "pending");
  } else if (params.status === "approved") {
    q = q.eq("status", "approved");
  } else if (params.status === "rejected") {
    q = q.eq("status", "rejected");
  }
  if (params.budget) {
    q = q.eq("budget_range", params.budget);
  }
  if (params.purpose) {
    q = q.eq("buying_purpose", params.purpose);
  }
  if (params.location) {
    q = q.contains("preferred_locations", [params.location]);
  }

  const { data: requests } = await q;

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, phone, membership_status, role");

  return (
    <div className="section-container">
      <h1 className="text-2xl font-heading font-bold mb-6">Buyer Management</h1>
      <p className="text-cream-muted text-sm mb-6">
        Total registered members, filter by budget range, location preference, and investment vs end-use.
      </p>
      <MembersTable
        requests={(requests ?? []) as import("@/types/database").MembershipRequest[]}
        profiles={(profiles ?? []) as import("@/types/database").Profile[]}
        searchParams={params}
      />
    </div>
  );
}
