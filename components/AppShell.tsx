'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from './BottomNav';
import { useStore } from '@/lib/store';

interface AppShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function AppShell({ children, hideNav = false }: AppShellProps) {
  const { hydrated, me } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !me?.onboarded) {
      router.replace('/onboarding');
    }
  }, [hydrated, me, router]);

  if (!hydrated) {
    return (
      <main className="shell flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-500">Loading LinkUp…</p>
      </main>
    );
  }

  if (!me?.onboarded) {
    return (
      <main className="shell flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-500">Taking you to onboarding…</p>
      </main>
    );
  }

  return (
    <div className="shell pb-24">
      {children}
      {hideNav ? null : <BottomNav />}
    </div>
  );
}
