const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

export default function CategoryRow({
  category,
  color,
  count,
  collapsed,
  onToggle,
  columnCount,
  index,
}) {
  return (
    <div
      className="flex items-center border-y border-border bg-bg-raised hover:bg-bg-elevated transition-colors cursor-pointer select-none"
      onClick={onToggle}
      style={{ minWidth: `${280 + columnCount * 200}px` }}
    >
      <div className="flex items-baseline gap-4 px-5 py-3 w-full">
        <span
          className="text-fg-subtle text-[10px] inline-block transition-transform"
          style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
        <span className="font-serif italic text-fg-muted text-sm w-8 text-right tabular-nums">
          §&nbsp;{ROMAN[index] || index + 1}.
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full mt-2"
          style={{ backgroundColor: color }}
          aria-hidden
        />
        <span className="font-serif text-base text-fg">
          {category}
        </span>
        <span className="smallcaps text-[10px] text-fg-subtle font-sans ml-1">
          {count} entries
        </span>
      </div>
    </div>
  );
}
