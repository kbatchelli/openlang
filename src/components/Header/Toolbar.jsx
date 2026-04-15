import { TOTAL_TERM_COUNT } from '../../data/terms.js';

export default function Toolbar({
  query,
  onQueryChange,
  languageCount,
  onAddLanguage,
  onDownloadCsv,
}) {
  return (
    <header className="border-b border-border bg-bg-base sticky top-0 z-40">
      <div className="px-8 pt-6 pb-4 flex flex-col gap-4">
        {/* Masthead */}
        <div className="flex items-end justify-between gap-6 border-b border-border-subtle pb-4">
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl text-fg leading-none">
              OpenLang
            </h1>
            <p className="font-serif italic text-fg-muted text-sm mt-1.5">
              A Swadesh list for UI terms
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-0.5 text-xs text-fg-muted font-sans">
            <span className="smallcaps">Vol. I · Edition 0.1</span>
            <span className="font-mono text-fg-subtle">
              {languageCount.toString().padStart(2, '0')} languages · {TOTAL_TERM_COUNT} terms
            </span>
          </div>
        </div>

        {/* Apparatus */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex-1 min-w-[220px] max-w-md flex items-center gap-2 border-b border-border-subtle focus-within:border-accent transition-colors">
            <span className="smallcaps text-[10px] text-fg-subtle">find</span>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="term…"
              className="flex-1 bg-transparent py-1.5 text-sm text-fg placeholder:text-fg-subtle focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-5 ml-auto text-sm">
            <button
              onClick={onAddLanguage}
              className="text-fg hover:text-accent border-b border-dotted border-fg-subtle hover:border-accent pb-0.5 transition-colors"
            >
              Add language
            </button>
            <button
              onClick={onDownloadCsv}
              className="text-fg hover:text-accent border-b border-dotted border-fg-subtle hover:border-accent pb-0.5 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
