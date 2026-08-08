# SkillSprint Dashboard — Complete Documentation

Beginner-friendly documentation for the **SkillSprint SaaS Dashboard** major project (HTML, CSS, JavaScript + Chart.js).

This file explains **what the app does**, **how folders are organised**, **what each file contains**, and **how everything works together** when you use the app in a browser.

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [File and folder structure](#2-file-and-folder-structure)
3. [File-by-file detailed breakdown](#3-file-by-file-detailed-breakdown)
   - [HTML files](#31-html-files)
   - [CSS files](#32-css-files)
   - [JavaScript files](#33-javascript-files)
4. [How components and files connect](#4-how-components-and-files-connect)
5. [Key logic and workflows](#5-key-logic-and-workflows)
6. [Demo credentials and how to run](#6-demo-credentials-and-how-to-run)
7. [Glossary for beginners](#7-glossary-for-beginners)

---

## 1. Project overview

### What is this app?

**SkillSprint Dashboard** is a **frontend-only** mentor/admin panel for a fictional learning product called **SkillSprint** (job-ready 30-day skill tracks for students).

Mentors can:

- Sign in (simulated login — no real server)
- See KPIs: total students, active courses, completed projects, internship placements
- View charts: weekly learning progress (line), course popularity (bar)
- Browse student activity, upcoming deadlines, and recent enrollments
- Open deeper **Analytics**, a searchable **Students** table, and **Settings**

### What it is *not*

- There is **no backend**, database, or real authentication API
- Data is **mock data** stored in JavaScript (`js/data.js`)
- Login only checks against a hard-coded demo user list and saves a session in the browser’s `localStorage`

### Overall architecture

```
┌─────────────┐     CSS styles      ┌─────────────┐
│  HTML pages │ ◄────────────────── │  css/*.css  │
└──────┬──────┘                     └─────────────┘
       │
       │  <script> tags load JS
       ▼
┌──────────────────────────────────────────────┐
│  js/auth.js     → session (localStorage)     │
│  js/data.js     → mock numbers & lists       │
│  js/charts.js   → Chart.js chart builders    │
│  js/layout.js   → sidebar, user chip, lists  │
│  page JS        → dashboard / analytics / …  │
└──────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│  Browser APIs: DOM, localStorage             │
│  External CDN: Chart.js + Google Fonts       │
└──────────────────────────────────────────────┘
```

**Multi-page app:** each screen is a separate `.html` file. Navigation uses normal links (`href="dashboard.html"`), not a single-page framework like React.

### Related folder: `Minor Project`

The workspace also contains a **Minor Project** landing page (`Minor Project/index.html` + `styles.css`). That is a separate conversion-focused marketing page for SkillSprint. It inspired the **topic/brand** of this dashboard but is **not loaded by** the dashboard app. This documentation focuses on the major-project dashboard.

---

## 2. File and folder structure

```
Major Project/
│
├── index.html              # Login page (entry point)
├── dashboard.html          # Main overview (KPIs, charts, widgets)
├── analytics.html          # Deeper charts + date range filter
├── students.html           # Student table (search / filter / sort)
├── settings.html           # Profile + theme preferences
│
├── css/
│   ├── variables.css       # Design tokens (colours, fonts, spacing)
│   ├── base.css            # Reset, typography, small utilities
│   ├── layout.css          # Sidebar, topbar, page grids
│   ├── components.css      # Buttons, cards, tables, forms, badges
│   └── auth.css            # Login page look and feel
│
├── js/
│   ├── auth.js             # Login, logout, session, theme helpers
│   ├── data.js             # Mock datasets + format helpers
│   ├── charts.js           # Chart.js configuration functions
│   ├── layout.js           # Shared shell: nav, sidebar, list renderers
│   ├── dashboard.js        # Overview page logic
│   ├── analytics.js        # Analytics page logic
│   ├── customers.js        # Students page logic (filename legacy)
│   └── settings.js         # Settings page logic
│
├── README.md               # Short project summary for submission
├── DOCUMENTATION.md        # This file (study guide)
│
└── Minor Project/          # Separate landing page (inspiration only)
    ├── index.html
    └── styles.css
```

### Purpose of each top-level item (quick)

| Path | Purpose |
|------|---------|
| `index.html` | Where users start; creates a session |
| `dashboard.html` … `settings.html` | Protected pages (need a valid session) |
| `css/` | All visual styling, split by concern |
| `js/` | All behaviour and data |
| `README.md` | Short run instructions + viva notes |
| `Minor Project/` | Unrelated landing page; do not confuse with dashboard |

---

## 3. File-by-file detailed breakdown

## 3.1 HTML files

### Shared pattern on protected pages

`dashboard.html`, `analytics.html`, `students.html`, and `settings.html` share the same **shell layout**:

```
app-shell
├── sidebar          (brand + nav links + Sign out)
└── main-area
    ├── topbar       (menu button + page title + user chip)
    └── content      (page-specific sections)
```

Also present:

- `#sidebarOverlay` — dark overlay behind the mobile sidebar
- `#menuToggle` — hamburger button (shown on small screens)
- `#logoutBtn` — clears session
- `#userName`, `#userEmail`, `#userAvatar` — filled by JavaScript from the session

Nav links use `data-page="dashboard"` (etc.) so `layout.js` can mark the active page.

Scripts at the bottom typically look like:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script src="js/auth.js"></script>
<script src="js/data.js"></script>
<script src="js/charts.js"></script>
<script src="js/layout.js"></script>
<script src="js/dashboard.js"></script>
```

Order matters: dependencies load **before** the page script that uses them.

---

### `index.html` — Login

**Role:** Entry page. Creates a user session.

**Main components:**

| Element | ID / class | Role |
|---------|------------|------|
| Brand row | `.auth-brand`, `.brand-mark` | SkillSprint logo mark + name |
| Headline | `.auth-headline` | “Mentor dashboard” |
| Demo note | `.auth-demo` | Shows evaluator credentials |
| Alert box | `#loginAlert` | Shows login errors |
| Form | `#loginForm` | Email + password + remember me |
| Email input | `#email` | User email |
| Password input | `#password` | User password |
| Checkbox | `#remember` | Save email in `localStorage` |
| Submit button | `.btn-primary` | Triggers login |

**CSS linked:** `variables.css`, `base.css`, `components.css`, `auth.css`  
**JS:** `auth.js` + a small inline script that handles form submit.

**Structural layout:** Full-page centered card (`.auth-page` → `.auth-card`). No sidebar.

---

### `dashboard.html` — Overview

**Role:** Home screen after login. Shows the main widgets from the project brief.

**Key sections:**

1. **KPI grid** (`.grid-kpis`)
   - `#kpiStudents` — Total students  
   - `#kpiCourses` — Active courses  
   - `#kpiProjects` — Completed projects  
   - `#kpiPlacements` — Internship placements  
   - Matching `#kpi…Delta` elements for trend text  

2. **Charts** (`.grid-charts`)
   - `#progressChart` — Weekly learning progress (line)  
   - `#popularityChart` — Course popularity (bar)  
   - Skeleton divs like `#progressChart-skeleton` show a loading shimmer until charts draw  

3. **Two columns** (`.grid-two`)
   - `#activityFeed` — Student activity list  
   - `#deadlineList` — Upcoming deadlines  

4. **Enrollments**
   - `#enrollmentList` — Recent enrollments  

---

### `analytics.html` — Analytics

**Role:** Extra charts and a client-side date-range filter.

**Key elements:**

| Element | Purpose |
|---------|---------|
| `#dateRange` | `<select>`: `30d` / `90d` / `12m` |
| `#rangeNote` | Helper text describing the selected range |
| `#analyticsProgressChart` | Learning progress line chart |
| `#comparisonChart` | Enrollments vs projects (bar) |
| `#engagementChart` | Active learners / study sessions (line) |
| `#funnelChart` | Placement funnel (horizontal bar) |
| `#channelChart` | Acquisition channels (doughnut) |

---

### `students.html` — Students table

**Role:** Browse mock student records with search, filter, sort, and pagination.

**Key elements:**

| Element | Purpose |
|---------|---------|
| `#studentSearch` | Live search box |
| `#statusFilter` | Filter by active / trial / paused / placed / churned |
| `#studentsBody` | Table body filled by JS |
| `#studentsEmpty` | Empty-state message when no rows match |
| `#studentsTableWrap` | Wraps the table (hidden when empty) |
| `#pageInfo` | “Showing 1–8 of 16” |
| `#prevPage` / `#nextPage` | Pagination buttons |
| `th[data-sort="…"]` | Clickable headers for sorting |

**Note:** Page logic lives in `js/customers.js` (older filename). Behaviour is for students.

---

### `settings.html` — Settings

**Role:** Edit profile stored in the session; toggle soft dark mode; clear session.

**Key elements:**

| Element | Purpose |
|---------|---------|
| `#settingsAlert` | Success/error messages |
| `#profileForm` | Profile form |
| `#profileName` | Editable name |
| `#profileEmail` | Editable email |
| `#profileRole` | Read-only role |
| `#themeToggle` | Dark mode switch |
| `#resetDemo` | Sign out and clear session |

---

## 3.2 CSS files

### Styling approach

- **No CSS framework** (no Bootstrap/Tailwind)
- Styles split by responsibility (variables → base → layout → components → auth)
- **CSS custom properties** (variables) keep colours and spacing consistent
- **Utility classes** like `.hidden`, `.text-muted`, `.font-display` for small helpers
- **Responsive design** via `@media` breakpoints

---

### `css/variables.css`

Defines the design system on `:root`:

| Variable group | Examples | Used for |
|----------------|----------|----------|
| Brand colours | `--color-primary` (`#0c6e72`) | Buttons, active nav, charts |
| Surfaces | `--color-bg`, `--color-surface` | Page and card backgrounds |
| Text | `--color-text`, `--color-text-muted` | Headings and secondary copy |
| Status | `--color-success`, `--color-danger`, … | Badges, deltas, alerts |
| Fonts | `--font-sans` (Sora), `--font-display` (Fraunces) | UI vs brand headings |
| Layout | `--sidebar-width`, `--topbar-height` | Shell spacing |
| Motion | `--transition`, `--focus-ring` | Hover and keyboard focus |

**Theme override:**

```css
[data-theme="dark"] { /* soft slate dark theme */ }
```

JavaScript sets `data-theme` on `<html>` when the user toggles dark mode in Settings.

---

### `css/base.css`

- Resets margins/padding (`*` box-sizing)
- Default `body` font and background
- Heading and link styles
- `:focus-visible` uses `--focus-ring` for accessibility
- Utilities: `.sr-only`, `.hidden`, `.flex`, `.mt-4`, colour helpers

---

### `css/layout.css`

**Main classes:**

| Class | Purpose |
|-------|---------|
| `.app-shell` | Flex container for sidebar + main |
| `.sidebar` | Fixed left navigation |
| `.sidebar.open` | Visible on mobile |
| `.main-area` | Content area with left margin = sidebar width |
| `.topbar` | Sticky header |
| `.menu-toggle` | Hamburger (hidden on desktop) |
| `.content` | Page padding |
| `.grid-kpis` | 4-column KPI grid |
| `.grid-charts` | ~1.6fr / 1fr chart grid |
| `.grid-two` | Two equal columns |
| `.sidebar-overlay` | Mobile dimmed backdrop |

**Responsive queries:**

| Breakpoint | Behaviour |
|------------|-----------|
| `max-width: 1200px` | KPI grid → 2 columns; chart grids → 1 column |
| `max-width: 900px` | Sidebar off-canvas; hamburger shown |
| `max-width: 560px` | KPI grid → 1 column; tighter padding |

---

### `css/components.css`

Reusable UI pieces:

- **Buttons:** `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.btn-danger`, `.btn-sm`, `.btn-block`
- **Cards / KPIs:** `.card`, `.kpi-card`, `.kpi-value`, `.kpi-delta.up|down`
- **Charts:** `.chart-wrap`, `.chart-skeleton` + `@keyframes shimmer`
- **Forms:** `.form-group`, `.form-input`, `.form-select`, `.checkbox-row`
- **Table:** `.data-table`, sortable header cues
- **Badges:** `.badge-active`, `.badge-trial`, `.badge-placed`, etc.
- **Lists:** `.activity-item`, `.list-row`
- **Pagination / empty / alerts**
- **Settings:** `.settings-grid`, `.switch` toggle

**Animation:** skeleton shimmer while charts load:

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### `css/auth.css`

Login-only styles:

- `.auth-page` — full viewport, teal/sand gradient + subtle grid
- `.auth-card` — frosted white card with `@keyframes authIn` fade-up
- `.auth-demo` — dashed box for demo credentials
- Brand typography using Fraunces

---

## 3.3 JavaScript files

### External libraries (CDN)

| Library | Where | Purpose |
|---------|-------|---------|
| **Chart.js 4.4.1** | dashboard + analytics pages | Draws charts on `<canvas>` |
| **Google Fonts** | all pages | Sora + Fraunces |

There are **no REST API calls** to your own backend. Chart.js and fonts are the only external network resources.

---

### `js/auth.js` — Sessions and theme

**Storage keys:**

```js
SESSION_KEY  = "skillsprint_session"
THEME_KEY    = "skillsprint_theme"
REMEMBER_KEY = "skillsprint_remember"
```

**Demo users (`DEMO_USERS`):**

| Email | Password | Role |
|-------|----------|------|
| `admin@skillsprint.edu` | `admin123` | Administrator |
| `mentor@skillsprint.edu` | `mentor123` | Mentor |

**Important functions:**

| Function | What it does |
|----------|----------------|
| `getSession()` / `setSession()` / `clearSession()` | Read/write/remove session JSON |
| `isAuthenticated()` | True if session has email + `loggedInAt` |
| `requireAuth()` | If not logged in → redirect to `index.html` |
| `redirectIfAuthenticated()` | If already logged in → go to dashboard |
| `login(email, password, remember)` | Validate demo user; save session; optional remember email |
| `logout()` | Clear session → login page |
| `updateProfile({ name, email })` | Patch session fields |
| `applyTheme()` / `loadTheme()` | Set `data-theme` on `<html>` |
| `getInitials(name)` | Avatar letters (e.g. “AM”) |

`loadTheme()` runs as soon as the script loads so the theme applies early.

**Session object shape:**

```js
{
  name: "Admin Mentor",
  email: "admin@skillsprint.edu",
  role: "Administrator",
  loggedInAt: "2026-07-20T15:30:00.000Z"
}
```

---

### `js/data.js` — Mock data

**Main object:** `PulseData` (name is historical; content is SkillSprint learning data).

Contains:

- `kpis` — students, courses, projects, placements (+ deltas)
- `weeklyProgress` — line chart series for `30d` / `90d` / `12m`
- `coursePopularity` — bar chart labels + enrollments
- `activity`, `deadlines`, `recentEnrollments` — list widgets
- `customers` — student rows for the table (id, name, email, plan/track, status, …)
- Extra series used on Analytics: `monthlyComparison`, `engagement`, `funnel`, `channelSplit`

**Helpers:**

- `formatNumber(n)` — Indian locale grouping  
- `formatCurrency(n)` — INR formatting (available if needed)  
- `formatPercent(n)` — adds `%`

---

### `js/charts.js` — Chart builders

**`ChartTheme`** — colour palette matching CSS teal/accent.

**Functions (each takes a canvas element `id`):**

| Function | Chart type | Used on |
|----------|------------|---------|
| `createWeeklyProgressChart` | Line | Dashboard, Analytics |
| `createCoursePopularityChart` | Bar | Dashboard |
| `createChannelChart` | Doughnut | Analytics |
| `createComparisonChart` | Grouped bar | Analytics |
| `createEngagementChart` | Multi line | Analytics |
| `createFunnelChart` | Horizontal bar | Analytics |
| `createRevenueChart` | Alias of weekly progress | Compatibility |
| `hideSkeleton(id)` | Hides loading shimmer | All charts |

Each chart:

1. Finds the `<canvas>` by id  
2. Hides the matching skeleton  
3. Returns a `new Chart(...)` instance  

---

### `js/layout.js` — Shared UI behaviour

| Function | Role |
|----------|------|
| `initLayout(activePage)` | `requireAuth()`, fill user chip, highlight nav, wire menu/logout |
| `renderActivityFeed(id)` | Build activity `<li>` HTML from `PulseData.activity` |
| `renderDeadlines(id)` | Build deadline rows |
| `renderEnrollments(id)` | Build enrollment rows |

**Event listeners inside `initLayout`:**

- `#menuToggle` click → open/close sidebar  
- `#sidebarOverlay` click → close sidebar  
- `#logoutBtn` click → `logout()`  
- `window.resize` → close sidebar if width > 900px  

---

### `js/dashboard.js`

On `DOMContentLoaded`:

1. `initLayout("dashboard")`  
2. Fill KPI text from `PulseData.kpis`  
3. After 350ms, create progress + popularity charts (skeleton visible briefly)  
4. Render activity, deadlines, enrollments  

---

### `js/analytics.js`

On load:

1. `initLayout("analytics")`  
2. Create five charts  
3. Listen to `#dateRange` `change` → destroy/recreate progress chart with new dataset; update `#rangeNote`  

---

### `js/customers.js` (Students page)

Holds **local UI state**:

```js
{
  query: "",
  status: "all",
  sortKey: "name",
  sortDir: "asc",
  page: 1,
  pageSize: 8
}
```

**Flow each time UI changes:**

1. Filter `PulseData.customers` by status + search text  
2. Sort by selected column  
3. Slice current page  
4. Render table rows (or empty state)  
5. Update pagination labels/buttons  

**Listeners:** search `input`, status `change`, header clicks (sort), prev/next page.

---

### `js/settings.js`

1. Prefill form from session  
2. Sync theme checkbox with `skillsprint_theme`  
3. Theme toggle → `applyTheme()`  
4. Form submit → `updateProfile()` + refresh topbar user chip  
5. Reset button → confirm → `logout()`  

---

## 4. How components and files connect

### Link graph (runtime)

```
index.html
  ├── css: variables, base, components, auth
  └── js: auth.js (+ inline login handler)
        │
        │  successful login → localStorage session
        ▼
dashboard.html / analytics.html / students.html / settings.html
  ├── css: variables, base, layout, components
  ├── js: auth.js          (guard + session helpers)
  ├── js: data.js          (mock data)          [except settings]
  ├── js: charts.js        (if page has charts)
  ├── js: layout.js        (shell behaviour)
  └── js: page-specific    (dashboard / analytics / customers / settings)
```

### How HTML ↔ CSS connect

HTML uses **classes** and **ids**. CSS targets them:

```html
<article class="card kpi-card">
  <div class="kpi-value" id="kpiStudents">—</div>
</article>
```

```css
.kpi-card { /* padding */ }
.kpi-value { /* large number style */ }
```

Stylesheets are linked in `<head>` with `<link rel="stylesheet" href="css/...">`.

### How HTML ↔ JS connect

JavaScript finds elements with `document.getElementById(...)` or `querySelector(...)`, then:

- Sets `.textContent` / `.innerHTML` (dynamic UI)
- Adds `addEventListener` (clicks, submit, input)
- Creates Chart.js instances on `<canvas id="...">`

### How JS files share data

Scripts are **classic (non-module)** scripts, so functions and variables become **global** on `window`:

- `PulseData` from `data.js` is visible to `dashboard.js` and `charts.js`
- `login` / `requireAuth` from `auth.js` are visible to layout and page scripts
- Chart creators from `charts.js` are called by page scripts

That is why script **order** in HTML is important.

### State management (simple model)

| Kind of state | Where it lives |
|---------------|----------------|
| Logged-in user | `localStorage` → `skillsprint_session` |
| Remembered email | `localStorage` → `skillsprint_remember` |
| Dark mode | `localStorage` → `skillsprint_theme` + `data-theme` on `<html>` |
| Students table filters | In-memory object inside `customers.js` |
| Chart data | Static `PulseData` (not editable by user) |

There is no Redux/Vuex — just browser storage + page-local variables.

---

## 5. Key logic and workflows

### Workflow A — Login

```
1. User opens index.html
2. redirectIfAuthenticated()
   → if session exists, jump to dashboard.html
3. Optional: fill email from getRememberedEmail()
4. User submits #loginForm
5. Inline script calls login(email, password, remember)
6. auth.js finds matching DEMO_USERS entry
   → FAIL: show #loginAlert
   → OK: setSession(...); maybe save remember email
7. Browser navigates to dashboard.html
```

**Code idea:**

```js
const result = login(email, password, remember);
if (!result.ok) {
  alertEl.textContent = result.error;
  alertEl.classList.remove("hidden");
  return;
}
window.location.href = "dashboard.html";
```

---

### Workflow B — Opening a protected page

```
1. Page loads scripts
2. Page JS runs DOMContentLoaded
3. initLayout("dashboard" | "analytics" | "students" | "settings")
4. requireAuth()
   → no session? redirect to index.html and stop
5. Fill #userName, #userEmail, #userAvatar
6. Add .active to matching .nav-link[data-page]
7. Attach sidebar + logout listeners
8. Page-specific code continues (charts, table, form)
```

---

### Workflow C — Dashboard paints widgets

```
1. Read PulseData.kpis → write into KPI elements
2. Wait ~350ms (shows shimmer skeletons)
3. createWeeklyProgressChart("progressChart")
4. createCoursePopularityChart("popularityChart")
5. renderActivityFeed("activityFeed")
6. renderDeadlines("deadlineList")
7. renderEnrollments("enrollmentList")
```

Lists are built as HTML strings and injected with `innerHTML`.

---

### Workflow D — Analytics date range change

```
1. User changes #dateRange (30d / 90d / 12m)
2. Destroy existing progress chart instance
3. createWeeklyProgressChart(..., newRange)
4. Update #rangeNote text
```

Other charts stay as-is (only progress series is range-aware in the mock data).

---

### Workflow E — Students search / filter / sort / page

```
1. User types in #studentSearch OR changes status OR clicks a column header OR clicks Next
2. Update local state object
3. getFiltered() → filter + sort PulseData.customers
4. Slice rows for current page (8 per page)
5. If zero rows → show empty state, hide table
6. Else render <tr> rows with status badges
7. Enable/disable Previous/Next; update “Showing x–y of z”
```

---

### Workflow F — Settings save + theme

```
Theme toggle:
  change on #themeToggle
  → applyTheme("dark" | "light")
  → sets data-theme + localStorage

Save profile:
  submit #profileForm
  → updateProfile({ name, email })
  → rewrite session in localStorage
  → refresh topbar name/email/avatar
  → show success alert briefly

Clear session:
  click #resetDemo → confirm → logout()
```

---

### Workflow G — Mobile sidebar

```
1. Screen ≤ 900px → sidebar translated off-screen; hamburger visible
2. Click #menuToggle → add .open to #sidebar + .visible to overlay
3. Click overlay (or resize wider) → close sidebar
```

---

## 6. Demo credentials and how to run

### Run locally

1. Open the `Major Project` folder in VS Code  
2. Open `index.html` in a browser **or** use the Live Server extension  
3. Sign in with a demo account  

### Demo accounts

| Email | Password |
|-------|----------|
| `admin@skillsprint.edu` | `admin123` |
| `mentor@skillsprint.edu` | `mentor123` |

### Clear a stuck session

- Use **Sign out** in the sidebar, or  
- Settings → **Sign out & clear session**, or  
- Browser DevTools → Application → Local Storage → delete `skillsprint_*` keys  

---

## 7. Glossary for beginners

| Term | Meaning in this project |
|------|-------------------------|
| **Frontend-only** | Everything runs in the browser; no server database |
| **`localStorage`** | Browser key/value storage that survives refresh |
| **Session** | Object proving “this browser is logged in” |
| **Mock data** | Fake but realistic numbers for demos |
| **CDN** | Online copy of a library (Chart.js) loaded by URL |
| **DOM** | The HTML tree JavaScript can read and change |
| **Event listener** | Code that runs when the user clicks/types/submits |
| **Responsive** | Layout adapts to phone vs desktop widths |
| **KPI** | Key Performance Indicator (big summary number) |
| **Canvas** | HTML element Chart.js draws graphs onto |

---

## Quick study checklist

Use this when preparing a viva or lab demo:

- [ ] Explain why login works without a server (`DEMO_USERS` + `localStorage`)  
- [ ] Point to `PulseData` as the source of charts and tables  
- [ ] Show how `dashboard.html` links CSS and JS  
- [ ] Describe one chart function in `charts.js`  
- [ ] Walk through student search → filter → pagination  
- [ ] Mention responsive sidebar behaviour under 900px  
- [ ] Clarify that `Minor Project/` is a separate landing page  

---

*End of documentation — SkillSprint Dashboard (HTML / CSS / JavaScript major project).*
