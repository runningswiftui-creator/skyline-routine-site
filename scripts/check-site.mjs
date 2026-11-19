import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const failures = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const source = read(file);
  if (/href="\/"|src="\/"/.test(source)) {
    failures.push(`${file}: root-absolute link`);
  }
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|mailto:|#|data:|javascript:|\/\/)/.test(value)) continue;
    const target = decodeURIComponent(value.split('#')[0].split('?')[0]);
    if (!target) continue;
    if (!fs.existsSync(path.join(root, target))) {
      failures.push(`${file}: missing local target ${value}`);
    }
  }
}

const guideContext = vm.createContext({ window: {} });
vm.runInContext(read('guide-data.js'), guideContext);
const guide = guideContext.window.SKYLINE_GUIDE;
const guideLanguages = Object.keys(guide ?? {});

if (guideLanguages.length !== 14) {
  failures.push(`guide-data.js: expected 14 languages, found ${guideLanguages.length}`);
}

const referenceShape = guide?.['en-US']?.sections?.map(([, items]) => items.length);
for (const language of guideLanguages) {
  const sections = guide[language].sections;
  const shape = sections?.map(([, items]) => items.length);
  if (JSON.stringify(shape) !== JSON.stringify(referenceShape)) {
    failures.push(`guide-data.js: ${language} section shape differs from en-US`);
  }
  if (sections?.some(([heading, items]) => !heading || !Array.isArray(items))) {
    failures.push(`guide-data.js: ${language} has malformed sections`);
  }
}

const helpSource = read('help.html');
const helpMatch = helpSource.match(/const HELP = ([\s\S]*?);\n\s*const params/);
if (!helpMatch) {
  failures.push('help.html: unable to parse HELP');
} else {
  const help = vm.runInNewContext(`(${helpMatch[1]})`);
  const helpLanguages = Object.keys(help);
  if (helpLanguages.length !== 14) {
    failures.push(`help.html: expected 14 languages, found ${helpLanguages.length}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exit(1);
}

console.log(
  `checked ${htmlFiles.length} HTML pages, ${guideLanguages.length} guide languages`
);
