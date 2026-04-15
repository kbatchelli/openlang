import { CATEGORIES } from '../data/terms.js';
import { LANGUAGE_BY_CODE } from '../data/languages.js';

function escapeCsv(value) {
  const str = String(value ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildCsv(languages, translations) {
  const header = ['category', 'term', ...languages];
  const lines = [header.map(escapeCsv).join(',')];
  for (const cat of CATEGORIES) {
    for (const term of cat.terms) {
      const row = [cat.category, term, ...languages.map((c) => translations[c]?.[term] || '')];
      lines.push(row.map(escapeCsv).join(','));
    }
  }
  // BOM for Excel UTF-8 compatibility
  return '\uFEFF' + lines.join('\r\n');
}

export function downloadCsv(languages, translations) {
  const csv = buildCsv(languages, translations);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `openlang-ui-swadesh-list-${date}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// reference to keep tree-shaker honest
export const _LANGS = LANGUAGE_BY_CODE;
