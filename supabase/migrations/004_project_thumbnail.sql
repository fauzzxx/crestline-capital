-- Project thumbnail: store image URL for dashboard cards
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Create project-media bucket (thumbnails + gallery uploads)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-media', 'project-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy: allow public read for project-media (so thumbnail URLs work)
-- If you already have policies on storage.objects for project-media, skip or adjust.
DROP POLICY IF EXISTS "Public read project-media" ON storage.objects;
CREATE POLICY "Public read project-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-media');

-- Allow authenticated uploads to project-media (admin check is in app)
DROP POLICY IF EXISTS "Authenticated upload project-media" ON storage.objects;
CREATE POLICY "Authenticated upload project-media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated update project-media" ON storage.objects;
CREATE POLICY "Authenticated update project-media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated delete project-media" ON storage.objects;
CREATE POLICY "Authenticated delete project-media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-media' AND auth.role() = 'authenticated');
