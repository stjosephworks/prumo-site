# prumo-site

This project's conventions live in `.prumo/`. Read [`.prumo/INDEX.md`](.prumo/INDEX.md) before changing how something is done.

## Branches, and how work lands

One chain, and nothing skips a step:

```
a branch of your own → dev → alpha → main
```

- **Nobody pushes to `main`, `alpha` or `dev`**, the assistant included. A ruleset refuses it.
- Every change arrives as a pull request, and `.github/workflows/flow.yml` refuses a pull request that skips a
  step: `main` takes only `alpha`, `alpha` takes only `dev`, `dev` takes a branch of your own.
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

