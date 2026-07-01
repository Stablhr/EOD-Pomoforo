# Product Requirements Document
## EOD Report Builder with Pomodoro Timer

**Version:** 1.0
**Owner:** Eyris
**Stack:** ReactJS + Tailwind CSS
**Date:** July 2026

---

## 1. Overview

A single-page web app that helps a freelancer/VA quickly build a clean, copy-paste-ready End of Day (EOD) report, with a standalone Pomodoro timer built into the same interface to support focused work sessions. The app is light-mode, minimal, and uses custom SVG icons rather than emoji or icon-font packs, so the visual identity stays consistent and lightweight.

**Core value:** Reduce the friction of writing an EOD report from a blank message every day to filling structured fields and clicking one button.

---

## 2. Goals & Non-Goals

### Goals
- Let the user log multiple tasks per day, each with hours spent.
- Auto-fill/select today's date, with the option to change it (for late reports).
- Capture "important notes / blockers / needs" as a free-text field.
- Generate a clean, readable, plain-text report formatted for pasting into Slack, Email, Notion, Discord, etc.
- One-click "Copy to Clipboard" with visual confirmation.
- Save report history locally (localStorage) so past EODs can be reviewed, reopened, or re-copied.
- Provide a standalone Pomodoro timer (25/5 default, configurable) as a focus tool — **not** wired into the report's hour calculations, since the user chose to keep these independent.
- Keep the UI minimal: light background, generous whitespace, one accent color, custom SVGs.

### Non-Goals (v1)
- No backend/server — fully client-side, localStorage only.
- No multi-user/team accounts or auth.
- No calendar/analytics dashboard (could be v2).
- No auto-logging of Pomodoro sessions into task hours (explicitly decoupled per your answer — flagged as a possible v2 toggle, see §9).

---

## 3. Reference & Design Direction

The uploaded image (colorful rounded "blob" characters on dark background) was used as a *mood/character reference*, not a literal UI reference. Since you chose **light mode, clean & minimal**, we'll translate that mood into:

- Soft rounded corners (`rounded-2xl` / `rounded-3xl`) echoing the blob shapes.
- One confident accent color (candidates: indigo `#6366F1`, teal `#14B8A6`, or amber `#F59E0B` — pick one in kickoff) used sparingly for buttons, active states, and icons.
- Neutral base palette: white/`gray-50` backgrounds, `gray-800/900` text, `gray-200` borders.
- Soft drop shadows (`shadow-sm`/`shadow-md`) instead of hard borders, similar to the soft-lit blob rendering in the reference.
- Friendly, rounded custom SVG icons (2px stroke, rounded line caps) rather than sharp/technical icon sets — keeps the "eye-catchy but minimal" feel from the reference without importing its dark theme.

---

## 4. Users & Use Case

**Primary user:** You (Eyris) — a General VA who needs to send an EOD report to clients daily, summarizing tasks completed, hours worked, and any blockers/needs. Secondary: any freelancer/remote worker with the same daily reporting habit.

**Primary flow:**
1. Open app → date is pre-filled with today.
2. Add task rows (task name + hours) for everything done that day.
3. Add any important notes/blockers/needs.
4. Preview the generated report text.
5. Click "Copy to Clipboard" → confirmation toast/checkmark.
6. Paste into Slack/Email/Notion/client platform.
7. (Optional) Use the Pomodoro timer any time during the day to stay focused — independent of the report.
8. Report auto-saves to history; can revisit past days from a sidebar/drawer.

---

## 5. Feature Breakdown

### 5.1 EOD Report Builder

| Field | Type | Behavior |
|---|---|---|
| Date | Date picker | Defaults to today (`new Date()`), editable, formatted as e.g. `July 1, 2026` in the output |
| Tasks | Dynamic list | Each row: Task name (text input) + Hours (number input, step 0.25 or 0.5). "+ Add Task" button appends a row. Each row has a delete (trash SVG) icon. Minimum 1 row shown by default. |
| Total Hours | Auto-calculated, read-only | Sum of all task hours, live-updated, displayed prominently |
| Important Notes / Needs | Textarea | Free text — blockers, requests, follow-ups needed from client |
| Generated Report Preview | Read-only formatted block | Live preview matching the copy output exactly |
| Copy to Clipboard button | Button | Uses `navigator.clipboard.writeText()`; shows a checkmark/"Copied!" state for ~2s |
| Save/Clear | Buttons | "Save Report" (writes to localStorage history) and "Clear Form" (resets fields, with confirm if fields are filled) |

**Default report text format** (editable later, but here's a clean starting template):

```
📋 End of Day Report — July 1, 2026

✅ Tasks Completed:
- Bookkeeping reconciliation (QuickBooks) — 2.5 hrs
- Lead data entry & CRM update — 1.5 hrs
- Client email follow-ups — 1 hr

🕒 Total Hours: 5 hrs

📝 Notes / Needs:
- Waiting on updated vendor invoice from client to finish reconciliation.

— Eyris
```

*(Emoji vs plain-text-only labels should be a toggle or a decision made in kickoff — some clients/platforms render emoji oddly. Recommend defaulting to plain text with bold-style dashes, and offering an "emoji style" toggle as a nice-to-have.)*

### 5.2 Report History (localStorage)

- Every "Save Report" writes an entry: `{ id, date, tasks[], totalHours, notes, createdAt }`.
- Sidebar or collapsible drawer lists past reports by date, most recent first.
- Clicking a past entry loads it into the preview (read-only) with its own "Copy" button.
- Optional: delete individual history entries.
- Storage key suggestion: `eod_reports_v1` (array of report objects, JSON-stringified).

### 5.3 Pomodoro Timer (Standalone)

- Independent card/section — visually separate from the report form (e.g., a collapsible panel or a separate tab/toggle: "Report" / "Focus Timer").
- Default: 25 min focus / 5 min short break / 15 min long break after 4 sessions (standard Pomodoro technique) — all configurable via a small settings icon.
- Controls: Start, Pause, Reset (SVG play/pause/reset icons).
- Circular progress ring (SVG `<circle>` with `stroke-dasharray` animation) showing time remaining — matches the "minimal but eye-catching" goal.
- Session counter (e.g., "Session 2 of 4").
- Optional browser notification / sound chime on session end (nice-to-have, ask permission).
- Explicitly **not** linked to task hours — purely a focus aid, per your preference.

---

## 6. Tech Stack & Libraries

- **React** (Vite recommended for fast setup, consistent with your church-app stack).
- **Tailwind CSS** for styling.
- **No external icon library** — custom-built SVG icons (see §7).
- **State:** React `useState`/`useReducer`; no Redux needed at this scale.
- **Persistence:** `localStorage` via a small custom hook (`useLocalStorage`).
- **Clipboard:** native `navigator.clipboard.writeText()` with a `try/catch` fallback (`document.execCommand('copy')`) for older browsers.
- **Date handling:** native `Date` + `Intl.DateTimeFormat`, or lightweight `date-fns` if formatting gets complex (optional, avoid heavy libs like moment.js).
- **Font:** system font stack or one Google Font (e.g., Inter — you already use it in your church app, keeps consistency).

---

## 7. Custom SVG Icon List

All icons: 24x24 viewBox, 2px stroke, rounded caps, currentColor for easy theming.

| Icon | Used for |
|---|---|
| Plus (circle or square) | "Add Task" button |
| Trash/Bin | Delete task row |
| Clock | Total hours label / Pomodoro tab |
| Calendar | Date field |
| Checklist/Clipboard | Report section header |
| Note/Pencil | Notes field |
| Copy (two overlapping squares) | Copy to Clipboard button |
| Checkmark | Copy success confirmation |
| Play / Pause | Pomodoro controls |
| Refresh/Reset | Pomodoro reset |
| Settings/Gear | Pomodoro settings |
| Chevron (left/right or down) | History drawer toggle, collapsibles |
| History/Clock-back | History panel icon |
| Trash (small) | Delete history entry |

---

## 8. Suggested Component Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── TabSwitcher.jsx        // Report / Focus Timer toggle
│   ├── report/
│   │   ├── ReportForm.jsx
│   │   ├── TaskRow.jsx
│   │   ├── TaskList.jsx
│   │   ├── NotesField.jsx
│   │   ├── ReportPreview.jsx
│   │   ├── CopyButton.jsx
│   │   └── TotalHours.jsx
│   ├── history/
│   │   ├── HistoryDrawer.jsx
│   │   └── HistoryItem.jsx
│   ├── pomodoro/
│   │   ├── PomodoroTimer.jsx
│   │   ├── TimerRing.jsx           // SVG circular progress
│   │   ├── TimerControls.jsx
│   │   └── PomodoroSettings.jsx
│   └── icons/
│       └── index.jsx               // all SVG icon components exported here
├── hooks/
│   ├── useLocalStorage.js
│   ├── usePomodoro.js
│   └── useClipboard.js
├── utils/
│   ├── formatReport.js             // builds the plain-text report string
│   └── formatDate.js
├── App.jsx
└── main.jsx
```

---

## 9. Step-by-Step Build Plan

**Phase 1 — Setup (Day 1)**
1. Scaffold project: `npm create vite@latest eod-report -- --template react`
2. Install & configure Tailwind CSS.
3. Set up folder structure above, add Inter font, set base Tailwind theme (colors, radius, shadows) in `tailwind.config.js`.
4. Build the icon library (`components/icons/index.jsx`) with all icons from §7 as reusable components.

**Phase 2 — Report Form (Day 2–3)**
5. Build `ReportForm.jsx` shell with Date field, Task list, Notes field — no logic yet, static layout.
6. Implement `TaskRow.jsx` + `TaskList.jsx` with add/remove functionality (`useState` array of `{id, name, hours}`).
7. Implement `TotalHours.jsx` — derived value from task list.
8. Build `utils/formatReport.js` — pure function that takes `{date, tasks, totalHours, notes}` and returns the formatted string.
9. Build `ReportPreview.jsx` — renders the live output of `formatReport()`.

**Phase 3 — Copy & Persistence (Day 3–4)**
10. Build `useClipboard.js` hook + `CopyButton.jsx` with success state animation (icon swap to checkmark, 2s timeout).
11. Build `useLocalStorage.js` hook.
12. Implement "Save Report" → writes to history array in localStorage.
13. Build `HistoryDrawer.jsx` + `HistoryItem.jsx` — list, click-to-load, delete entry.

**Phase 4 — Pomodoro Timer (Day 4–5)**
14. Build `usePomodoro.js` hook: countdown logic, session state machine (focus → short break → focus → ... → long break), start/pause/reset.
15. Build `TimerRing.jsx` — SVG circle with animated `stroke-dashoffset` tied to time remaining.
16. Build `TimerControls.jsx` (play/pause/reset icons) and `PomodoroSettings.jsx` (duration inputs).
17. Wire into `PomodoroTimer.jsx`, add optional sound/notification on session end.

**Phase 5 — Layout, Polish, Responsiveness (Day 5–6)**
18. Build `TabSwitcher.jsx` to toggle between "Report" and "Focus Timer" views (or side-by-side on desktop, stacked on mobile).
19. Responsive pass: mobile-first Tailwind breakpoints, test on small screens.
20. Empty states (no tasks yet, no history yet), input validation (hours > 0, task name required before adding).
21. Micro-interactions: button hover/active states, smooth transitions (`transition-all duration-200`), copy confirmation animation.
22. Accessibility pass: label all inputs, keyboard navigation for timer controls, sufficient color contrast (WCAG AA).

**Phase 6 — Testing & Ship (Day 6–7)**
23. Manual test: full report flow, clipboard on Chrome/Firefox/Safari + mobile, localStorage persistence across refresh, Pomodoro across tab-inactive (verify timer accuracy using timestamps, not just `setInterval` ticks).
24. Deploy (Vercel/Netlify — static React app, zero backend needed).

---

## 10. Open Decisions for Kickoff

Before coding starts, confirm:
1. **Accent color** — indigo, teal, or amber (pick one for buttons/active states).
2. **Report text style** — emoji-labeled sections (📋 ✅ 🕒 📝) vs. plain text with bold labels only. Some client platforms (email especially) render emoji inconsistently.
3. **Layout for Report vs. Pomodoro** — tabs (switch between views) vs. side-by-side split screen on desktop.
4. **Hours input** — free number input vs. increment buttons (+0.25/+0.5) vs. dropdown of common values.
5. **Sign-off line** — should the report always end with your name, or should that be a configurable "signature" field saved in settings?

---

## 11. Future Enhancements (v2 ideas, not in scope now)

- Toggle to auto-log completed Pomodoro sessions as hours against a selected task (you can revisit this later even though it's off for v1).
- Weekly/monthly summary view aggregating hours from history.
- Export history to CSV/PDF.
- Multiple report templates (client A vs. client B format).
- Dark mode toggle.

---

## 12. Acceptance Criteria (v1 "Done")

- [ ] User can add/remove multiple task rows with name + hours.
- [ ] Total hours auto-calculates correctly.
- [ ] Date defaults to today and is editable.
- [ ] Notes field captures free text.
- [ ] Live preview matches exactly what gets copied.
- [ ] "Copy to Clipboard" works and shows confirmation.
- [ ] Reports persist in localStorage and reload correctly after browser refresh.
- [ ] Past reports viewable and re-copyable from history.
- [ ] Pomodoro timer runs accurately, is pausable/resettable, and is fully independent of report data.
- [ ] All icons are custom SVGs, no external icon library.
- [ ] Layout is responsive (mobile + desktop) and passes a basic accessibility check.
