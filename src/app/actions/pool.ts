"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { trackEvent } from '@/lib/analytics';

export async function joinPool(projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Not authenticated' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('membership_status')
    .eq('id', user.id)
    .single();

  if (profile?.membership_status !== 'approved') {
    return { success: false, error: 'Only approved members can join pools' };
  }

  const { error } = await supabase.from('pool_members').insert({
    user_id: user.id,
    project_id: projectId,
    commitment_status: 'interested',
  });

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already in this pool' };
    return { success: false, error: error.message };
  }

  trackEvent(user.id, 'pool_joined', { project_id: projectId }).catch(() => {});

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}
