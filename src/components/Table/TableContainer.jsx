import { useMemo, useState } from 'react';
import CategoryRow from './CategoryRow.jsx';
import TermRow, { COLUMN_WIDTHS } from './TermRow.jsx';
import { CATEGORIES, TOTAL_TERM_COUNT } from '../../data/terms.js';
import { LANGUAGE_BY_CODE } from '../../data/languages.js';

const { TERM_COL_WIDTH, LANG_COL_WIDTH } = COLUMN_WIDTHS;

export default function TableContainer({
  query,
  languages,
  getTranslation,
  getCompletion,
  onCommit,
  onRemoveLanguage,
}) {
  const [collapsed, setCollapsed] = useState(() => new Set());

  const toggle = (cat) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const q = query.trim().toLowerCase();
  const filteredCategories = useMemo(() => {
    if (!q) return CATEGORIES;
    return CATEGORIES.map((c) => ({
      ...c,
      terms: c.terms.filter((t) => t.toLowerCase().includes(q)),
    })).filter((c) => c.terms.length > 0);
  }, [q]);

  const minWidth = TERM_COL_WIDTH + languages.length * LANG_COL_WIDTH;

  return (
    <div className="flex-1 overflow-auto">
      <div style={{ minWidth }}>
        {/* Header row */}
        <div
          className="flex sticky top-0 z-30 bg-bg-base border-b border-border"
          style={{ minWidth }}
        >
          <div
            className="sticky left-0 z-20 bg-bg-base px-5 py-3 border-r border-border"
            style={{ width: TERM_COL_WIDTH, minWidth: TERM_COL_WIDTH }}
          >
            <div className="font-serif italic text-fg text-sm">English</div>
            <div className="smallcaps text-[10px] text-fg-subtle mt-0.5">source · invariant</div>
          </div>
          {languages.map((code) => {
            const lang = LANGUAGE_BY_CODE[code];
            const completion = getCompletion(code, TOTAL_TERM_COUNT);
            return (
              <div
                key={code}
                className="border-r border-border-subtle px-4 py-3 flex flex-col gap-1.5 group/header"
                style={{ width: LANG_COL_WIDTH, minWidth: LANG_COL_WIDTH }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-serif italic text-sm text-fg truncate">
                      {lang?.name || code}
                    </span>
                    <span className="text-[10px] font-mono text-fg-subtle uppercase">{code}</span>
                  </div>
                  <button
                    onClick={() => onRemoveLanguage(code)}
                    className="opacity-0 group-hover/header:opacity-100 text-fg-subtle hover:text-fg text-xs leading-none transition-opacity"
                    title={`Remove ${lang?.name || code}`}
                    aria-label={`Remove ${lang?.name || code}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-border-subtle relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-accent transition-all"
                      style={{ width: `${Math.round(completion * 100)}%`, height: '1px' }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-fg-subtle tabular-nums">
                    {Math.round(completion * 100)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Body */}
        {filteredCategories.length === 0 && (
          <div className="px-6 py-12 text-center text-fg-muted text-sm">
            No terms match “{query}”.
          </div>
        )}

        {filteredCategories.map((cat, idx) => {
          const isCollapsed = collapsed.has(cat.category);
          return (
            <div key={cat.category}>
              <CategoryRow
                category={cat.category}
                color={cat.color}
                count={cat.terms.length}
                collapsed={isCollapsed}
                onToggle={() => toggle(cat.category)}
                columnCount={languages.length}
                index={idx}
              />
              {!isCollapsed &&
                cat.terms.map((term) => (
                  <TermRow
                    key={term}
                    term={term}
                    categoryColor={cat.color}
                    languages={languages}
                    getTranslation={getTranslation}
                    onCommit={onCommit}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
