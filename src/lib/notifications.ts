/**
 * WhatsApp notification placeholders.
 * Replace with actual WhatsApp Business API / Twilio WhatsApp integration when ready.
 */

export async function sendWhatsAppMembershipReceived(_data: {
  name: string;
  phone: string;
}): Promise<{ success: boolean; error?: string }> {
  // Placeholder: integrate with WhatsApp Business API or Twilio
  if (process.env.NODE_ENV === "development") {
    console.log("[WhatsApp] Would send membership received to admin:", _data.phone);
  }
  return { success: true };
}

export async function sendWhatsAppMembershipApproved(_phone: string): Promise<{ success: boolean; error?: string }> {
  // Placeholder: send "Your membership has been approved" to user's phone
  if (process.env.NODE_ENV === "development") {
    console.log("[WhatsApp] Would send membership approved to:", _phone);
  }
  return { success: true };
}
