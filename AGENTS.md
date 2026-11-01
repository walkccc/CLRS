# CLRS Solutions

Solutions to _Introduction to Algorithms_, Third Edition, published at https://walkccc.me/CLRS with MkDocs and Material for MkDocs. Math is rendered client-side by KaTeX (`docs/js/katex.js`), not by a Markdown extension.

## Layout

- `docs/ChapXX/XX.Y.md`: exercises of section XX.Y, one `## XX.Y-Z` heading per exercise.
- `docs/ChapXX/Problems/XX-Z.md`: end-of-chapter problems.
- `mkdocs.yml`: the `nav` lists every page. A new page must be added there.

## Writing a solution

- Quote the exercise statement as a blockquote (`> ...`), then write the solution below it.
- Unsolved exercises say `(Omit!)`. Replace it rather than adding a second answer.
- Pseudocode goes in a ` ```cpp ` block in CLRS style: `PROCEDURE-NAME(A, p, r)`, 4-space indentation, `=` for assignment, `==` for comparison.
- Markdown runs before KaTeX, so escape what Markdown would eat:
  - Line breaks inside `cases`/`aligned` are `\\\\`, not `\\`.
  - Literal braces are `\\{` and `\\}`.
  - `_` and `*` inside `$...$` sometimes need `\_` and `\*` when Markdown turns them into emphasis.
- GitHub's preview applies the same Markdown escaping inside math, so this source renders there too, apart from occasional quirks in `$$` blocks.
- List items use `- `, and anything continuing an item is indented 4 spaces; MkDocs drops 2-space continuations out of the list. `npm run format` (Prettier with math masked out) enforces this.
- Inside a list item, GitHub ignores `$$`. Use a ` ```math ` fence there instead, with plain LaTeX (`\\`, `\{`), since fenced content skips Markdown.

## Commit history

- Commit messages and PR titles use `Update <files>` with file basenames, for example `Update 33.3.md` or `Update 5-1.md, 5-2.md`.
- Commit messages contain only that subject line: no body or trailers. Check every contributor commit before merging; changing the PR title does not change its commit messages.
- Preserve each commit's original author timestamp, including its timezone offset. Set its committer timestamp to that same author timestamp; never use the rewording or merge time. Preserve the tree and both identities. Keep a backup ref and verify these fields for every rewritten commit. Do not squash contributors' commits to normalize their messages.
- Land authorized changes by fast-forwarding the verified PR head to `main`. Do not use GitHub rebase/squash merge, which replaces committer timestamps. If rebasing is needed, use `--committer-date-is-author-date`, update the PR branch, and rerun checks before landing.
- Shared skills live in `.agents/skills/`. When asked to handle issues or pull requests, or given GitHub notification emails, read `.agents/skills/triage/SKILL.md` and follow its workflow.

## Verify

```sh
pip install -r requirements.txt
npm ci
npm run format
python3 scripts/check_math.py
mkdocs build --strict
mkdocs serve
```

CI checks commit messages and author/committer timestamp equality on pull requests and pushes to `main`, checks PR titles on pull requests, runs `npm run format:check`, `scripts/check_math.py`, and `mkdocs build --strict` on every pull request and deploys `main` to the `gh-pages` branch.
