# prumo-site

This project's conventions live in `.prumo/`. Read [`.prumo/INDEX.md`](.prumo/INDEX.md) before changing how something is done.

## Branches, and how work lands

One chain, and nothing skips a step:

```
task/ fix/ chore/ docs/ refactor/  →  dev  →  staging  →  main
task/<name>  →  project/<name>  →  dev                      large work
```

- **Nobody pushes to `main`, `staging`, `dev` or a `project/` branch**, the assistant included. A ruleset refuses
  it.
- Every change arrives as a pull request, and `.github/workflows/flow.yml` refuses one that skips a step: `main`
  takes only `staging`, `staging` takes only `dev`, `dev` takes a `project/` branch or one of the five prefixes
  above, and a `project/` branch takes only `task/`, or `dev` to stay current. Any other prefix is refused.
- **Large work gets a `project/<name>` branch**, created from `dev` and split into `task/` branches that land on
  it, and takes `dev` by pull request to stay current. It opens into `dev` only once it is decided to ship, so a
  smaller change is never stuck behind it.
- The checks in `.github/workflows/ci.yml` are required (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`),
  so a red branch does not land.
- Commits are English, imperative mood, one decision per commit where possible.

## Language

Every file, identifier, comment and commit message is written in **English**. Conversation with the user is in
**Portuguese (pt-BR)**. The two are never mixed inside a file.

## Ask before you write

The user is the architect. Surface each decision as it appears, **one at a time**, with the real options, what each
one costs, and a recommendation. Wait for the answer before writing it down. A claim about a library, a version or
an API is checked in its own documentation before it is used, never recalled.

