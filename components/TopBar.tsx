'use client';

import { useRouter } from 'next/navigation';

interface TopBarProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  action?: React.ReactNode;
}

export default function TopBar({ title, subtitle, back, action }: TopBarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 border-b border-ink-300/20 bg-surface-muted/95 px-4 pb-3 pt-4 backdrop-blur">
      <div className="flex items-start gap-3">
        {back ? (
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="mt-0.5 rounded-lg p-1 text-ink-500 hover:bg-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        ) : null}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-extrabold">{title}</h1>
          {subtitle ? (
            <p className="mt-0.5 text-[13px] text-ink-500">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
    </header>
  );
}
