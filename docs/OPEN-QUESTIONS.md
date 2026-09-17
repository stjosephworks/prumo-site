# Open questions

What the website has raised and not settled. Each one names what it blocks.

---

## The site has no dark mode

**Raised:** 2026-09-17
**Question:** the identity is drafting paper: a cool off-white, navy ink and the plumb bob's brass. A dark
version is not a recolour of that, it is a second design, and the theme toggle it needs brings a
flash-of-wrong-theme problem that a static site has to solve deliberately.
**Why it matters:** a developer tool's documentation is read at night, and the absence is the first thing
some visitors will say.
**Blocks:** nothing. The shadcn dark tokens the template shipped were removed rather than left unused, so
reinstating them is part of the work, not a leftover.

---

## Nothing warns that the pins have fallen behind

**Raised:** 2026-09-17
**Question:** `content/documents.json` pins each source repository to a commit, raised by hand. When `prumo`
lands new decisions, the site keeps describing the older ones and everything still builds, lints and passes.
**Why it matters:** the site's whole claim is that it cannot drift from what the projects say. It cannot
drift *silently within a commit*, which is a smaller claim than it sounds.
**Blocks:** nothing today. The candidates are a scheduled job comparing the pin with the branch head and
opening a pull request, or a check that fails when the pin is more than a set number of commits behind.

---

## The published site has no domain

**Raised:** 2026-09-17
**Question:** `src/lib/site.ts` falls back to a `.vercel.app` URL, which is what `metadataBase`, the
canonical links and the sitemap are built from. A real domain has not been chosen.
**Why it matters:** canonical URLs and the sitemap are wrong until it is set, and search engines will have
indexed the wrong host by then.
**Blocks:** nothing in development. `NEXT_PUBLIC_SITE_URL` is read first, so setting it in Vercel is the
whole change.

---

## Search matches substrings and nothing else

**Raised:** 2026-09-17
**Question:** the index is built from the same parse the pages use, and the browser filters it by substring.
A reader searching `authentication` does not find `auth`, and there is no ranking: results arrive in
document order.
**Why it matters:** `DECISIONS.md` contributes 280 of the 361 records, so a common word returns a long
undifferentiated list.
**Blocks:** nothing. Pagefind was the alternative and was rejected for needing a post-build pass over
rendered HTML; the day the corpus outgrows substring matching, that decision is the one to revisit.

---

## The Desktop page has nothing to download

**Raised:** 2026-09-17
**Question:** `prumo-desktop` has no tags, no releases and no `makers` in `forge.config.js`. The page states
this plainly instead of showing a button.
**Why it matters:** half of what the site advertises cannot be used yet.
**Blocks:** the download button, and the GitHub release lookup that would feed it.
