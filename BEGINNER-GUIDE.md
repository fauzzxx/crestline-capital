# Crestline Capital – Complete Beginner’s Guide (Start to Finish)

This guide explains **every step** from opening the project to using the website as a visitor, member, and admin. Follow the steps in order.

---

# PART 1: GETTING THE WEBSITE RUNNING

## Step 1.1 – Open the project folder

1. On your computer, go to this folder:
   ```
   C:\Users\skfau\Downloads\crestline-capital-network-main\crestline-capital-network-main
   ```
2. This is your **project folder**. All the website code is here.

---

## Step 1.2 – Open Command Prompt (CMD)

1. Press **Windows key** on your keyboard.
2. Type **cmd**.
3. Press **Enter**. A black window (Command Prompt) will open.

---

## Step 1.3 – Go to the project folder in CMD

1. In the CMD window, type exactly (or copy-paste):
   ```
   cd C:\Users\skfau\Downloads\crestline-capital-network-main\crestline-capital-network-main
   ```
2. Press **Enter**.
3. The line at the top should now show this path. You are “inside” the project folder.

---

## Step 1.4 – Install dependencies (first time only)

1. In the same CMD window, type:
   ```
   npm install
   ```
2. Press **Enter**.
3. Wait until it finishes (you will see a lot of text). When it stops and you see the path again, it is done. You only need to do this **once** (or when someone tells you to run it again).

---

## Step 1.5 – Start the website

1. In the same CMD window, type:
   ```
   npm run dev
   ```
2. Press **Enter**.
3. You should see something like:
   - `Local: http://localhost:3000`
   - `Ready in a few seconds`
4. **Do not close this CMD window.** If you close it, the website will stop.

---

## Step 1.6 – Open the website in your browser

1. Open **Google Chrome** (or Edge, or any browser).
2. In the address bar at the top, type:
   ```
   http://localhost:3000
   ```
3. Press **Enter**.
4. You should see the **Crestline Capital** homepage. You are now using the website on your own computer.

---

# PART 2: UNDERSTANDING THE HOMEPAGE

When you open **http://localhost:3000**, you see the **homepage (landing page)**.

## Step 2.1 – Top bar (navigation bar)

At the **top** of the page you will see:

- **Left side:**
  - **“CC” logo** (gold/maroon) – clicking it takes you back to the homepage.
  - **“Crestline Capital”** text – same as above, takes you to homepage.

- **Right side (menu):**
  - **“How It Works”** – click to scroll down to the “How It Works” section on the same page.
  - **“Opportunities”** – click to scroll to the “Opportunities” section.
  - **“About”** – click to scroll to the “About” section.
  - **“Contact”** – click to go to the **Contact** page (different page).
  - **“Dashboard”** – click to go to the **member dashboard** (you must be logged in; otherwise you will be sent to Login).
  - **“Login”** – click to go to the **Login** page (phone OTP).
  - **“Request Membership”** (golden button) – click to go to the **Membership request** page.

On **mobile**, the menu is hidden behind a **hamburger icon (☰)**. Click the icon to see the same links.

---

## Step 2.2 – Main hero section (top of page)

- Big heading: **“Crestline Capital”** and a short line about the platform.
- A **golden “Request Membership”** button – same as in the top bar; takes you to the membership form.
- A **down arrow or scroll** – sometimes there is a hint to scroll down. Scrolling shows more sections.

---

## Step 2.3 – Sections as you scroll down

- **How It Works** – explains the process (e.g. request membership → get approved → join pools → unlock discounts).
- **Why Builders** – why builders work with the platform.
- **Opportunities** – sample or placeholder project cards (may show “mock” data if no projects exist in the database yet).
- **About** – information about Crestline Capital.
- At the **bottom**: the **footer**.

---

## Step 2.4 – Footer (bottom of the page)

- **Left:** Short description of Crestline Capital.
- **“Platform”** column: links like How It Works, Opportunities, Request Membership, Contact.
- **“Legal”** column: **Terms & Conditions**, **Privacy Policy**, **Disclaimer**.
- **Bottom line:** Copyright and location (e.g. Hyderabad).

**Every link in the footer works** like the top menu – they take you to the right section or page.

---

# PART 3: PAGES YOU CAN VISIT WITHOUT LOGGING IN

## Step 3.1 – Request Membership page

**How to get there:** Click **“Request Membership”** (top bar or hero).

**What you see:**
- Title: **“Request Membership”**.
- A **form** with:
  - **Full Name** – type your name.
  - **Phone Number** – e.g. +91 9876543210.
  - **Email** – your email.
  - **Budget Range** – click one of the options (e.g. ₹50L–₹1Cr).
  - **Buying Purpose** – Investment / End Use / Both.
  - **Preferred Locations** – click one or more (e.g. Gachibowli, Kokapet).
  - **Buying Timeline** – e.g. Immediate, 1–3 Months.
  - **Checkbox** – “I agree to the membership terms…” (you must tick it).
  - **“Submit Membership Request”** button at the bottom.

**What to do:**
1. Fill every required field (name, phone, email).
2. Choose at least one option for budget, purpose, locations, timeline.
3. Tick the agreement checkbox.
4. Click **“Submit Membership Request”**.

**What happens:** A green message (toast) appears like “Membership request submitted!” and the form clears. Your request is saved in the database. An admin must **approve** it before you can use the member dashboard.

---

## Step 3.2 – Contact page

**How to get there:** Click **“Contact”** in the top menu or footer.

**What you see:**
- Title: **“Get in Touch”**.
- Contact info (e.g. email, office address).
- A form: **Your Name**, **Email Address**, **Your Message**.
- **“Send Message”** button.

**What to do:** Fill the form and click **“Send Message”**. A success message appears. (Right now the message is not saved in the database or emailed; that can be added later.)

---

## Step 3.3 – Terms, Privacy, Disclaimer

**How to get there:** In the **footer**, click **“Terms & Conditions”**, **“Privacy Policy”**, or **“Disclaimer”**.

**What you see:** A page with legal text. **No buttons to click** – just read. Use the top menu or **“Back”** in the browser to go back.

---

## Step 3.4 – Login page (before you have an account)

**How to get there:** Click **“Login”** in the top bar.

**What you see:**
- Title: **“Member Login”**.
- A box with:
  - **Phone Number** field (e.g. +91 98765 43210).
  - **“Send OTP”** button.

**What to do (Step A – Send OTP):**
1. Enter your **phone number** (same as the one you used in the membership form is best).
2. Click **“Send OTP”**.
3. Supabase will send a **6-digit code** to your phone (SMS). This only works if **Phone auth and an SMS provider (e.g. Twilio) are set up in Supabase**.

**What you see next (Step B – Enter OTP):**
- The page changes to show **6 small boxes** for the code.
- Type the **6-digit code** you received.
- **“Verify & Sign In”** button.
- Link: **“Use a different number”** – if you want to change the phone number.

**What to do:**
1. Enter the 6-digit code in the boxes.
2. Click **“Verify & Sign In”**.

**What happens next:**
- If your membership is **pending**: you are redirected to **“Membership Under Review”** (see Part 4).
- If your membership is **approved**: you are redirected to the **Dashboard** (see Part 5).
- If something fails (wrong code, no SMS): an error message appears on the page.

---

# PART 4: WHEN YOUR MEMBERSHIP IS PENDING

## Step 4.1 – Membership Under Review page

**When you see it:** After you **log in** and your profile in the database has **membership_status = pending**.

**What you see:**
- A clock or “under review” icon.
- Title: **“Membership Under Review”**.
- Text saying your request is being reviewed and you will be notified when approved.
- A **“Contact Us”** button (or link) – goes to the Contact page.

**What you can do:** You **cannot** go to the Dashboard until an admin approves you. You can only wait or contact via the Contact page. To test the full site, an admin must approve your request in the Admin panel (Part 7).

---

# PART 5: USING THE SITE AS AN APPROVED MEMBER (DASHBOARD)

After an admin has **approved** your membership, when you **log in** you are sent to the **Dashboard**.

## Step 5.1 – Dashboard top bar

**What you see:**
- **Left:** Crestline Capital logo and name (click to go to dashboard home).
- **Right:**
  - **“Dashboard”** – you are here.
  - **“Calculators”** – opens the tools page (EMI and Appreciation).
  - **“Home”** – goes back to the main website homepage (localhost:3000).
  - **“Sign out”** – logs you out and takes you to the homepage.

---

## Step 5.2 – Dashboard main content – “Active Capital Pools”

**What you see:**
- A heading: **“Active Capital Pools”**.
- **Cards** – one card per **project** (deal). If there are no projects yet, you see a message like “No active capital pools at the moment.”

**On each card you see:**
- **Project name** (e.g. “Emerald Heights”) – **click the name** to open the **project detail page**.
- **Builder name**, **location**.
- **Base price** and **discount %** (e.g. “9% off”).
- **“X / Y members”** (e.g. “8 / 10 Members Joined”).
- A **progress bar** (shows how full the pool is).
- Text like **“2 More Members Required to Unlock Discount”** if the deal is not yet unlocked.
- **Countdown** (Days, Hrs, Min) if the project has a deal deadline.
- **“Unlocked”** badge (gold) if the deal is already unlocked.
- At the bottom of the card:
  - **“Join Capital Pool”** – click to **join** this deal (you can only join once per project).
  - Or **“View Details”** if you have already joined – takes you to the project page.

**What to do:**
1. To **join** a deal: click **“Join Capital Pool”** on a card.
2. A green message appears and the list may refresh; the card may now show **“View Details”** instead of Join.
3. To **see full details**: click the **project name** or **“View Details”**.

---

## Step 5.3 – Dashboard – “My Pools” section

**What you see:**
- A heading: **“My Pools”**.
- **Cards** for each project **you have joined**. Each card shows:
  - **Project name** (click to open project page).
  - **Status** (e.g. Interested).
  - **Deal** (e.g. Unlocked or Open).
  - **“View details →”** link.

**What to do:** Click the project name or **“View details →”** to open the **project detail page** (Part 6).

If you have not joined any pool yet, you see: “You haven’t joined any capital pools yet.”

---

## Step 5.4 – Calculators page

**How to get there:** In the dashboard top bar, click **“Calculators”**.

**What you see:** Two boxes:

**1. EMI Calculator**
- **Property / Loan Amount (₹)** – e.g. 10000000.
- **Interest Rate (% per annum)** – e.g. 8.5.
- **Loan Tenure (months)** – e.g. 240.
- When you fill these, it shows **Monthly EMI** and total payment / interest below.

**2. Appreciation Calculator**
- **Current Property Price (₹)** – e.g. 10000000.
- **Annual Appreciation Rate (%)** – e.g. 6.
- **Years** – e.g. 5.
- It shows **Estimated Future Value** below.

**What to do:** Type numbers in the fields; results update automatically. No button to click.

---

## Step 5.5 – Sign out

**Where:** Top right of the dashboard: **“Sign out”**.

**What to do:** Click **“Sign out”**. You are logged out and taken to the homepage. To use the dashboard again, you must **Log in** again (Part 3.4).

---

# PART 6: PROJECT DETAIL PAGE

**How to get there:** From the dashboard, click a **project name** or **“View details”** on a pool card.

## Step 6.1 – What you see at the top

- **“← Back to Dashboard”** – click to return to the dashboard.
- **Project name** and badges (e.g. **“Discount Unlocked”**, **“open”**).
- **Builder name** and **location**.
- If you have **not** joined yet: a **“Join Capital Pool”** button (same as on the card).

---

## Step 6.2 – Gallery (if the project has media)

- If the admin has added **images, videos, or YouTube links** for this project, you see a **“Gallery”** section.
- You can **click arrows or dots** to move between images/videos.
- **YouTube** items play inside the page.

---

## Step 6.3 – Project overview box

- **Base Price** (e.g. ₹1,00,00,000).
- **Discount** (e.g. 9% off and discounted price).
- **Pool progress** (e.g. 8 / 10 members) and a **progress bar**.
- **Deal deadline** countdown (if set).
- Text like “2 more members required to unlock the discount.”
- **Description** (if the admin added one).

**What to do:** Read the info. To join from here, click **“Join Capital Pool”** (if you have not joined yet).

---

# PART 7: USING THE SITE AS AN ADMIN

You can only use the **Admin** section if your user has **role = admin** in the database. Someone must set this in Supabase (e.g. run SQL: `UPDATE profiles SET role = 'admin' WHERE id = 'your-user-uuid';`).

**How to get to Admin:** In the browser address bar, type:
```
http://localhost:3000/admin
```
(There may be no “Admin” link on the main menu for normal users.)

---

## Step 7.1 – Admin top bar

**What you see:**
- **“Admin Panel”** on the left.
- **Right:** **Dashboard**, **Members**, **Projects**, **Pools**, **Member View**.
  - **Member View** – opens the normal member dashboard (to see what members see).

---

## Step 7.2 – Admin Dashboard (home)

**What you see:** Four **stat cards**:
- **Total Members** – number of approved members (click to go to Members).
- **Pending Approvals** – membership requests waiting (click to go to Members filtered).
- **Active Projects** – open/unlocked projects (click to go to Projects).
- **Pool Participants** – total people in any pool (click to go to Pools).

**What to do:** Click any card to go to that section.

---

## Step 7.3 – Members page (buyer management)

**How to get there:** Click **“Members”** in the admin bar.

**What you see:**
- A **filter** dropdown: All / Pending / Approved / Rejected.
- A **table** with: Name, Phone, Email, Budget, Purpose, Status, **Actions**.

**Buttons per row (for pending requests):**
- **“Approve”** – approves the membership; the user’s profile becomes **approved** and they can use the dashboard.
- **“Reject”** – rejects the request; profile becomes **rejected**.
- **“Add note”** – (if the user already has a profile) lets you type an admin note and save it.

**What to do:**
1. Use the filter to see **Pending** requests.
2. Click **“Approve”** for a user you want to allow – they can then log in and use the dashboard.
3. Optionally click **“Add note”** for a user, type a note, and save.

---

## Step 7.4 – Projects page (project management)

**How to get there:** Click **“Projects”** in the admin bar.

**What you see:**
- **“Create Project”** button (top right).
- A **table**: Project name, Builder, Location, Base Price, Discount, Pool (members count), Status, **Edit** / **Delete** buttons.

**What to do – Create a project:**
1. Click **“Create Project”**.
2. You are on a form. Fill:
   - **Project Name** (e.g. “Emerald Heights”).
   - **Builder Name**, **Location**.
   - **Base Price (₹)**, **Discount %**, **Minimum Members Required**.
   - **Deal Deadline** (optional – date/time).
   - **Description** (optional).
3. Click **“Create Project”** at the bottom. You are taken back to the project list; the new project appears and will show on the **member dashboard**.

**What to do – Edit a project:**
1. In the table, click **“Edit”** on a project.
2. Change any fields (including **Deal Status**: Open / Unlocked / Closed).
3. Click **“Update Project”**.

**What to do – Add media to a project:**
1. Click **“Edit”** on a project.
2. Scroll to **“Media”**.
3. Choose type: **Image** / **Video** / **YouTube**.
4. Paste a **URL** (e.g. image link, or YouTube link like `https://youtube.com/watch?v=...`).
5. Click **“Add”**. The media appears in the list and will show in the **project detail** gallery for members.

**What to do – Remove media:** Click **“Remove”** on a media item.

**What to do – Delete a project:** Click **“Delete”** in the table; confirm. The project is removed from the list and from the member dashboard.

---

## Step 7.5 – Pools page (pool management)

**How to get there:** Click **“Pools”** in the admin bar.

**What you see:** A **table**: Member (name/phone), Project, **Status** (dropdown), Joined date, **Remove** button.

**What to do:**
- **Change status:** Use the **dropdown** for a member (Interested / Confirmed / Dropped).
- **Remove member:** Click **“Remove”** and confirm. The member is removed from that pool and the project’s “current members” count goes down.

---

# PART 8: TYPICAL FLOW FROM START TO END

**As a beginner, you can do this once to see everything:**

1. **Start the site** (Part 1): CMD → `npm run dev` → open http://localhost:3000.
2. **Homepage:** Scroll and click a few menu links to see How It Works, Contact, Terms (Part 2 and 3).
3. **Request membership:** Go to Request Membership, fill the form, submit (Part 3.1).
4. **Create admin user (one-time):** In Supabase Dashboard → Authentication → Users, find your user (or create one with the same phone). Copy the user **UUID**. In SQL Editor run:  
   `UPDATE public.profiles SET role = 'admin' WHERE id = 'PASTE-UUID-HERE';`
5. **Log in:** Go to Login, enter phone, Send OTP, enter code, Verify (Part 3.4).  
   - If pending: you see “Membership Under Review” (Part 4).  
   - Then in another browser (or after approving yourself): go to **Admin** (Part 7) → Members → Approve your request. Then log in again; you should go to Dashboard.
6. **As admin:** Go to http://localhost:3000/admin. Create one **Project** (Part 7.4), add one **media** URL, then open **Members** and **Approve** your membership if it’s still pending.
7. **As member:** Log in again. You should land on **Dashboard** (Part 5). Click **Join Capital Pool** on the project you created. Open **My Pools**, then click the project to open **Project detail** (Part 6). Try **Calculators** (Part 5.4).
8. **As admin again:** Go to **Admin** → **Pools** (Part 7.5). You should see yourself in the pool. Try changing status or viewing the dashboard stats.

---

# QUICK REFERENCE – BUTTONS AND LINKS

| Where        | Button/Link           | What it does                                      |
|-------------|------------------------|---------------------------------------------------|
| Homepage    | CC / Crestline Capital | Go to homepage                                    |
| Homepage    | How It Works / Opportunities / About | Scroll to that section on the page        |
| Homepage    | Contact                | Open Contact page                                 |
| Homepage    | Dashboard              | Go to dashboard (login required)                   |
| Homepage    | Login                  | Open Login page                                   |
| Homepage    | Request Membership     | Open membership form                              |
| Membership  | Submit Membership Request | Save your request and show success message     |
| Contact     | Send Message           | Show success message                              |
| Login       | Send OTP               | Send 6-digit code to your phone                    |
| Login       | Verify & Sign In       | Log you in and redirect (dashboard or under review)|
| Dashboard   | Calculators            | Open EMI and Appreciation tools                    |
| Dashboard   | Home                   | Go to main homepage                               |
| Dashboard   | Sign out               | Log out and go to homepage                        |
| Dashboard   | Join Capital Pool      | Join that project’s pool (once per project)       |
| Dashboard   | View Details / project name | Open project detail page                    |
| Project page| Join Capital Pool      | Same as on card – join this project               |
| Project page| ← Back to Dashboard    | Return to dashboard                               |
| Admin       | Dashboard / Members / Projects / Pools | Go to that section              |
| Admin       | Member View            | Open member dashboard                             |
| Admin       | Create Project         | Open form to add a new project                    |
| Admin       | Edit / Delete (project)| Edit or delete that project                       |
| Admin       | Approve / Reject (member) | Approve or reject membership request           |
| Admin       | Add note               | Save an admin note for that user                  |
| Admin (Pools) | Remove                | Remove that member from the pool                  |

---

If you tell me which part you are on (e.g. “I’m on the homepage” or “I’m in Admin”), I can give you the exact next clicks for that part.
