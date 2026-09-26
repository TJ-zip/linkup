'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function IndexPage() {
  const { hydrated, me } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(me?.onboarded ? '/home' : '/onboarding');
  }, [hydrated, me, router]);

  return (
    <main className="shell flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl font-black text-white">
        L
      </div>
      <h1 className="text-2xl font-extrabold">LinkUp</h1>
      <p className="text-sm text-ink-500">No student should feel alone in a crowd.</p>
    </main>
  );
}
