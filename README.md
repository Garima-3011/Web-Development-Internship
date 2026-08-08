# SkillSprint Dashboard — SaaS Major Project

Frontend-only **SaaS dashboard** for **SkillSprint** (job-ready skill sprints for students). Inspired by the SkillSprint minor-project landing page topic; the `Minor Project` folder is left unchanged.

## Problem

Data-heavy learning platforms need an intuitive mentor/admin dashboard to track students, courses, projects, and placements.

## Objective

Build a professional SaaS-style dashboard with charts, widgets, and client-side sessions.

## Tech stack

| Layer | Technology |
|-------|------------|
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | Vanilla JavaScript |
| Charts | Chart.js 4 (CDN) |
| Sessions | `localStorage` |

## How to run

1. Open `index.html` in a browser (or VS Code Live Server).
2. Sign in with demo credentials.

### Demo login

- **Email:** `admin@skillsprint.edu`
- **Password:** `admin123`

Alternate: `mentor@skillsprint.edu` / `mentor123`

## Features

### Dashboard overview
- **Total students**, **active courses**, **completed projects**, **internship placements**
- **Weekly learning progress** (line chart)
- **Course popularity** (bar chart)
- **Student activity** feed
- **Upcoming deadlines**
- **Recent enrollments**

### Other pages
- **Analytics** — progress ranges, enrollments vs projects, engagement, placement funnel
- **Students** — search, status filter, sort, pagination
- **Settings** — profile in session, soft dark mode toggle
- **Login** — remember-me + session guard on protected pages

## Project structure

```
Major Project/
├── index.html
├── dashboard.html
├── analytics.html
├── students.html
├── settings.html
├── css/
├── js/
├── README.md
└── Minor Project/     ← untouched (landing page inspiration only)
```

## Screenshots checklist

1. Login page  
2. Dashboard with KPIs + charts + deadlines/enrollments  
3. Analytics  
4. Students table  
5. Settings  
6. Mobile sidebar  

## Viva talking points

1. Major project is the **dashboard**; minor project is the **marketing landing** for the same SkillSprint product.
2. Sessions use `localStorage` — no backend required.
3. Charts use Chart.js with mock data in `js/data.js`.
4. Usability: sidebar, focus states, empty states, responsive layout.

## Outcome

Ability to build professional dashboard interfaces for a real product theme (student skill learning + placements).
