import EditableCell from './EditableCell.jsx';

const TERM_COL_WIDTH = 280;
const LANG_COL_WIDTH = 200;

export default function TermRow({ term, categoryColor, languages, getTranslation, onCommit }) {
  return (
    <div className="flex border-b border-border-subtle/60 hover:bg-bg-raised/40 group">
      <div
        className="sticky left-0 z-10 bg-bg-base group-hover:bg-bg-raised/80 px-5 py-2 text-sm font-mono text-fg flex items-center gap-2 border-r border-border"
        style={{ width: TERM_COL_WIDTH, minWidth: TERM_COL_WIDTH }}
      >
        <span
          className="w-px h-3 self-center"
          style={{ backgroundColor: categoryColor, opacity: 0.65 }}
          aria-hidden
        />
        <span>{term}</span>
      </div>
      {languages.map((langCode) => (
        <div
          key={langCode}
          className="border-r border-border-subtle/60 flex items-stretch"
          style={{ width: LANG_COL_WIDTH, minWidth: LANG_COL_WIDTH }}
        >
          <EditableCell
            value={getTranslation(langCode, term)}
            onCommit={(value) => onCommit(langCode, term, value)}
          />
        </div>
      ))}
    </div>
  );
}

export const COLUMN_WIDTHS = { TERM_COL_WIDTH, LANG_COL_WIDTH };
