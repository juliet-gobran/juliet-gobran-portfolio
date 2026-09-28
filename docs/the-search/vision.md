# Role Search Log — Vision & Intent

## The problem

Job hunting across multiple platforms (LinkedIn, Seek, NSW Government jobs, independent UX/design boards) is repetitive, fragmented, and easy to lose track of. There's no single place holding what "a good fit" actually means, what's been applied for, what happened next, or who was spoken to along the way. That fragmentation costs time and makes it hard to see the shape of the search as a whole — momentum, response rate, where things are stalling.

## Vision

A personal system that turns the job search from a scattered daily chore into a single, maintained source of truth — one place that defines what to look for, tracks what's happened, and eventually helps produce application material faster.

## Goals

- Reduce the time spent re-searching the same platforms from scratch each day.
- Keep one accurate record of every application, its status, and any contact made — rather than relying on memory or scattered inbox threads.
- Make the search's own progress visible: how much has gone out, what's active, what's converting.
- Eventually shorten the time it takes to go from "found a role" to "sent a tailored cover letter."
- Double as a demonstrable piece of design/build work — evidence of shipping a real tool, not just an artifact.

## Non-goals (for now)

- Fully autonomous, unattended searching. The search is run deliberately, in a chat, not as a background job.
- Logging in to LinkedIn/Seek on the user's behalf or scraping personalised, authenticated feeds.
- A fully public, unauthenticated deployment — the tracker holds real personal job-search data, so it stays access-controlled.

## Core components

1. **Search criteria** — a maintained definition of what counts as a relevant role: titles, locations, salary floor, exclusions, and notes on edge cases (e.g. a design-to-PM transition role at a small company).
2. **Search routine** — a repeatable way of checking NSW Government jobs and independent/niche UX & product design boards against that criteria, run on request rather than automatically.
3. **Application tracker** — a log of every application: company, role, platform, status, contact, last touchpoint, next step. The record of what's actually happened.
4. **Cover letter tone/voice tool** *(Phase 2, not yet built)* — see below.

## Guiding principles

- **The record should reflect reality, not aspiration.** Log what actually happened, including rejections and dead ends — the value is in an accurate picture, not a flattering one.
- **Manual where automation would be dishonest.** Where the tool can't see real data (an inbox, a LinkedIn account), it should ask for input rather than pretend to know.
- **Useful before polished.** Function for daily use comes first; a public-facing, portfolio-grade version is a later iteration once the tool has proven itself in actual use.

## Current state

- Hosted on Vercel.
- The application tracker exists as a working prototype (the Role Search Log), built once as a standalone page and now being ported into the Next.js portfolio as a permanent home.
- The search criteria are defined and stored alongside the tracker.
- The search routine and the cover letter tool are not yet built.

## Decisions

**Visibility.** The tracker lives on the portfolio site, kept off the main navigation and behind a password (see Access control below).

**Data storage.** Supabase (hosted Postgres) rather than JSON files, so data persists regardless of hosting platform or redeploys. All reads/writes go through Next.js API routes using Supabase's service-role key server-side — the frontend never talks to Supabase directly with the public anon key, so the password gate can't be bypassed by hitting the database's API straight from the browser.

**Access control.** Single shared password, implemented via Next.js middleware: a password-entry page sets a cookie on success, checked against an environment variable (not hardcoded). This is what actually restricts access — being off the nav menu is just tidiness on top of it.

**Cover letter tone/voice tool (Phase 2).** Scoped as a distinct, later phase. Process: an interview-style session where questions are asked to draw out voice and style, combined with source material Juliet will provide — resume, LinkedIn profile, and written case studies — used as evidence of skills and readiness rather than just tone reference. Not started yet.

**Repo visibility.** The portfolio repo stays public — it's meant to showcase the code itself, not just the live site. This makes secret handling non-negotiable rather than a nice-to-have: the Supabase service-role key and the shared password must only ever live in Vercel's environment variables, never hardcoded or committed. `.gitignore` should exclude `.env*` files before the first commit that touches real credentials, and it's worth a quick check of git history if any key is ever pasted into a file by mistake — a later commit removing it does not remove it from history.

## Open questions

None outstanding at this point — revisit if the hosting, storage, or access-control choices above change.

## Success looks like

Fewer minutes spent re-searching the same ground each morning, no application falling through the cracks unlogged, and — eventually — a cover letter turnaround measured in minutes rather than an evening.
