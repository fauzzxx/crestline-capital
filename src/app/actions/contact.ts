"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("contact_messages").insert({
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    message: formData.message.trim(),
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
