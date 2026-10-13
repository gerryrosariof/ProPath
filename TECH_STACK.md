# ProPath — Tech Stack & Project Guide

## Languages, Frameworks, and Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **TypeScript** | ^5.5.3 | Primary language for all source code; provides static typing across the entire app. |
| **React** | ^18.3.1 | UI framework; builds the page components and manages screen rendering. |
| **React DOM** | ^18.3.1 | Renders React components into the browser DOM. |
| **React Router DOM** | ^7.18.4 | Handles in-app navigation between pages (student, counselor, admin, public) without full page reloads. |
| **Vite** | ^5.4.2 | Build tool and dev server; bundles the app for production and serves it locally during development. |
| **Tailwind CSS** | ^3.4.1 | Utility-first CSS framework; styles every page via class names directly in JSX. |
| **PostCSS** | ^8.4.35 | CSS post-processor; transforms Tailwind directives into browser-ready CSS. |
| **Autoprefixer** | ^10.4.18 | PostCSS plugin; adds vendor prefixes to CSS rules automatically. |
| **Lucide React** | ^0.446.0 | Icon library; provides all UI icons (sidebar navigation, buttons, charts, status indicators). |
| **ESLint** | ^9.9.1 | Linter; catches code quality issues and enforces React hooks rules. |
| **TypeScript ESLint** | ^8.3.0 | ESLint plugin for TypeScript-specific linting rules. |
| **ESLint Plugin React Hooks** | ^5.1.0-rc.0 | ESLint rules for React hooks (effect dependencies, exhaustive deps). |
| **ESLint Plugin React Refresh** | ^0.4.11 | ESLint rules for Vite's fast-refresh / hot-module-replacement compatibility. |
| **@vitejs/plugin-react** | ^4.3.1 | Vite plugin enabling React Fast Refresh and JSX transform. |
| **@types/react** | ^18.3.5 | TypeScript type definitions for React. |
| **@types/react-dom** | ^18.3.0 | TypeScript type definitions for React DOM. |

## How to Read This Project — `src/` Folder Guide

### `src/App.tsx`
The root component. Wraps the entire app in four context providers (Auth, Profile, Assessment, Threshold) and defines every URL route. This is where you see the full list of pages and which roles can access them.

### `src/main.tsx`
The JavaScript entry point. Mounts the `App` component into the `<div id="root">` element in `index.html`.

### `src/index.css`
Global stylesheet. Imports Tailwind's base, component, and utility layers. Also contains print styles that hide navigation and expand content when a user prints a results page.

### `src/vite-env.d.ts`
TypeScript declaration file for Vite-specific environment types.

### `src/context/`
React Context providers that share state across the app without prop-drilling:

- **`AuthContext.tsx`** — Tracks who is logged in (student, counselor, or admin). Provides login, register, logout, and profile-status flags (`hasProfile`, `hasAssessment`, `hasResults`).
- **`ProfileContext.tsx`** — Stores the student's academic profile (strand, track, GWA, subject grades, target schools).
- **`AssessmentContext.tsx`** — Tracks assessment answers and completion status across all five instruments (academic, aptitude, interest, skill, personality).
- **`ThresholdContext.tsx`** — Stores the Low/Average/High cutoff thresholds used to categorize scores. Admins can adjust these.

### `src/data/`
Static data files (no backend). All app content that is hard-coded rather than fetched from a database lives here:

- **`assessments.ts`** — The five assessment instruments, each with their full question sets, options, and trait mappings.
- **`constants.ts`** — Mapping of academic tracks to their available senior-high strands.
- **`model.ts`** — C4.5 decision-tree model data: training records, model accuracy results, the full decision tree structure, and extracted decision rules. Also includes the program list used by the model.
- **`programs.ts`** — College program catalog: program definitions with descriptions, strand requirements, and career paths.
- **`recommendations.ts`** — Recommendation logic and decision-path data that maps a student's categorized profile to ranked program suggestions.
- **`thresholds.ts`** — Default Low/Average/High threshold values for each assessment instrument and GWA.
- **`users.ts`** — Seed user accounts used for demo login (one per role: student, counselor, admin).

### `src/utils/`
Shared types and pure logic functions:

- **`types.ts`** — Every TypeScript interface and type alias in the app (users, profiles, assessments, scores, model data, decision trees). This is the single source of truth for data shapes.
- **`categorize.ts`** — Scoring engine. Converts raw assessment answers into normalized percentages, categorizes them as Low/Average/High using thresholds, computes RIASEC top-3 codes, and builds the full `CategorizedProfile` used for recommendations. Also includes mock data generators for testing.

### `src/components/`
Reusable UI building blocks:

- **`ProtectedRoute.tsx`** — Wrapper that checks whether the logged-in user has the required role; redirects unauthorized users to the login page.
- **`assessment/LikertScale.tsx`** — Likert-scale rating input used in assessment questions.
- **`charts/BarChart.tsx`** — Custom bar chart component (no chart library; built with styled divs).
- **`charts/DonutChart.tsx`** — Custom donut/ring chart component.
- **`layout/AppShell.tsx`** — The main app layout frame (sidebar + topbar + content area) used by all authenticated pages.
- **`layout/Sidebar.tsx`** — Left navigation panel with role-specific menu items.
- **`layout/Topbar.tsx`** — Top header bar with user info and page context.
- **`ui/Badge.tsx`** — Small status/label badge (Low/Average/High, completed, etc.).
- **`ui/Button.tsx`** — Reusable button with variant styles.
- **`ui/Card.tsx`** — Reusable content card container.
- **`ui/Input.tsx`** — Reusable form input field.
- **`ui/ProgressBar.tsx`** — Progress indicator used in assessment completion.

### `src/pages/`
Every screen in the app, organized by role:

- **`Placeholder.tsx`** — Generic "coming soon" page for routes not yet built out.
- **`public/`** — Landing page, login form, and registration form (visible to everyone).
- **`student/`** — Student-facing screens: dashboard, academic profile form, assessment hub, test player, confirmation page, profile-category breakdown, results page, and program explanation detail.
- **`counselor/`** — Counselor-facing screens: dashboard, student list, individual student profile, and program explanation view.
- **`admin/`** — Admin-facing screens: dashboard, training data table, model performance page, decision tree viewer, program catalog, assessment item management, user management, and settings.

## What to Change for Revisions

### Changing assessment questions or adding instruments
Edit `src/data/assessments.ts`. Each instrument has a `questions` array with `id`, `text`, `type` (multiple-choice or likert), and `options` (each with `value` and optional `trait`). Add a new `InstrumentId` to `src/utils/types.ts` if you add a new instrument.

### Changing score thresholds (Low/Average/High cutoffs)
Edit `src/data/thresholds.ts`. Each entry has `lowMax` and `averageMax` — scores below `lowMax` are "Low", between `lowMax` and `averageMax` are "Average", above `averageMax` are "High". Admins can also change these at runtime via the Settings page (changes persist only for the current session).

### Changing the recommendation engine
Edit `src/data/recommendations.ts` for the recommendation mapping logic and `src/utils/categorize.ts` for how raw scores are normalized and categorized. The `categorizeProfile` function is the central entry point.

### Changing or adding college programs
Edit `src/data/programs.ts`. Each program has an `id`, `name`, `description`, strand requirements, and career paths. The model's program list in `src/data/model.ts` must stay in sync.

### Changing the C4.5 model data (training set, accuracy, decision tree)
Edit `src/data/model.ts`. This file contains `MOCK_TRAINING_DATA` (the training records), `MOCK_MODEL_RESULTS` (accuracy, confusion matrix, per-program metrics), `MOCK_DECISION_TREE` (the tree structure shown in the viewer), and `MOCK_DECISION_RULES` (extracted if-then rules).

### Changing user accounts or roles
Edit `src/data/users.ts` for seed/demo accounts. The `Role` type in `src/utils/types.ts` controls which roles exist. Route guards in `src/App.tsx` map roles to accessible pages.

### Changing colors, fonts, or global styles
Edit `src/index.css` for global styles and print rules. Tailwind utility classes are applied directly in each component's JSX — there is no separate theme file beyond `tailwind.config.js`. Extend the Tailwind theme there if you need custom colors or fonts.

### Changing navigation or adding a new page
Add the page component under `src/pages/` in the appropriate role folder, then add a `<Route>` in `src/App.tsx`. Wrap it in `<ProtectedRoute roles={[...]}>` if it requires authentication. Add a corresponding menu item in `src/components/layout/Sidebar.tsx`.

### Changing layout (sidebar, topbar, overall frame)
Edit `src/components/layout/AppShell.tsx` for the overall frame, `Sidebar.tsx` for navigation items, and `Topbar.tsx` for the header bar.
