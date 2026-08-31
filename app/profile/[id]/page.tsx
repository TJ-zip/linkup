'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import Avatar from '@/components/Avatar';
import Chip from '@/components/Chip';
import ScoreRing from '@/components/ScoreRing';
import PremiumBadge from '@/components/PremiumBadge';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { studentById } from '@/lib/students';
import { buildMatch } from '@/lib/matching';

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

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12px] font-medium text-ink-500">
        <span>{label}</span>
        <span className="font-bold text-ink-700">{value}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StudentProfileInner({ id }: { id: string }) {
  const { me, outgoing, isPremium, sendLinkUp, markViewed } = useStore();
  const [toast, setToast] = useState<string | null>(null);
  const student = studentById(id);

  useEffect(() => {
    if (student) markViewed(student.id);
  }, [student, markViewed]);

  const match = useMemo(
    () => (me && student ? buildMatch(me, student) : null),
    [me, student]
  );

  if (!student || !match) {
    return (
      <>
        <TopBar title="Profile" back />
        <div className="px-5 pt-4">
          <EmptyState
            emoji="🔎"
            title="Student not found"
            body="This profile is no longer available."
          />
        </div>
      </>
    );
  }

  const state = outgoing[student.id];

  return (
    <>
      <TopBar title="Profile" back />

      <section className="px-5 pb-4 pt-4">
        <div className="flex items-start gap-4">
          <Avatar
            name={student.name}
            seed={student.avatarSeed}
            emoji={student.emoji}
            size="xl"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[22px] font-extrabold leading-tight">{student.name}</h1>
              {student.premium ? <PremiumBadge small /> : null}
            </div>
            <p className="mt-0.5 text-[13px] text-ink-500">
              {student.course} · {student.year}
            </p>
            <p className="text-[13px] font-medium text-ink-700">{student.college}</p>
          </div>
          <ScoreRing value={match.breakdown.overall} size={58} />
        </div>

        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{student.bio}</p>
      </section>

      <div className="space-y-3 px-5">
        <section className="card p-4">
          <h2 className="mb-2 text-[13px] font-bold uppercase tracking-wide text-brand-700">
            Why you match
          </h2>
          <ul className="space-y-1.5">
            {match.reasons.map((reason) => (
              <li key={reason} className="flex gap-2 text-[14px] text-ink-700">
                <span aria-hidden="true" className="text-brand-500">
                  &bull;
                </span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          {isPremium ? (
            <div className="mt-4 space-y-2.5">
              <Bar label="Interest match" value={match.breakdown.interest} />
              <Bar label="Goal match" value={match.breakdown.goal} />
              <Bar label="Personality match" value={match.breakdown.personality} />
              <Bar label="Activity match" value={match.breakdown.activity} />
            </div>
          ) : (
            <Link
              href="/premium"
              className="mt-3 block rounded-xl border border-brand-300/60 px-3 py-2.5 text-[12px] font-semibold text-brand-600"
            >
              See the full interest, goal, personality and activity breakdown with Premium
            </Link>
          )}
        </section>

        {match.complementarySkills.length > 0 ? (
          <Section
            title="Skills they bring that you have not listed"
            items={match.complementarySkills}
            tone="mint"
          />
        ) : null}

        <Section title="Looking for" items={student.lookingFor} tone="brand" />
        <Section title="Interests" items={student.interests} />
        <Section title="Hobbies" items={student.hobbies} />
        <Section title="Skills" items={student.skills} tone="mint" />
        <Section title="Career interests" items={student.careerInterests} tone="mint" />
        <Section title="Goals" items={student.goals} tone="sun" />
        <Section title="Personality" items={student.personality} />
        <Section title="Activities" items={student.activities} />

        <div className="sticky bottom-20 flex gap-2 pb-4">
          {state === 'connected' ? (
            <Link href={`/chat/${student.id}`} className="btn-mint w-full">
              Message {student.name.split(' ')[0]}
            </Link>
          ) : state === 'pending' ? (
            <button type="button" className="btn-secondary w-full" disabled>
              LinkUp request sent
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary w-full"
              onClick={() => {
                const result = sendLinkUp(student.id);
                setToast(
                  result.ok
                    ? `LinkUp request sent to ${student.name}.`
                    : (result.reason ?? 'Could not send.')
                );
              }}
            >
              LinkUp with {student.name.split(' ')[0]}
            </button>
          )}
        </div>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <StudentProfileInner id={params.id} />
    </AppShell>
  );
}
