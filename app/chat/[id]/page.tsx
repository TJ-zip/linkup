'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import Avatar from '@/components/Avatar';
import Chip from '@/components/Chip';
import EmptyState from '@/components/EmptyState';
import { useStore } from '@/lib/store';
import { studentById } from '@/lib/students';
import { buildMatch, conversationStarters } from '@/lib/matching';

function ChatInner({ id }: { id: string }) {
  const { me, outgoing, messages, sendMessage, isPremium } = useStore();
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  const student = studentById(id);
  const thread = messages[id] ?? [];

  const match = useMemo(
    () => (me && student ? buildMatch(me, student) : null),
    [me, student]
  );

  const starters = useMemo(
    () => (match ? conversationStarters(match, isPremium) : []),
    [match, isPremium]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [thread.length]);

  if (!student || !match) {
    return (
      <>
        <TopBar title="Conversation" back />
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

  if (outgoing[id] !== 'connected') {
    return (
      <>
        <TopBar title={student.name} back />
        <div className="px-5 pt-4">
          <EmptyState
            emoji="🔒"
            title="Connect first"
            body="Messaging opens once you and this student have accepted a LinkUp."
          />
          <Link href={`/profile/${id}`} className="btn-secondary mt-3 w-full">
            View their profile
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        title={student.name}
        subtitle={`${student.course} · ${student.year}`}
        back
        action={
          <Link href={`/profile/${id}`} aria-label={`View profile of ${student.name}`}>
            <Avatar name={student.name} seed={student.avatarSeed} emoji={student.emoji} />
          </Link>
        }
      />

      <div className="px-5 pt-4">
        <section className="card p-4">
          <h2 className="text-[13px] font-bold text-ink-900">What you have in common</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {match.shared.interests.map((i) => (
              <Chip key={i} tone="brand">
                {i}
              </Chip>
            ))}
            {match.shared.hobbies.map((h) => (
              <Chip key={h} tone="mint">
                {h}
              </Chip>
            ))}
            {match.shared.goals.map((g) => (
              <Chip key={g} tone="sun">
                {g}
              </Chip>
            ))}
            {match.shared.interests.length === 0 &&
            match.shared.hobbies.length === 0 &&
            match.shared.goals.length === 0 ? (
              <Chip>Different worlds, which is its own reason to talk</Chip>
            ) : null}
          </div>
        </section>

        <section className="mt-3">
          <h2 className="section-title mb-2">
            Conversation starters{isPremium ? '' : ' (1 of 4)'}
          </h2>
          <div className="space-y-2">
            {starters.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => setDraft(starter.split('Ask them: ')[1]?.replace(/^"|"$/g, '') ?? starter)}
                className="w-full rounded-xl bg-white p-3 text-left text-[13px] leading-relaxed text-ink-700 shadow-card hover:bg-brand-50"
              >
                {starter}
              </button>
            ))}
            {!isPremium ? (
              <Link
                href="/premium"
                className="flex items-center justify-between rounded-xl border border-brand-300/60 bg-white px-4 py-3"
              >
                <span className="text-[13px] text-ink-700">
                  <strong className="font-bold">Smart Conversation Starters</strong>
                  <br />
                  Premium generates a full set tailored to this person.
                </span>
                <span className="text-[12px] font-bold text-brand-600">Premium</span>
              </Link>
            ) : null}
          </div>
        </section>

        <section className="mt-4 space-y-2 pb-4" aria-label="Messages">
          {thread.length === 0 ? (
            <p className="py-6 text-center text-[13px] text-ink-500">
              No messages yet. Say something specific, it works better than hi.
            </p>
          ) : (
            thread.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${
                    msg.from === 'me'
                      ? 'rounded-br-md bg-brand-500 text-white'
                      : 'rounded-bl-md bg-white text-ink-900 shadow-card'
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))
          )}
          <div ref={endRef} />
        </section>
      </div>

      <form
        className="fixed inset-x-0 bottom-[62px] z-20 mx-auto flex w-full max-w-[520px] gap-2 border-t border-ink-300/20 bg-white p-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(id, draft);
          setDraft('');
        }}
      >
        <label className="sr-only" htmlFor="draft">
          Message {student.name}
        </label>
        <input
          id="draft"
          className="input flex-1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message"
          autoComplete="off"
        />
        <button type="submit" className="btn-primary" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </>
  );
}

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <ChatInner id={params.id} />
    </AppShell>
  );
}
