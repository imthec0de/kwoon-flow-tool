# Kwoon Flow Tool Code Review

## Current State Overview
- **Previewing the prototype**: Launch the Vite dev server locally via `npm install` then `npm run dev` and visit `http://localhost:5173`, or open the hosted Lovable workspace share link noted in `README.md`. This ensures you can click through the landing page and any newly wired routes during iterative development.
- The root route renders a minimal landing section with a heading and a subscription CTA button; no navigation or additional content is wired in. 【F:src/pages/Index.tsx†L1-L14】
- The subscription button simply redirects to a hard-coded Stripe Checkout URL (or environment override) with no state awareness of plan management. 【F:src/SubscribeButton.tsx†L1-L17】
- React Router currently exposes only the landing page and a generic 404 handler; dashboard features exist as standalone components but are not mounted anywhere. 【F:src/App.tsx†L1-L24】【F:src/components/Dashboard.tsx†L1-L137】
- Dashboard-related components (dashboard stats, class schedule, student roster, progress tracking) rely entirely on static mock data rather than application state or a backend. 【F:src/components/Dashboard.tsx†L7-L109】【F:src/components/ClassSchedule.tsx†L9-L86】【F:src/components/StudentRoster.tsx†L9-L91】【F:src/components/ProgressTracking.tsx†L5-L79】

## Essential Gaps to Address
1. **User & Staff Authentication**  
   Implement Supabase/Stripe login and role management (owners, instructors, students) to secure access to management tooling.

2. **Persistent Data Layer**  
   Replace hard-coded arrays with Supabase tables for students, classes, attendance, belt progress, and billing status to enable real CRUD operations.

3. **Dashboard Integration & Navigation**  
   Add layout scaffolding that mounts the dashboard, schedule, roster, and progress components behind authenticated routes with navigation state.

4. **CRUD Workflows & Forms**  
   Create forms/modals for managing classes, students, attendance, and progress updates; wire to mutations with optimistic updates and validation.

5. **Scheduling & Attendance Automation**  
   Support recurring class templates, attendance tracking (check-in/out, bulk updates), and automations for reminders or follow-ups.

6. **Progress & Belt Tracking Logic**  
   Define belt requirements, test dates, and automated progression logic instead of static descriptors.

7. **Communication & Notifications**  
   Integrate email/SMS pushes (e.g., via Supabase functions or third-party providers) for announcements, attendance alerts, and payment issues.

8. **Subscription & Billing Management**  
   Surface plan status, invoices, and upgrade/downgrade flows rather than redirect-only checkout.

9. **Analytics & Reporting**  
   Deliver trend visualizations (attendance, revenue, retention) and exportable reports to replace hard-coded metrics.

10. **Testing & CI/CD Coverage**  
    Add unit/integration tests for business logic, component behavior, and Supabase interactions, plus lint/test automation in CI.

11. **Accessibility & Internationalization**  
    Audit UI components for keyboard/screen reader support and prepare translation scaffolding for multi-language dojos.

12. **Operational Tooling**  
    Include environment configuration documentation, error monitoring (e.g., Sentry), and feature-flagging for staged rollouts.

These foundational capabilities will turn the current static prototype into a production-ready operations platform for martial arts dojos.
