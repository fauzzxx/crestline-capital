-- Phase 1 Expansion: Builders, Tiers, and Unit Configs

-- Create a helper function to avoid infinite recursion in RLS
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Builders table
CREATE TABLE IF NOT EXISTS public.builders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  past_performance TEXT,
  trust_score INTEGER DEFAULT 5 CHECK (trust_score BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update Projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS builder_id UUID REFERENCES public.builders(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS discount_tiers JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS unit_configs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS google_map_url TEXT,
ADD COLUMN IF NOT EXISTS commission_percentage DECIMAL(5, 2) DEFAULT 0;

-- Update projects status check to include 'coming_soon'
ALTER TABLE public.projects DROP CONSTRAINT IF EXISTS projects_status_check;
ALTER TABLE public.projects ADD CONSTRAINT projects_status_check CHECK (status IN ('open', 'unlocked', 'closed', 'coming_soon'));

-- RLS for Builders
ALTER TABLE public.builders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can read builders" ON public.builders;
CREATE POLICY "Anyone can read builders" ON public.builders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin can manage builders" ON public.builders;
CREATE POLICY "Admin can manage builders" ON public.builders FOR ALL USING (public.is_admin());

-- Re-apply admin policies for projects and profiles to use is_admin() helper (fixing recursion)
DROP POLICY IF EXISTS "Admin can manage projects" ON public.projects;
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Service role can manage profiles" ON public.profiles;
CREATE POLICY "Service role can manage profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- Index for builder search
CREATE INDEX IF NOT EXISTS idx_projects_builder_id ON public.projects(builder_id);
