# DojoApp

DojoApp is a modern operations dashboard for martial arts schools. It brings scheduling, attendance tracking, belt progress, lead management, and billing insights into a single responsive interface.

## Tech stack

- [Vite](https://vitejs.dev/) + React 18
- TypeScript
- Tailwind CSS with shadcn/ui components
- TanStack Query for data fetching primitives

## Getting started locally

```sh
npm install
npm run dev
```

The app boots on [http://localhost:5173](http://localhost:5173) by default. Update `VITE_SUPABASE_URL.env` or add your own `.env` file if you connect to live data sources.

## Deployment notes

- The project is configured for Vercel; the production project name is **dojoapp**. If you rename it in Vercel again, be sure to update any related environment variables or webhooks there.
- Build command: `npm run build`
- Output directory: `dist`

## Useful scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – locally preview the production build
- `npm run lint` – run ESLint over the codebase
