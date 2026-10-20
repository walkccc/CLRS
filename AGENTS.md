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
- Because of this escaping, GitHub's own Markdown preview renders some math wrongly. Only the built site matters.

## Verify

```sh
pip install -r requirements.txt
mkdocs build --strict
mkdocs serve
```

CI runs `mkdocs build --strict` on every pull request and deploys `main` to the `gh-pages` branch.
