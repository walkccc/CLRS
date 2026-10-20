import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'node:fs/promises';
import * as prettier from 'prettier';

const OPTIONS = { parser: 'markdown', proseWrap: 'preserve', singleQuote: true, tabWidth: 4 };

// Prettier's Markdown printer does not treat every $...$ as math and rewrites
// its contents (e.g. ^* becomes ^_), so math is swapped out for opaque tokens.
function findEnd(text, delim, start) {
  let braces = 0;
  for (let i = start; i < text.length; i++) {
    if (braces <= 0 && text.startsWith(delim, i)) return i;
    const c = text[i];
    if (c === '\\') i++;
    else if (c === '{') braces++;
    else if (c === '}') braces--;
  }
  return -1;
}

function mask(text) {
  const math = [];
  let out = '';
  let fence = null;
  for (const line of text.split(/(?<=\n)/)) {
    const m = line.match(/^[\s>]*(`{3,}|~{3,})/);
    if (fence !== null || m) {
      if (fence === null) fence = m[1];
      else if (m && m[1].startsWith(fence)) fence = null;
      out += `\u0000${line}`;
      continue;
    }
    out += line;
  }
  let result = '';
  for (let i = 0; i < out.length; i++) {
    if (out[i] === '\u0000') {
      const end = out.indexOf('\n', i);
      result += out.slice(i + 1, end === -1 ? out.length : end + 1);
      i = end === -1 ? out.length : end;
      continue;
    }
    if (out[i] === '`') {
      const run = out.slice(i).match(/^`+/)[0];
      const end = out.indexOf(run, i + run.length);
      if (end !== -1) {
        result += out.slice(i, end + run.length);
        i = end + run.length - 1;
        continue;
      }
    }
    if (out[i] === '\\') {
      result += out.slice(i, i + 2);
      i++;
      continue;
    }
    if (out[i] === '$') {
      const delim = out.startsWith('$$', i) ? '$$' : '$';
      const end = findEnd(out, delim, i + delim.length);
      if (end !== -1 && !out.slice(i, end).includes('\u0000')) {
        math.push(out.slice(i, end + delim.length));
        result += `MATHTOKEN${math.length - 1}X`;
        i = end + delim.length - 1;
        continue;
      }
    }
    result += out[i];
  }
  return { masked: result, math };
}

const unmask = (text, math) => text.replace(/MATHTOKEN(\d+)X/g, (_, n) => math[n]);

export async function formatMarkdown(text) {
  const { masked, math } = mask(text);
  return unmask(await prettier.format(masked, OPTIONS), math);
}

const check = process.argv.includes('--check');
let unformatted = 0;
for await (const path of glob('docs/**/*.md')) {
  const text = await readFile(path, 'utf8');
  const formatted = await formatMarkdown(text);
  if (formatted === text) continue;
  unformatted++;
  if (check) console.log(path);
  else await writeFile(path, formatted);
}
if (check && unformatted) {
  console.log(`${unformatted} file(s) need formatting; run npm run format`);
  process.exit(1);
}
