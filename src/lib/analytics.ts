"use server";

import { createClient } from "@/lib/supabase/server";

export async function trackEvent(
  userId: string | null,
  eventName: string,
  eventMetadata?: Record<string, unknown>
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("analytics_events").insert({
    user_id: userId ?? null,
    event_name: eventName,
    event_metadata: eventMetadata ?? {},
  });
}
