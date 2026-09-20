---
name: Ticket (one agent session, one PR)
about: A group of tasks that share one context, consolidated into one ticket and one PR, with every decision made before filing so an agent can pick it up cold.
title: 'TICKET-ID: <one line — the user-visible outcome>'
labels: ''
assignees: ''
---

<!--
HOW TO FILE A TICKET

- One ticket = one Claude session = one PR. Group tasks that share context —
  the same screen, store, service or concept — so one read of the code serves
  all of them. Split anything that would need a second, unrelated context.
- TICKET-ID is the epic prefix plus the next free number in that epic
  (e.g. LIB-67, SYN-36). It is NOT the GitHub issue number. Check the ticket
  index (docs/tickets/README.md, or the issue list) for the last one used.
- The branch name carries the TICKET-ID first, lowercase:
  `claude/<ticket-id>-<slug>` (e.g. `claude/lib-67-takes-in-inbox`).
  A session started on an auto-named branch renames it before the first push.
- Decide, do not ask: every open question is answered under
  "Requirements (decided)". The implementer may disagree in the PR's
  "Decisions worth a second look", but never has to stop and ask.
- Cite code as `path/to/file.ts:120-140` so the agent starts at the right line.
- Every heading below stays. "None" is an acceptable answer; silence is not.
-->

**Epic:** EPIC · **Priority:** P0 | P1 | P2 · **Size:** XS | S | M | L · **Bundle:** Session XX "name" (this ticket alone; one PR).
**Depends on:** TICKET-IDs that must land first, or "nothing". **Coordinate with:** open tickets or PRs that touch the same files, or "nothing".
**Branch:** `claude/<ticket-id>-<slug>`

## The request (owner's words)

> One blockquote per task, quoted verbatim. This is the source of truth for
> intent; the requirements below interpret it.

## Why one ticket

One or two sentences: which screen, store or service every task below lives
in, and why one session that reads it once can land all of them together.

## Context

Facts an agent needs before touching code, each with a `file:line` citation:
what exists today, what is missing, which landed tickets built the pieces
being reused. No requirements here — only facts.

- …

## Requirements (decided)

Numbered, one heading per task. Every judgement call is made here: labels,
placement, ordering, what happens at the edges, what is reused rather than
rebuilt.

### Task 1 — name

1. …

### Task 2 — name

2. …

### Everything

N. **Write it down.** The README sections to update, the epic's ticket file,
any other doc the change touches.

## Out of scope

What this ticket deliberately does not do, and where it is tracked instead
(a TICKET-ID or "not planned"). Prevents the session from widening.

- …

## Acceptance criteria

- [ ] One line per user-visible behaviour, phrased as a check someone can run
      on a device.
- [ ] The repo's CI commands pass (typecheck, lint, tests with coverage).

## Automated tests

- `path/to/test.ts`: what it proves (behaviour, not snapshots).

## Manual device test plan

1. Which screens, with the keyboard up where there is a field, with a long
   user-named value where one is rendered, and the empty state.

## Definition of done

- [ ] All acceptance criteria met; the CI commands pass.
- [ ] Docs updated; the epic's ticket file gets a `## TICKET-ID` write-up and
      the ticket index gets `- TICKET-ID — #<this issue>`.
- [ ] PR title `TICKET-ID: …`, body follows `.github/pull_request_template.md`,
      `Closes #<this issue>`.
