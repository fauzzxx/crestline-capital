# Crestline Capital – Run & Test Every Feature

## 1. Run the project

```cmd
cd C:\Users\skfau\Downloads\crestline-capital-network-main\crestline-capital-network-main
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 2. Prerequisites (one-time)

- **Supabase:** Migration `001_initial_schema.sql` already run in SQL Editor.
- **Env:** `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **Phone auth:** In Supabase Dashboard → Authentication → Providers → **Phone** = ON and SMS provider (e.g. Twilio) configured.
- **First admin:** After one user signs up, run in SQL Editor:
  ```sql
  UPDATE public.profiles SET role = 'admin' WHERE id = 'THAT_USER_UUID';
  ```
  Get UUID from Authentication → Users.

---

## 3. Feature checklist – test in this order

### A. Public (no login)

| # | Feature | How to check | URL |
|---|--------|---------------|-----|
| 1 | **Landing** | Hero, How It Works, Builders, Opportunities, About load; nav links work. | `/` |
| 2 | **Nav links** | Click How It Works, Opportunities, About (scroll); Contact, Request Membership open correct pages. | `/` |
| 3 | **Request Membership** | Open form; fill name, phone, email, budget, purpose, locations, timeline; check agreement; Submit. Should show success toast and form reset. | `/membership` |
| 4 | **Contact** | Fill name, email, message; Submit. Should show “Message sent” toast. | `/contact` |
| 5 | **Legal** | Terms, Privacy, Disclaimer open and show content. | `/terms`, `/privacy`, `/disclaimer` |
| 6 | **Footer** | All footer links work (Platform + Legal). | Any page |
| 7 | **404** | Visit `http://localhost:3000/random-page`. Should show 404 and “Return to Home” link. | `/random-page` |

---

### B. Login & membership status

| # | Feature | How to check | URL |
|---|--------|---------------|-----|
| 8 | **Login (send OTP)** | Click Login; enter phone (e.g. +91 9876543210); “Send OTP”. Check Supabase Auth logs or phone for OTP. | `/login` |
| 9 | **Login (verify OTP)** | Enter 6-digit OTP; “Verify & Sign In”. Should redirect to `/dashboard` (or “Under review” if pending). | `/login` |
| 10 | **Membership under review** | Log in with a user whose `profiles.membership_status` = `pending`. Should redirect to “Membership Under Review” page, not dashboard. | `/membership-under-review` (after login) |
| 11 | **Dashboard blocked for pending** | Same pending user: manually open `/dashboard`. Should redirect to `/membership-under-review`. | - |

---

### C. Member dashboard (approved user)

Use a user with `membership_status = 'approved'` (or approve one in Admin later).

| # | Feature | How to check | URL |
|---|--------|---------------|-----|
| 12 | **Dashboard loads** | After login, see “Member Dashboard”, “Active Capital Pools”, “My Pools”. | `/dashboard` |
| 13 | **Active pools list** | If any project has status `open` or `unlocked`, cards show: name, builder, location, price, discount %, members count, progress bar, countdown, “Join Capital Pool”. | `/dashboard` |
| 14 | **Pool progress text** | On a pool card: “X / Y Members Joined” and “Z More Members Required to Unlock Discount” (when not unlocked). | `/dashboard` |
| 15 | **Join pool** | Click “Join Capital Pool” on a project. Toast “You've joined…”; card updates or shows “View Details”. Same project: “Join” should not allow duplicate (already in pool). | `/dashboard` |
| 16 | **My Pools** | After joining, “My Pools” shows that project with status and “View details →”. | `/dashboard` |
| 17 | **Calculators** | Dashboard nav: “Calculators”. EMI: enter price, rate, tenure → see EMI. Appreciation: price, rate, years → see future value. | `/dashboard/tools` |
| 18 | **Sign out** | Click “Sign out” in dashboard nav. Should go to home; visiting `/dashboard` again should redirect to login. | `/dashboard` |

---

### D. Project detail page

| # | Feature | How to check | URL |
|---|--------|---------------|-----|
| 19 | **Project page** | From dashboard, click a project name or “View Details”. Page shows: name, builder, location, base price, discount %, pool progress, countdown, description. | `/projects/[id]` |
| 20 | **Media gallery** | If project has rows in `project_media`, gallery shows; switch between image/video/YouTube. | `/projects/[id]` |
| 21 | **Join from project page** | As approved member, open a project you haven’t joined; click “Join Capital Pool”. Success and page reflects membership. | `/projects/[id]` |
| 22 | **Back to dashboard** | “← Back to Dashboard” returns to `/dashboard`. | `/projects/[id]` |

---

### E. Admin panel (admin user only)

Use a user with `profiles.role = 'admin'`. Go to **http://localhost:3000/admin** (or add a link in nav if you want).

| # | Feature | How to check | URL |
|---|--------|---------------|-----|
| 23 | **Admin dashboard** | Stats: Total Members, Pending Approvals, Active Projects, Pool Participants. Cards link to correct sections. | `/admin` |
| 24 | **Members – list** | “Members” in nav. Table shows membership requests (name, phone, email, budget, purpose, status). | `/admin/members` |
| 25 | **Members – filter** | Filter by All / Pending / Approved / Rejected. List updates. | `/admin/members` |
| 26 | **Members – approve** | On a **pending** request, click “Approve”. Row status → approved; in Supabase `profiles` that phone’s `membership_status` = `approved`. | `/admin/members` |
| 27 | **Members – reject** | On a pending request, “Reject”. Status → rejected; profile (by phone) → `rejected`. | `/admin/members` |
| 28 | **Members – add note** | For a row with a matching profile, “Add note”, type text, Save. Check `admin_notes` table for new row. | `/admin/members` |
| 29 | **Projects – list** | “Projects” in nav. Table: name, builder, location, price, discount, pool count, status. Edit / Delete buttons. | `/admin/projects` |
| 30 | **Projects – create** | “Create Project”. Fill name, builder, location, base price, discount %, min members, optional deadline & description. Submit. New row in `projects`; appears in list and on dashboard. | `/admin/projects/new` |
| 31 | **Projects – edit** | On a project, “Edit”. Change fields (including Deal Status: open/unlocked/closed). Save. Changes visible on list and `/projects/[id]`. | `/admin/projects/[id]` |
| 32 | **Projects – delete** | “Delete” on a project; confirm. Project removed from list and from dashboard. | `/admin/projects` |
| 33 | **Project media** | On project edit page, “Media” section. Add: type (image/video/youtube) + URL. “Add”. Row in `project_media`; gallery on `/projects/[id]` shows it. Remove: “Remove” on a media row; it disappears. | `/admin/projects/[id]` |
| 34 | **Pools** | “Pools” in nav. Table: member (name/phone), project, commitment status, joined date. Change status (Interested / Confirmed / Dropped); Remove member. Check `pool_members` and project `current_members_joined` if you remove. | `/admin/pools` |
| 35 | **Admin – member view** | “Member View” in admin nav opens dashboard as a normal member. | `/dashboard` |

---

### F. Discount unlock (automation)

| # | Feature | How to check |
|---|--------|---------------|
| 36 | **Unlock when target met** | Create a project with `minimum_members_required = 2`. Have 2 different approved users join that project (from dashboard). After 2nd join, project `status` in DB should be `unlocked` and UI should show “Unlocked” / “Discount Unlocked”. |
| 37 | **Count decrement on remove** | In Admin → Pools, remove one member from a project. That project’s `current_members_joined` in DB should decrease by 1. |

---

## 4. Quick test flow (minimal path)

1. **Run:** `npm run dev` → open http://localhost:3000  
2. **Public:** Home, Membership form submit, Contact submit, one legal page  
3. **Login:** Go to `/login` → send OTP → verify (need Phone provider set in Supabase)  
4. **Admin:** In Supabase set your user’s `profiles.role = 'admin'`  
5. **Admin:** Visit `/admin` → create one project → add one media URL → open Members and approve one request (if any)  
6. **Member:** Log in as approved user → Dashboard → join the project → open project detail → check Calculators  
7. **Admin:** Pools → see the join; optionally remove or change status  

---

## 5. Where to look if something fails

- **Auth (OTP):** Supabase → Authentication → Providers → Phone ON + SMS provider; Logs.
- **Data:** Supabase → Table Editor (profiles, membership_requests, projects, pool_members, project_media).
- **Console:** Browser DevTools → Console and Network.
- **Server:** Terminal where `npm run dev` is running for Next.js errors.

Use this guide to run the app and check each feature in order.
