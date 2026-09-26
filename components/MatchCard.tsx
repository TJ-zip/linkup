'use client';

import Link from 'next/link';
import Avatar from './Avatar';
import Chip from './Chip';
import ScoreRing from './ScoreRing';
import PremiumBadge from './PremiumBadge';
import type { MatchResult, RequestState } from '@/lib/types';

interface MatchCardProps {
  match: MatchResult;
  state?: RequestState;
  premium: boolean;
  onLinkUp: (id: string) => void;
  compact?: boolean;
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] font-medium text-ink-500">
        <span>{label}</span>
        <span className="font-bold text-ink-700">{value}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
        role="presentation"
      >
        <div
          className="h-full rounded-full bg-brand-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function MatchCard({
  match,
  state,
  premium,
  onLinkUp,
  compact = false
}: MatchCardProps) {
  const { student, breakdown, reasons } = match;

  return (
    <article className="card animate-fade-up p-4">
      <div className="flex items-start gap-3">
        <Avatar
          name={student.name}
          seed={student.avatarSeed}
          emoji={student.emoji}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-[17px] font-bold leading-tight">{student.name}</h3>
            {student.premium ? <PremiumBadge small /> : null}
          </div>
          <p className="mt-0.5 text-[13px] text-ink-500">
            {student.course} · {student.year}
          </p>
          <p className="text-[13px] font-medium text-ink-700">{student.college}</p>
        </div>
        <ScoreRing value={breakdown.overall} />
      </div>

      {!compact ? (
        <p className="mt-3 text-[14px] leading-relaxed text-ink-700">{student.bio}</p>
      ) : null}

      <div className="mt-3 rounded-xl bg-brand-50/70 p-3">
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">
          Why you match
        </p>
        <ul className="space-y-1">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-[13px] text-ink-700">
              <span aria-hidden="true" className="text-brand-500">
                &bull;
              </span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {premium ? (
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <Bar label="Interest match" value={breakdown.interest} />
          <Bar label="Goal match" value={breakdown.goal} />
          <Bar label="Personality match" value={breakdown.personality} />
          <Bar label="Activity match" value={breakdown.activity} />
        </div>
      ) : (
        <p className="mt-3 text-[12px] text-ink-500">
          Premium shows the full interest, goal, personality and activity breakdown.
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {student.interests.slice(0, 4).map((interest) => (
          <Chip key={interest} tone="neutral">
            {interest}
          </Chip>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        {state === 'connected' ? (
          <Link href={`/chat/${student.id}`} className="btn-mint flex-1">
            Message
          </Link>
        ) : state === 'pending' ? (
          <button type="button" className="btn-secondary flex-1" disabled>
            Request sent
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary flex-1"
            onClick={() => onLinkUp(student.id)}
          >
            LinkUp
          </button>
        )}
        <Link href={`/profile/${student.id}`} className="btn-secondary">
          View profile
        </Link>
      </div>
    </article>
  );
}
