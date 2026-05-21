# Client Academy Sites (Nalanda & Modern Tech)

This is a Next.js App Router project acting as a shared codebase for two premium educational websites:
1. **Nalanda Career Academy** (Premium Academic, Navy/Gold/Cream)
2. **Modern Tech Academy** (Dark Futuristic, Cyan/Violet/Glassmorphism)

## Switch Websites

You can switch the active website by changing the environment variable in your `.env.local` file:
\`\`\`env
NEXT_PUBLIC_SITE_VARIANT=nalanda
# OR
NEXT_PUBLIC_SITE_VARIANT=tech
\`\`\`

## Features

- **Authentication**: Powered by Clerk (Sign In, Sign Up, Protected Dashboard)
- **Database**: Supabase integration structure ready
- **Payments**: Razorpay Standard Checkout integrated (API Routes + Frontend Checkout)
- **Styling**: Tailwind CSS v4, GSAP Animations, Framer Motion
- **Shared Architecture**: Same codebase, dynamic themes and content via `src/config/site.ts`

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the required keys for Clerk, Supabase, and Razorpay.

If you want PostHog analytics enabled, also add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and
`NEXT_PUBLIC_POSTHOG_HOST` to `.env.local` and your Vercel environment variables, then
redeploy. You can confirm incoming events in PostHog Activity.

### 3. Clerk Dashboard Configuration
To ensure the authentication flow works correctly with the custom registration page:
1. Go to your [Clerk Dashboard](https://dashboard.clerk.com).
2. Navigate to **Configure > Email, Phone, Web3**.
3. **Disable** the "Username" requirement (it must not be required).
4. Enable **Email** and **Google** login options.
5. Keep **Phone** login disabled (we collect Phone/WhatsApp numbers inside our custom app registration form instead).

### 4. Database Setup (Supabase)
To set up the database tables and starter data in your Supabase project:
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. In the left navigation menu, click on the **SQL Editor** tab (represented by the `SQL` icon).
3. Click **New Query** -> **New blank query**.
4. Open the local file `supabase/schema.sql` and copy its entire SQL contents.
5. Paste the SQL code into the Supabase SQL Editor text area.
6. Click the **Run** button (or press `Ctrl + Enter` / `Cmd + Enter`) to execute the script.
7. Verify that the tables (`profiles`, `courses`, `favorites`, `enrollments`, `payments`) are created in the **Table Editor** under the `public` schema.

### 4. Run Locally
\`\`\`bash
npm run dev
\`\`\`

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. For Nalanda Academy, set `NEXT_PUBLIC_SITE_VARIANT=nalanda` in Vercel Environment Variables.
4. For Modern Tech Academy, deploy a second project from the same repo and set `NEXT_PUBLIC_SITE_VARIANT=tech`.

## Testing Checklist

- [ ] Check if theme switches properly by modifying `NEXT_PUBLIC_SITE_VARIANT` and restarting the server.
- [ ] Verify Clerk Auth: Sign up, sign in, and access `/dashboard`.
- [ ] Verify Course Catalog: Navigate to `/courses` and click a course.
- [ ] Verify Checkout: On the course detail page, click "Enroll Now". Ensure Razorpay modal opens. Complete a test payment.
- [ ] Verify Payment Success: Ensure successful redirection to `/payment-success` with the course ID.
- [ ] Check responsive design on mobile and desktop.
