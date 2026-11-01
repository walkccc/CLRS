---
name: triage
description: Handle open issues and pull requests on walkccc/CLRS end to end — read them, fix or improve the solutions, open or update PRs, wait for CI, merge, and reply. Use when asked to go through, reply to, or clean up issues/PRs, or when pasted GitHub notification emails arrive.
---

# Triage issues and pull requests

Work through every item to a finished state: merged, closed, or answered. Do not stop at drafts.

## 1. Collect

```sh
gh issue list --state open --json number,title,author,createdAt
gh pr list --state open --json number,title,author,maintainerCanModify,headRefName
```

For each item read the body, comments, and diff (`gh pr diff N`). Check the claim against the source in `docs/` and the live page at `https://walkccc.me/CLRS/ChapXX/XX.Y/`.

## 2. Decide

- **Rendering report**: compare the live site with GitHub's preview. Screenshots of `github.com/walkccc/CLRS/blob/...` are GitHub's renderer, not the site. Fix the source only if one of them is actually wrong.
- **Wrong or incomplete solution**: verify the math yourself. A contributor's PR that is right but incomplete gets a follow-up commit on their branch (when `maintainerCanModify`), not a replacement, so it merges with their credit.
- **Correct PR**: keep the contribution unchanged, normalize every commit message as described below, then merge.
- **Wrong PR or report**: reply with the concrete reason and close.

## 3. Change

- Branch from `origin/main`; one branch per item.
- Commit subject and PR title are always `Update <files>`, exactly like the history: `Update 33.1.md`, `Update 5-1.md, 5-2.md`. The complete commit message is that single subject line, with no body or trailers. This applies to every contributor commit, including fixup commits; editing the PR title alone is insufficient.
- Before rewording, save the original branch tip in a backup ref. Preserve each commit's tree, author identity/date, and committer identity/date exactly, including timezone offsets. Change only its message and, for descendants, parent references. Verify those fields byte-for-byte and verify an empty tree diff for every old/new pair. Preserve separate commits and contributor credit.
- If updating a published branch, use `--force-with-lease` with the expected old SHA. Rewriting `main` requires a user request to do so; ordinary triage normalizes the PR branch before merging.
- PR body: `Closes #N` when it resolves an issue, then what changed and why in a few sentences.
- Follow the conventions in `AGENTS.md`.

## 4. Verify before pushing

```sh
npm run format
python3 scripts/check_math.py
mkdocs build --strict
```

For rendering changes, open the built page (`mkdocs serve`) and check the affected section.

Before landing, run `python3 scripts/check_commit_messages.py <base-sha> <head-sha> --title "<PR title>"`. Resolve failures on the contributor's branch when maintainer edits are enabled; preserve the metadata above when rewording.

## 5. Land

```sh
gh pr checks N --watch
gh pr merge N --rebase
```

Merge with `--rebase` to keep history linear. Merging to `main` deploys the site through Actions; confirm the run passes with `gh run list --branch main --limit 1`.

## 6. Reply

Reply on every issue and PR you touched: thank the author, say what changed or why not, and link the PR or live page. Close issues that a merged PR did not close automatically.
