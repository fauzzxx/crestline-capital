"use server";

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function sendPhoneOtp(phone: string) {
  const supabase = await createClient();
  const normalized = phone.replace(/\D/g, '');
  const withCountry = normalized.length === 10 ? `+91${normalized}` : phone.startsWith('+') ? phone : `+91${normalized}`;
  const { error } = await supabase.auth.signInWithOtp({ phone: withCountry });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function verifyPhoneOtp(phone: string, token: string) {
  const supabase = await createClient();
  const normalized = phone.replace(/\D/g, '');
  const phoneForVerify = normalized.length === 10 ? `+91${normalized}` : phone.startsWith('+') ? phone : `+91${normalized}`;
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phoneForVerify,
    token,
    type: 'sms',
  });
  if (error) return { success: false, error: error.message };
  if (!data.session) return { success: false, error: 'Verification failed' };

  // Fetch the role to allow client-side redirection
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user!.id)
    .single();

  return {
    success: true,
    role: profile?.role || 'member'
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
