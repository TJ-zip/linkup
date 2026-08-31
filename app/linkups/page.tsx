'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import Avatar from '@/components/Avatar';
import Chip from '@/components/Chip';
import ScoreRing from '@/components/ScoreRing';
import MatchCard from '@/components/MatchCard';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { STUDENTS, studentById } from '@/lib/students';
import { buildMatch, rankMatches } from '@/lib/matching';

type Tab = 'pending' | 'sent' | 'connected' | 'suggested';

const TABS: { id: Tab; label: string }[] = [
  { id: 'pending', label: 'Requests' },
  { id: 'sent', label: 'Sent' },
  { id: 'connected', label: 'Connected' },
  { id: 'suggested', label: 'Suggested' }
];

function LinkUpsInner() {
  const {
    me,
    incoming,
    outgoing,
    isPremium,
    acceptIncoming,
    declineIncoming,
    sendLinkUp
  } = useStore();
  const [tab, setTab] = useState<Tab>('pending');
  const [toast, setToast] = useState<string | null>(null);

  const connectedIds = useMemo(
    () => Object.keys(outgoing).filter((id) => outgoing[id] === 'connected'),
    [outgoing]
  );
  const sentIds = useMemo(
    () => Object.keys(outgoing).filter((id) => outgoing[id] === 'pending'),
    [outgoing]
  );

  const suggested = useMemo(() => {
    if (!me) return [];
    return rankMatches(me, STUDENTS)
      .filter((m) => !outgoing[m.student.id] && !incoming.includes(m.student.id))
      .slice(0, 5);
  }, [me, outgoing, incoming]);

  return (
    <>
      <TopBar title="My LinkUps" subtitle="Requests, connections and people worth meeting." />

      <div
        className="flex gap-2 overflow-x-auto px-5 pt-4"
        role="tablist"
        aria-label="LinkUp sections"
      >
        {TABS.map((t) => {
          const count =
            t.id === 'pending'
              ? incoming.length
              : t.id === 'sent'
                ? sentIds.length
                : t.id === 'connected'
                  ? connectedIds.length
                  : suggested.length;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`chip shrink-0 border ${
                active
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-ink-300/40 bg-white text-ink-700'
              }`}
            >
              {t.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3 px-5 pt-4">
        {tab === 'pending' ? (
          incoming.length === 0 ? (
            <EmptyState
              emoji="📨"
              title="No pending requests"
              body="When a student sends you a LinkUp request it will appear here."
            />
          ) : (
            <>
              {!isPremium ? (
                <Link
                  href="/premium"
                  className="flex items-center justify-between rounded-xl border border-brand-300/60 bg-white px-4 py-3"
                >
                  <span className="text-[13px] text-ink-700">
                    <strong className="font-bold">See who linked up with you</strong>
                    <br />
                    Premium reveals names and profiles before you decide.
                  </span>
                  <span className="text-[12px] font-bold text-brand-600">Premium</span>
                </Link>
              ) : null}

              {incoming.map((id) => {
                const student = studentById(id);
                if (!student || !me) return null;
                const match = buildMatch(me, student);
                return (
                  <article key={id} className="card p-4">
                    <div className="flex items-start gap-3">
                      <Avatar
                        name={student.name}
                        seed={student.avatarSeed}
                        emoji={isPremium ? student.emoji : undefined}
                        size="lg"
                        hidden={!isPremium}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[16px] font-bold">
                          {isPremium ? student.name : 'A student from your campus'}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-ink-500">
                          {isPremium
                            ? `${student.course} · ${student.year} · ${student.college}`
                            : 'Accept to see their full profile'}
                        </p>
                        {isPremium ? (
                          <ul className="mt-2 space-y-1">
                            {match.reasons.map((r) => (
                              <li key={r} className="text-[13px] text-ink-700">
                                &bull; {r}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-[13px] text-ink-500">
                            {match.breakdown.overall}% compatibility with you
                          </p>
                        )}
                      </div>
                      <ScoreRing value={match.breakdown.overall} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="btn-primary flex-1"
                        onClick={() => {
                          acceptIncoming(id);
                          setToast(`You are now connected with ${student.name}.`);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          declineIncoming(id);
                          setToast('Request declined.');
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </article>
                );
              })}
            </>
          )
        ) : null}

        {tab === 'sent' ? (
          sentIds.length === 0 ? (
            <EmptyState
              emoji="✈️"
              title="No requests sent yet"
              body="Send a LinkUp from Home or Discover and it will show up here until they respond."
            />
          ) : (
            sentIds.map((id) => {
              const student = studentById(id);
              if (!student) return null;
              return (
                <div key={id} className="card flex items-center gap-3 p-4">
                  <Avatar
                    name={student.name}
                    seed={student.avatarSeed}
                    emoji={student.emoji}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold">{student.name}</p>
                    <p className="truncate text-[13px] text-ink-500">
                      {student.course} · {student.year}
                    </p>
                  </div>
                  <Chip tone="sun">Pending</Chip>
                </div>
              );
            })
          )
        ) : null}

        {tab === 'connected' ? (
          connectedIds.length === 0 ? (
            <EmptyState
              emoji="🤝"
              title="No connections yet"
              body="Accept a request or wait for one of yours to be accepted, then start a conversation."
            />
          ) : (
            connectedIds.map((id) => {
              const student = studentById(id);
              if (!student || !me) return null;
              const match = buildMatch(me, student);
              return (
                <Link
                  key={id}
                  href={`/chat/${id}`}
                  className="card flex items-center gap-3 p-4"
                >
                  <Avatar
                    name={student.name}
                    seed={student.avatarSeed}
                    emoji={student.emoji}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-bold">{student.name}</p>
                    <p className="truncate text-[13px] text-ink-500">
                      {match.shared.interests.length > 0
                        ? `You both like ${match.shared.interests[0]}`
                        : `${student.course} · ${student.year}`}
                    </p>
                  </div>
                  <Chip tone="mint">Message</Chip>
                </Link>
              );
            })
          )
        ) : null}

        {tab === 'suggested' ? (
          suggested.length === 0 ? (
            <EmptyState
              emoji="✨"
              title="You have seen everyone for now"
              body="New students join every week. Check back soon."
            />
          ) : (
            suggested.map((match) => (
              <MatchCard
                key={match.student.id}
                match={match}
                state={outgoing[match.student.id]}
                premium={isPremium}
                compact
                onLinkUp={(id) => {
                  const result = sendLinkUp(id);
                  setToast(
                    result.ok ? 'LinkUp request sent.' : (result.reason ?? 'Could not send.')
                  );
                }}
              />
            ))
          )
        ) : null}
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function LinkUpsPage() {
  return (
    <AppShell>
      <LinkUpsInner />
    </AppShell>
  );
}
