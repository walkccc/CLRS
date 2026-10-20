import re
import sys
from pathlib import Path

FENCE = re.compile(r'^(\s*)(```|~~~)\s*(\w*)')


def check(path):
    errors = []
    fence = None
    for i, line in enumerate(path.read_text().split('\n'), 1):
        m = FENCE.match(line)
        if m:
            if fence is None:
                fence = m.group(3)
            else:
                fence = None
            continue
        if fence == 'math':
            # Fenced math skips Markdown on both GitHub and MkDocs, so it takes plain LaTeX.
            if '\\\\\\\\' in line:
                errors.append((i, r'```math takes plain LaTeX: write \\ instead of \\\\'))
        elif fence is None and line.startswith(' ') and line.lstrip().startswith('$$'):
            errors.append((i, 'GitHub does not render $$ inside a list item; use a ```math fence'))
    return errors


failed = False
for path in sorted(Path('docs').rglob('*.md')):
    for line, message in check(path):
        print(f'{path}:{line}: {message}')
        failed = True
sys.exit(failed)
