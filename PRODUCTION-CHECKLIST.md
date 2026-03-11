# Crestline Capital — Production Launch Checklist

Use this checklist before going live to ensure all systems are operational.

## Environment & Deployment

- [ ] **Environment variables** set in production:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (required for project media uploads)
  - `RESEND_API_KEY` (for membership + approval emails)
  - `ADMIN_EMAIL` / `EMAIL_FROM` (optional; defaults in code)
  - `NEXT_PUBLIC_SITE_URL` (optional; for OpenGraph / canonical URL)
- [ ] **Supabase**: Run all migrations (`001`, `002`, `003`) in the SQL Editor or via CLI.
- [ ] **Storage**: Create bucket `project-media` in Supabase Dashboard (Storage). Set to **public** if you want project images/videos to load without signed URLs.
- [ ] **Phone OTP**: In Supabase Dashboard → Authentication → Providers → Phone, enable Phone and configure SMS provider (e.g. Twilio).

## Core Flows

- [ ] **OTP login**: Send OTP to a test number and complete login. Confirm redirect to dashboard for members and to admin for admin users.
- [ ] **Membership approval**: Submit a membership request from the public form → Approve from Admin → Members → confirm profile shows Approved and (if email sent) user receives “Your Crestline Capital Membership Has Been Approved”.
- [ ] **Project pool join**: As an approved member, open a project and click “Join Capital Pool”. Confirm entry in Admin → Pools and pool count increments.
- [ ] **Tier unlock**: When pool reaches `minimum_members_required`, project status should move to “unlocked” (trigger in DB). Confirm on project page and in Admin.
- [ ] **Admin project creation**: Create a project with status Open / Coming Soon. Confirm it appears on dashboard and in Admin → Projects.
- [ ] **Media uploads**: In Admin → Projects → Edit → Media, upload an image or video to the `project-media` bucket. Confirm it appears in the gallery and on the public project page.
- [ ] **Contact form**: Submit the contact form. Confirm row in `contact_messages` and visibility (and delete) on Admin → Contact.
- [ ] **Email notifications**: Confirm admin receives “New Crestline Capital Membership Request” on form submit, and member receives “Your Crestline Capital Membership Has Been Approved” on approval (check RESEND_API_KEY and Resend domain).

## Security & Data

- [ ] **RLS**: Profiles, projects, pool_members, contact_messages, and analytics_events have expected policies (users see own data; admins see all where applicable).
- [ ] **Admin access**: Only users with `profiles.role = 'admin'` can access `/admin/*`.

## Legal & SEO

- [ ] **Legal pages**: Terms, Privacy, Disclaimer, and Membership Agreement are linked in footer and content is reviewed.
- [ ] **Metadata**: Homepage and layout use title “Crestline Capital | Structured Bulk Real Estate Buying Network” and the correct description and OpenGraph tags.

## Post-Launch

- [ ] Monitor Resend dashboard for email delivery.
- [ ] Optionally integrate WhatsApp in `src/lib/notifications.ts` when ready.
- [ ] Add `NEXT_PUBLIC_SITE_URL` in production for correct OpenGraph URLs.
