# Golf App

A web app for logging and managing golf rounds. You can start a new round from the UI (stored in Supabase), with pages for home, sign-in, account creation, and profile wired for future work.

## Purpose

- **Track rounds** — Create round records (course, date, holes, tee time) backed by [Supabase](https://supabase.com).
- **Grow the product** — Routes exist for login, registration, and profile so you can add authentication and user-specific data next.

## Tech stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and builds
- [React Router](https://reactrouter.com/) for navigation
- [Supabase JS client](https://supabase.com/docs/reference/javascript/introduction) for the database API

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended; includes `npm`)

## Setup

1. **Install dependencies**

   ```bash
   cd golf-project
   npm install
   ```

2. **Configure Supabase**

   Create a project in the [Supabase dashboard](https://supabase.com/dashboard), then add a `.env` file in `golf-project` (same folder as `package.json`) with your project URL and anon key:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

   Vite only exposes variables prefixed with `VITE_` to the browser. Restart the dev server after changing `.env`.

3. **Database (for “Create Round”)**

   The app inserts into a `rounds` table. Ensure a table exists with at least columns matching the insert in `src/services/roundService.ts`, for example:

   - `played_date` (e.g. `date`)
   - `course_name` (`text`)
   - `holes_played` (`integer`)
   - `start_hole` (`integer`)
   - `tee_time` (`text` or `time`, depending on how you model it)

   Enable Row Level Security and policies that match how you want users to read/write rounds.

## Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### Other commands

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Serve the production build     |
| `npm run lint`  | Run ESLint                     |

## Routes

| Path             | Page        |
| ---------------- | ----------- |
| `/`              | Home        |
| `/login`         | Login       |
| `/create-account`| Create account |
| `/profile`       | Profile     |
| `/new-round`     | New round (create round in Supabase) |
