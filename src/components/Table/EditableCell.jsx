import { useEffect, useRef, useState } from 'react';

export default function EditableCell({ value, onCommit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    if (draft !== value) onCommit(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    } else if (e.key === 'Tab') {
      commit();
    }
  };

  const filled = value && value.length > 0;

  if (editing) {
    return (
      <div className="h-full w-full px-3 py-2 bg-bg-elevated border border-accent">
        <input
          ref={inputRef}
          className="cell-input text-sm font-mono"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`group h-full w-full text-left px-3 py-2 text-sm transition-colors hover:bg-bg-hover focus:outline-none focus:bg-bg-elevated focus:ring-1 focus:ring-accent ${
        filled ? 'text-fg font-mono' : 'text-fg-subtle font-serif italic'
      }`}
    >
      <span className="block truncate min-h-[1.25rem]">
        {filled ? value : '— vacat —'}
      </span>
    </button>
  );
}
