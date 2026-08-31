'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/home', label: 'Home', icon: 'home' },
  { href: '/discover', label: 'Discover', icon: 'search' },
  { href: '/linkups', label: 'LinkUps', icon: 'link' },
  { href: '/community', label: 'Community', icon: 'community' },
  { href: '/profile', label: 'Profile', icon: 'user' }
];

function Icon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? '#5B5BD6' : '#98A1B8';
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: active ? 2.2 : 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };

  if (name === 'home') {
    return (
      <svg {...common}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.8V20h14V9.8" />
      </svg>
    );
  }
  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
    );
  }
  if (name === 'link') {
    return (
      <svg {...common}>
        <path d="M10 13a4 4 0 0 0 5.7.4l3-3A4 4 0 0 0 13 4.7l-1.4 1.4" />
        <path d="M14 11a4 4 0 0 0-5.7-.4l-3 3A4 4 0 0 0 11 19.3l1.4-1.4" />
      </svg>
    );
  }
  if (name === 'community') {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
        <path d="M17.5 14.2A6.5 6.5 0 0 1 21.5 20" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[520px] border-t border-ink-300/25 bg-white/95 backdrop-blur"
    >
      <ul className="flex items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold"
              >
                <Icon name={item.icon} active={active} />
                <span className={active ? 'text-brand-600' : 'text-ink-300'}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
