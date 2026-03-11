-- Contact messages (public form submissions)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public form); only admin can read/delete
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact messages" ON public.contact_messages FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin can delete contact messages" ON public.contact_messages FOR DELETE USING (public.is_admin());

-- Analytics events (server-side tracking)
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  event_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Only server/service or admin can insert; admin can read (anon insert for public events like membership_request_submitted)
CREATE POLICY "Anyone can insert analytics event" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view analytics events" ON public.analytics_events FOR SELECT USING (public.is_admin());

-- Project extras: builder_logo, brochure_pdf, project_video (google_map_url already exists)
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS builder_logo TEXT,
  ADD COLUMN IF NOT EXISTS brochure_pdf TEXT,
  ADD COLUMN IF NOT EXISTS project_video TEXT;

-- Storage bucket: project-media (run via Supabase Dashboard or API; policy allows authenticated upload by admin)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true) ON CONFLICT (id) DO NOTHING;
-- Storage RLS: allow public read; allow insert/update/delete for authenticated users (admin check in app)
