import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../common/Modal.jsx';
import { LANGUAGES } from '../../data/languages.js';

const ROW_HEIGHT = 37; // px — must match the row's rendered height
const VIEWPORT_HEIGHT = 320; // px — matches max-h-80
const OVERSCAN = 6;

export default function AddLanguageModal({ open, onClose, activeCodes, onAdd }) {
  const [query, setQuery] = useState('');
  const [scrollTop, setScrollTop] = useState(0);
  const scrollerRef = useRef(null);

  const matches = useMemo(() => {
    const active = new Set(activeCodes);
    const q = query.trim().toLowerCase();
    return LANGUAGES.filter((l) => !active.has(l.code)).filter((l) => {
      if (!q) return true;
      return (
        l.code.toLowerCase().includes(q) ||
        l.name.toLowerCase().includes(q) ||
        l.native.toLowerCase().includes(q)
      );
    });
  }, [activeCodes, query]);

  // Reset scroll on query change so users always see top-of-list results.
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
    setScrollTop(0);
  }, [query]);

  const totalHeight = matches.length * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;
  const endIndex = Math.min(matches.length, startIndex + visibleCount);
  const visible = matches.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  const handlePick = (code) => {
    onAdd(code);
    setQuery('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Language">
      <div className="p-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or code…"
          className="w-full bg-bg-base border border-border px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent font-mono"
        />
        <div className="mt-3 px-1 text-[10px] text-fg-subtle font-mono">
          {matches.length.toLocaleString()} match{matches.length === 1 ? '' : 'es'} in ISO 639-3 registry
        </div>
        <div
          ref={scrollerRef}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          className="mt-2 overflow-y-auto -mx-1 border-y border-border-subtle/50"
          style={{ maxHeight: VIEWPORT_HEIGHT, height: VIEWPORT_HEIGHT }}
        >
          {matches.length === 0 ? (
            <div className="text-sm text-fg-muted px-2 py-6 text-center font-serif italic">
              {activeCodes.length >= LANGUAGES.length
                ? 'All languages added.'
                : 'No matches.'}
            </div>
          ) : (
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visible.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handlePick(l.code)}
                    className="w-full flex items-baseline justify-between gap-3 px-3 hover:bg-bg-hover text-left transition-colors border-b border-border-subtle/50"
                    style={{ height: ROW_HEIGHT }}
                  >
                    <span className="font-serif italic text-sm text-fg truncate">{l.name}</span>
                    <span className="flex items-baseline gap-3 flex-shrink-0">
                      <span className="text-sm text-fg-muted font-mono truncate max-w-[10rem]">{l.native}</span>
                      <span className="text-[10px] text-fg-subtle font-mono uppercase tracking-wider w-10 text-right">{l.code}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
