'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import MatchCard from '@/components/MatchCard';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { STUDENTS } from '@/lib/students';
import { rankMatches } from '@/lib/matching';
import { FREE_DAILY_LINKUPS } from '@/lib/options';

interface Intent {
  label: string;
  kind: 'lookingFor' | 'interest' | 'activity' | 'hobby';
  value: string;
}

const INTENTS: Intent[] = [
  { label: 'Need a study partner?', kind: 'lookingFor', value: 'Find a study partner' },
  {
    label: 'Want to start a startup?',
    kind: 'lookingFor',
    value: 'Entrepreneurship / startup connections'
  },
  { label: 'Need someone for your project?', kind: 'lookingFor', value: 'Work on projects' },
  { label: 'Looking for a gym buddy?', kind: 'activity', value: 'Gym sessions' },
  { label: 'Love photography?', kind: 'interest', value: 'Photography' },
  {
    label: 'Want to attend an event with someone?',
    kind: 'lookingFor',
    value: 'Find people to attend events with'
  },
  { label: 'Want to jam or play music?', kind: 'hobby', value: 'Guitar' }
];

function HomeInner() {
  const {
    me,
    outgoing,
    isPremium,
    sendLinkUp,
    requestsLeftToday,
    boostActive,
    incoming
  } = useStore();
  const [activeIntent, setActiveIntent] = useState<Intent | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const ranked = useMemo(() => (me ? rankMatches(me, STUDENTS) : []), [me]);

  const highMatches = useMemo(
    () => ranked.filter((m) => m.breakdown.overall >= 85).length,
    [ranked]
  );

  const filtered = useMemo(() => {
    if (!activeIntent) return ranked.slice(0, 6);
    return ranked.filter((m) => {
      const s = m.student;
      if (activeIntent.kind === 'lookingFor') return s.lookingFor.includes(activeIntent.value);
      if (activeIntent.kind === 'interest') return s.interests.includes(activeIntent.value);
      if (activeIntent.kind === 'activity') return s.activities.includes(activeIntent.value);
      return s.hobbies.includes(activeIntent.value);
    });
  }, [ranked, activeIntent]);

  function handleLinkUp(id: string) {
    const result = sendLinkUp(id);
    setToast(result.ok ? 'LinkUp request sent.' : (result.reason ?? 'Could not send.'));
  }

  const firstName = me?.name.split(' ')[0] ?? 'there';

  return (
    <>
      <header className="px-5 pb-2 pt-6">
        <p className="text-[13px] font-medium text-ink-500">Hi {firstName},</p>
        <h1 className="mt-0.5 text-[26px] font-extrabold leading-tight">
          People you should LinkUp with
        </h1>
        <p className="mt-1.5 text-[13px] text-ink-500">
          {me?.college} ·{' '}
          {isPremium
            ? 'Unlimited LinkUps'
            : `${requestsLeftToday} of ${FREE_DAILY_LINKUPS} free LinkUps left today`}
        </p>
      </header>

      {boostActive ? (
        <div className="mx-5 mb-3 rounded-xl bg-sun-50 px-4 py-3 text-[13px] font-semibold text-sun-700">
          Profile Boost is live. You are being shown first to students who already match
          your interests and goals.
        </div>
      ) : null}

      {incoming.length > 0 ? (
        <Link
          href="/linkups"
          className="mx-5 mb-4 flex items-center justify-between rounded-xl bg-brand-500 px-4 py-3 text-white"
        >
          <span className="text-[14px] font-semibold">
            {incoming.length} student{incoming.length === 1 ? '' : 's'} want to LinkUp with
            you
          </span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      ) : null}

      <section className="mb-5" aria-labelledby="intent-heading">
        <h2 id="intent-heading" className="section-title px-5 pb-2">
          What do you need right now?
        </h2>
        <div className="flex gap-2 overflow-x-auto px-5 pb-1">
          {INTENTS.map((intent) => {
            const active = activeIntent?.label === intent.label;
            return (
              <button
                key={intent.label}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIntent(active ? null : intent)}
                className={`chip shrink-0 border ${
                  active
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-ink-300/40 bg-white text-ink-700'
                }`}
              >
                {intent.label}
              </button>
            );
          })}
        </div>
      </section>

      {!isPremium && highMatches > 0 ? (
        <Link
          href="/premium"
          className="mx-5 mb-4 flex items-center justify-between rounded-xl border border-brand-300/60 bg-white px-4 py-3"
        >
          <span className="text-[13px] text-ink-700">
            <strong className="font-bold">{highMatches} students</strong> are an 85%+ match
            with you
          </span>
          <span className="text-[12px] font-bold text-brand-600">See them</span>
        </Link>
      ) : null}

      {isPremium ? (
        <Link
          href="/who-matches"
          className="mx-5 mb-4 flex items-center justify-between rounded-xl bg-mint-50 px-4 py-3"
        >
          <span className="text-[13px] text-mint-700">
            <strong className="font-bold">{highMatches} students</strong> are an 85%+ match
            with you
          </span>
          <span aria-hidden="true" className="text-mint-700">
            &rarr;
          </span>
        </Link>
      ) : null}

      <div className="space-y-3 px-5">
        {activeIntent ? (
          <p className="text-[13px] font-medium text-ink-500">
            {filtered.length} student{filtered.length === 1 ? '' : 's'} match this
          </p>
        ) : null}

        {filtered.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="Nobody matches that yet"
            body="Try another intent, or widen your interests from your profile."
          />
        ) : (
          filtered.map((match) => (
            <MatchCard
              key={match.student.id}
              match={match}
              state={outgoing[match.student.id]}
              premium={isPremium}
              onLinkUp={handleLinkUp}
            />
          ))
        )}

        {!activeIntent ? (
          <Link href="/discover" className="btn-secondary w-full">
            See more people
          </Link>
        ) : null}
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function HomePage() {
  return (
    <AppShell>
      <HomeInner />
    </AppShell>
  );
}
