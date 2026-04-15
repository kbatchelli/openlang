import { useEffect } from 'react';

export default function Toast({ message, onDismiss, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [message, onDismiss, duration]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-bg-elevated border border-border rounded-md px-4 py-2 text-sm text-fg shadow-xl">
      {message}
    </div>
  );
}
