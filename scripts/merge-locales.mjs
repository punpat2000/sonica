#!/usr/bin/env node
/**
 * Merge source XLF into locale files (th, zh, ja).
 * Preserves leading and trailing spaces from source when writing targets.
 * Usage: node scripts/merge-locales.mjs [source.xlf]
 * Default source: src/locale/messages-new.xlf (or messages.xlf if messages-new not found)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localeDir = join(__dirname, '../src/locale');

const LOCALES = [
  { code: 'th', name: 'Thai' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
];

/** Extract id -> target content from a locale file (do not trim - preserve spaces) */
function extractTargets(content) {
  const map = new Map();
  const unitRegex = /<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g;
  let m;
  while ((m = unitRegex.exec(content)) !== null) {
    const [, id, block] = m;
    const targetMatch = block.match(/<target[^>]*>([\s\S]*?)<\/target>/);
    if (targetMatch) {
      map.set(id, targetMatch[1]); // preserve leading and trailing spaces
    }
  }
  return map;
}

/** Extract full trans-unit elements from source */
function extractUnits(content) {
  const units = [];
  const unitRegex = /<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g;
  let m;
  while ((m = unitRegex.exec(content)) !== null) {
    const fullMatch = m[0];
    const [, id, block] = m;
    const sourceMatch = block.match(/<source>([\s\S]*?)<\/source>/);
    const sourceContent = sourceMatch ? sourceMatch[1] : '';
    units.push({ id, fullUnit: fullMatch, block, sourceContent });
  }
  return units;
}

/** Insert <target> after first </source>; returns full trans-unit */
function insertTarget(fullUnit, block, targetContent) {
  const withTarget = block.replace(
    /(<source>[\s\S]*?<\/source>)/,
    `$1\n        <target>${targetContent}</target>`
  );
  const openTag = fullUnit.match(/<trans-unit id="[^"]+"[^>]*>/)[0];
  return openTag + withTarget + '</trans-unit>';
}

function main() {
  const sourceFile = process.argv[2] || (existsSync(join(localeDir, 'messages-new.xlf')) ? 'messages-new.xlf' : 'messages.xlf');
  const sourcePath = join(localeDir, sourceFile);
  const sourceContent = readFileSync(sourcePath, 'utf8');

  const units = extractUnits(sourceContent);
  console.log(`Source: ${sourcePath} (${units.length} trans-units)`);

  for (const { code, name } of LOCALES) {
    const localePath = join(localeDir, `messages.${code}.xlf`);
    let localeContent;
    try {
      localeContent = readFileSync(localePath, 'utf8');
    } catch (e) {
      console.warn(`Skip ${name}: file not found`);
      continue;
    }

    const targets = extractTargets(localeContent);
    console.log(`${name} (${code}): ${targets.size} existing translations`);

    const fileOpenTag = sourceContent.match(/<file [^>]+>/)[0];
    const fileTagWithTarget = fileOpenTag.replace(
      'source-language="en"',
      `source-language="en" target-language="${code}"`
    );

    let body = '    <body>\n';
    for (const { id, fullUnit, block, sourceContent: src } of units) {
      const leading = (src.match(/^\s*/) || [''])[0];
      const trailing = (src.match(/\s*$/) || [''])[0];
      const target = targets.has(id)
        ? leading + targets.get(id).trim() + trailing
        : src;
      body += '      ' + insertTarget(fullUnit, block, target) + '\n';
    }
    body += '    </body>\n  </file>\n</xliff>\n';

    const header = sourceContent.slice(0, sourceContent.indexOf('<body>'));
    const newHeader = header.replace(/<file [^>]+>/, fileTagWithTarget);
    const output = newHeader + body;

    writeFileSync(localePath, output, 'utf8');
    console.log(`Wrote ${localePath}`);
  }
}

main();
