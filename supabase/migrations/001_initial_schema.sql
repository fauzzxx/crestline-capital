-- Crestline Capital: Initial schema
-- Run this in Supabase SQL Editor or via Supabase CLI

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  membership_status TEXT NOT NULL DEFAULT 'pending' CHECK (membership_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Membership requests (before approval creates/updates profile)
CREATE TABLE IF NOT EXISTS public.membership_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  budget_range TEXT,
  buying_purpose TEXT,
  preferred_locations TEXT[] DEFAULT '{}',
  buying_timeline TEXT,
  agreement_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects (admin-managed)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_name TEXT NOT NULL,
  builder_name TEXT NOT NULL,
  location TEXT NOT NULL,
  base_price DECIMAL(12, 2) NOT NULL,
  discount_percentage DECIMAL(5, 2) NOT NULL DEFAULT 0,
  minimum_members_required INTEGER NOT NULL DEFAULT 1,
  current_members_joined INTEGER NOT NULL DEFAULT 0,
  deal_deadline TIMESTAMPTZ,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'unlocked', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Project media (images, videos, YouTube)
CREATE TABLE IF NOT EXISTS public.project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'youtube')),
  media_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pool members (user participation in capital pools)
CREATE TABLE IF NOT EXISTS public.pool_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  commitment_status TEXT NOT NULL DEFAULT 'interested' CHECK (commitment_status IN ('interested', 'confirmed', 'dropped')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- Admin notes (buyer management)
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON public.profiles(membership_status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_membership_requests_status ON public.membership_requests(status);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_project_media_project_id ON public.project_media(project_id);
CREATE INDEX IF NOT EXISTS idx_pool_members_user_id ON public.pool_members(user_id);
CREATE INDEX IF NOT EXISTS idx_pool_members_project_id ON public.pool_members(project_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_user_id ON public.admin_notes(user_id);

-- RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read own; admin can read/update all
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile (limited)" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role can manage profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Membership requests: anyone can insert (public form); admin can select/update
CREATE POLICY "Anyone can submit membership request" ON public.membership_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view membership requests" ON public.membership_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin can update membership requests" ON public.membership_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Projects: public read for open/unlocked; admin full access
CREATE POLICY "Anyone can read open/unlocked/closed projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin can manage projects" ON public.projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Project media: public read
CREATE POLICY "Anyone can read project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Admin can manage project media" ON public.project_media FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Pool members: users can read own; users can insert own (join); admin can manage
CREATE POLICY "Users can read own pool memberships" ON public.pool_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Approved users can join pool" ON public.pool_members FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND membership_status = 'approved')
);
CREATE POLICY "Admin can manage pool members" ON public.pool_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Admin notes: admin only
CREATE POLICY "Admin can manage admin notes" ON public.admin_notes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Function: create profile on first signup; sync approved membership_requests by phone
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_phone TEXT;
  approved_status TEXT := 'pending';
BEGIN
  user_phone := COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone', '');
  IF EXISTS (SELECT 1 FROM public.membership_requests mr WHERE mr.status = 'approved' AND (mr.phone = user_phone OR mr.phone = REPLACE(REPLACE(user_phone, ' ', ''), '+91', '') OR REPLACE(REPLACE(mr.phone, ' ', ''), '+91', '') = REPLACE(REPLACE(user_phone, ' ', ''), '+91', ''))) THEN
    approved_status := 'approved';
  END IF;
  INSERT INTO public.profiles (id, full_name, phone, role, membership_status)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    user_phone,
    COALESCE((NEW.raw_user_meta_data->>'role')::TEXT, 'user'),
    approved_status
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: after auth user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: update project current_members_joined and unlock when threshold met
CREATE OR REPLACE FUNCTION public.after_pool_member_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.projects
  SET
    current_members_joined = current_members_joined + 1,
    updated_at = NOW()
  WHERE id = NEW.project_id;
  -- Auto-unlock if threshold reached (current_members_joined already incremented above)
  UPDATE public.projects
  SET status = 'unlocked', updated_at = NOW()
  WHERE id = NEW.project_id
    AND current_members_joined >= minimum_members_required
    AND status = 'open';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_pool_member_insert ON public.pool_members;
CREATE TRIGGER on_pool_member_insert
  AFTER INSERT ON public.pool_members
  FOR EACH ROW EXECUTE FUNCTION public.after_pool_member_insert();

-- Function: decrement count when pool member removed
CREATE OR REPLACE FUNCTION public.after_pool_member_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.projects
  SET current_members_joined = GREATEST(0, current_members_joined - 1), updated_at = NOW()
  WHERE id = OLD.project_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_pool_member_delete ON public.pool_members;
CREATE TRIGGER on_pool_member_delete
  AFTER DELETE ON public.pool_members
  FOR EACH ROW EXECUTE FUNCTION public.after_pool_member_delete();

-- Storage bucket for project media (run in Dashboard or add via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-media', 'project-media', true);
