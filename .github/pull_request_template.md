<!--
Title: `TICKET-ID: short summary` (e.g. `LIB-67: takes group in the Inbox`).
Branch: `claude/<ticket-id-lowercase>-<slug>` (e.g. `claude/lib-67-takes-in-inbox`).
The TICKET-ID is the ticket's own id (the title prefix of its issue), never the
issue number. One ticket = one PR; a PR that lands two tickets names both.
Every heading below stays in the PR, even if the answer is "none" — say so.
-->

Closes #<issue number>

## What changed, and why

<!-- Two to five sentences. Lead with the user-visible outcome, then the
decision that shaped it. Link the doc section you wrote it up in. -->

## Decisions worth a second look

<!-- Anything you chose that the ticket left open, anything you did
differently from the ticket and why, anything you considered and rejected.
"None" is a fine answer; silence is not. -->

## Tests

<!-- Which test files were added or changed, and what each one proves.
Assert on behaviour, not snapshots. -->

## Checks

- [ ] typecheck
- [ ] lint
- [ ] unit tests with coverage
- [ ] bundle/build (only if a dependency changed — say "n/a" otherwise)

## Manual device pass

<!-- The ticket's "Manual device test plan", each step marked done or
**not run** with the reason (most cloud sessions have no simulator — say so).
For any screen with a text input: was it checked with the keyboard up?
For any user-named thing (clip, folder, note, tag, status): with a long name? -->

## Docs

<!-- README sections, the epic's ticket file, the ticket index, and any other
doc the change touches. -->

## Before merging

<!-- Does the reviewer need a rebuild (native change, new dependency) or just
a dev-server restart? Why? -->
