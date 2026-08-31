'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import Avatar from '@/components/Avatar';
import Chip from '@/components/Chip';
import PremiumBadge from '@/components/PremiumBadge';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { STUDENTS } from '@/lib/students';
import { rankMatches } from '@/lib/matching';

function Section({
  title,
  items,
  tone = 'neutral'
}: {
  title: string;
  items: string[];
  tone?: 'brand' | 'mint' | 'sun' | 'neutral';
}) {
  if (items.length === 0) return null;
  return (
    <section className="card p-4">
      <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wide text-ink-500">
        {title}
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Chip key={item} tone={tone}>
            {item}
          </Chip>
        ))}
      </div>
    </section>
  );
}

function ProfileInner() {
  const {
    me,
    outgoing,
    isPremium,
    incognito,
    setIncognito,
    updateMe,
    startBoost,
    boostActive,
    reset,
    viewed
  } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  const connections = useMemo(
    () => Object.values(outgoing).filter((v) => v === 'connected').length,
    [outgoing]
  );

  const boostReach = useMemo(() => {
    if (!me) return 0;
    return rankMatches(me, STUDENTS).filter((m) => m.breakdown.overall >= 70).length;
  }, [me]);

  if (!me) return null;

  return (
    <>
      <section className="px-5 pb-4 pt-6">
        <div className="flex items-center gap-4">
          <Avatar name={me.name} seed={me.avatarSeed} emoji={me.emoji} size="xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-extrabold leading-tight">{me.name}</h1>
              {isPremium && me.showPremiumBadge ? <PremiumBadge small /> : null}
            </div>
            <p className="mt-0.5 text-[13px] text-ink-500">
              {me.course} · {me.year}
            </p>
            <p className="text-[13px] font-medium text-ink-700">{me.college}</p>
            {me.verified ? (
              <p className="mt-1 inline-flex items-center gap-1 text-[12px] font-semibold text-mint-700">
                <span aria-hidden="true">✓</span> College verified
              </p>
            ) : null}
          </div>
        </div>

        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{me.bio}</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="card py-3">
            <p className="text-[18px] font-extrabold">{connections}</p>
            <p className="text-[11px] text-ink-500">Connections</p>
          </div>
          <div className="card py-3">
            <p className="text-[18px] font-extrabold">{me.interests.length}</p>
            <p className="text-[11px] text-ink-500">Interests</p>
          </div>
          <div className="card py-3">
            <p className="text-[18px] font-extrabold">{viewed.length}</p>
            <p className="text-[11px] text-ink-500">Profiles viewed</p>
          </div>
        </div>
      </section>

      <div className="space-y-3 px-5">
        <Link
          href="/premium"
          className="flex items-center justify-between rounded-2xl bg-ink-900 px-4 py-4 text-white"
        >
          <span>
            <span className="block text-[15px] font-bold">
              {isPremium ? 'Manage LinkUp Premium' : 'LinkUp Premium'}
            </span>
            <span className="mt-0.5 block text-[12px] text-white/70">
              {isPremium
                ? 'Your plan, features and billing options'
                : 'Meet better. Connect smarter.'}
            </span>
          </span>
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <Section title="Looking for" items={me.lookingFor} tone="brand" />
        <Section title="Interests" items={me.interests} />
        <Section title="Hobbies" items={me.hobbies} />
        <Section title="Skills" items={me.skills} tone="mint" />
        <Section title="Career interests" items={me.careerInterests} tone="mint" />
        <Section title="Goals" items={me.goals} tone="sun" />
        <Section title="Personality" items={me.personality} />
        <Section title="Activities" items={me.activities} />

        <section className="card p-4">
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-ink-500">
            Settings
          </h2>

          <div className="space-y-3">
            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[14px] font-semibold">Show Premium badge</span>
                <span className="block text-[12px] text-ink-500">
                  Optional. Only available on Premium.
                </span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300 accent-brand-500"
                checked={isPremium && me.showPremiumBadge}
                disabled={!isPremium}
                onChange={(e) => updateMe({ showPremiumBadge: e.target.checked })}
              />
            </label>

            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[14px] font-semibold">Incognito discovery</span>
                <span className="block text-[12px] text-ink-500">
                  Browse without appearing in recently-viewed. Premium only.
                </span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-ink-300 accent-brand-500"
                checked={incognito}
                disabled={!isPremium}
                onChange={(e) => setIncognito(e.target.checked)}
              />
            </label>

            <div className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[14px] font-semibold">Profile Boost</span>
                <span className="block text-[12px] text-ink-500">
                  30 minutes of higher visibility among the {boostReach} students you
                  already match well with. Premium only.
                </span>
              </span>
              <button
                type="button"
                className="btn-secondary shrink-0 py-1.5 text-[13px]"
                disabled={!isPremium || boostActive}
                onClick={() => {
                  startBoost();
                  setToast('Profile Boost active for 30 minutes.');
                }}
              >
                {boostActive ? 'Active' : 'Boost'}
              </button>
            </div>
          </div>
        </section>

        <button
          type="button"
          className="btn-secondary w-full text-red-600"
          onClick={() => {
            reset();
            setToast('Demo data cleared.');
          }}
        >
          Reset demo data
        </button>

        <p className="pb-4 text-center text-[11px] leading-relaxed text-ink-300">
          Prototype build. Profiles shown in the app are fictional demo data and all
          activity is stored only in this browser.
        </p>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function MyProfilePage() {
  return (
    <AppShell>
      <ProfileInner />
    </AppShell>
  );
}
