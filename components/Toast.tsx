'use client';

import { useEffect } from 'react';

export default function Toast({
  message,
  onDismiss
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(onDismiss, 3200);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 z-40 w-[min(440px,90vw)] -translate-x-1/2 animate-pop-in rounded-xl bg-ink-900 px-4 py-3 text-center text-[13px] font-medium text-white shadow-lift"
    >
      {message}
    </div>
  );
}
