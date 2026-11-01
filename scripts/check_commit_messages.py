"""Check the repository's single-line Update <files> convention."""

import argparse
from pathlib import PurePosixPath
import subprocess
import sys


def git(*args):
    return subprocess.check_output(['git', *args]).decode('utf-8')


def names(paths):
    return sorted({PurePosixPath(path).name for path in paths})


def valid(message, files):
    if not files or '\n' in message or not message.startswith('Update '):
        return False
    listed = message.removeprefix('Update ').split(', ')
    return sorted(listed) == files


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('base')
    parser.add_argument('head')
    parser.add_argument('--title')
    args = parser.parse_args()
    failed = False
    commits = git('rev-list', '--reverse', f'{args.base}..{args.head}').splitlines()
    for sha in commits:
        raw = git('cat-file', 'commit', sha)
        headers, message = raw.split('\n\n', 1)
        if sum(line.startswith('parent ') for line in headers.splitlines()) != 1:
            print(f'{sha}: expected a single-parent commit for linear history')
            failed = True
            continue
        files = names(git('diff-tree', '--no-commit-id', '--name-only', '-r', sha).splitlines())
        if not valid(message.rstrip('\n'), files):
            print(f'{sha}: expected only "Update {", ".join(files)}"')
            failed = True
    if args.title is not None:
        files = names(git('diff', '--name-only', f'{args.base}...{args.head}').splitlines())
        if not valid(args.title, files):
            print(f'PR title: expected "Update {", ".join(files)}"')
            failed = True
    if not failed:
        print(f'Checked {len(commits)} commit messages' + (' and PR title' if args.title is not None else ''))
    return failed


if __name__ == '__main__':
    sys.exit(main())
