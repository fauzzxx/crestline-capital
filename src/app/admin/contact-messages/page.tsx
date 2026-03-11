import { createClient } from "@/lib/supabase/server";
import { ContactMessagesClient } from "./ContactMessagesClient";

const PAGE_SIZE = 20;

export default async function AdminContactMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await createClient();

  const [{ data: messages, error }, { count }] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
  ]);

  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="section-container">
      <h1 className="text-2xl font-heading font-bold mb-6">Contact Messages</h1>
      <p className="text-cream-muted text-sm mb-6">
        Messages submitted via the public contact form. You can view and delete.
      </p>
      <ContactMessagesClient
        messages={(messages ?? []) as Array<{ id: string; name: string; email: string; message: string; created_at: string }>}
        currentPage={page}
        totalPages={totalPages}
        total={total}
      />
    </div>
  );
}
