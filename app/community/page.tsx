'use client';

import { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { COMMUNITY } from '@/lib/community';

const KINDS = ['All', 'Event', 'Club', 'Meetup', 'Project', 'Opportunity', 'Activity'];

function CommunityInner() {
  const { me, joined, toggleJoined } = useStore();
  const [kind, setKind] = useState('All');
  const [campusOnly, setCampusOnly] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const posts = useMemo(
    () =>
      COMMUNITY.filter((p) => {
        if (kind !== 'All' && p.kind !== kind) return false;
        if (campusOnly && p.college !== me?.college) return false;
        return true;
      }),
    [kind, campusOnly, me]
  );

  return (
    <>
      <TopBar
        title="Community"
        subtitle="Events, clubs, projects and opportunities around you."
      />

      <div className="px-5 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`chip shrink-0 border ${
                kind === k
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-ink-300/40 bg-white text-ink-700'
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        <label className="mb-3 flex cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-ink-300 accent-brand-500"
            checked={campusOnly}
            onChange={(e) => setCampusOnly(e.target.checked)}
          />
          My campus only
        </label>

        {posts.length === 0 ? (
          <EmptyState
            emoji="📅"
            title="Nothing here yet"
            body="Try another category, or switch off campus-only to see nearby colleges."
          />
        ) : (
          <div className="space-y-3 pb-4">
            {posts.map((post) => {
              const isJoined = joined.includes(post.id);
              return (
                <article key={post.id} className="card animate-fade-up p-4">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-xl"
                    >
                      {post.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Chip tone="brand">{post.kind}</Chip>
                        <span className="truncate text-[12px] text-ink-500">
                          {post.college}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-[16px] font-bold leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] text-ink-500">
                        {post.when} · {post.where}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[14px] leading-relaxed text-ink-700">
                    {post.blurb}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[12px] text-ink-500">
                      {post.attending + (isJoined ? 1 : 0)} students interested · hosted by{' '}
                      {post.host}
                    </p>
                    <button
                      type="button"
                      className={isJoined ? 'btn-secondary py-1.5' : 'btn-primary py-1.5'}
                      onClick={() => {
                        toggleJoined(post.id);
                        setToast(
                          isJoined
                            ? `Removed from ${post.title}.`
                            : `You are in for ${post.title}.`
                        );
                      }}
                    >
                      {isJoined ? 'Going' : 'I am in'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function CommunityPage() {
  return (
    <AppShell>
      <CommunityInner />
    </AppShell>
  );
}
