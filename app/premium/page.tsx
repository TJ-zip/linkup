'use client';

import { useState } from 'react';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { FREE_DAILY_LINKUPS } from '@/lib/options';

const FEATURES = [
  {
    emoji: '♾️',
    title: 'Unlimited LinkUps',
    body: `No daily cap on connection requests. Free students get ${FREE_DAILY_LINKUPS} a day.`
  },
  {
    emoji: '🎛️',
    title: 'Advanced Discovery',
    body: 'Filter people by interests, hobbies, skills, career interests, course, year, goals and what they are looking for.'
  },
  {
    emoji: '⭐',
    title: 'Who Matches With Me?',
    body: 'A dedicated list of every student who scores 85% or higher with you.'
  },
  {
    emoji: '📊',
    title: 'Enhanced Match Insights',
    body: 'See the full breakdown: interest, goal, personality and activity match, not just one number.'
  },
  {
    emoji: '🚀',
    title: 'Profile Boost',
    body: 'Thirty minutes of higher visibility, shown only to students you already match well with. Never a popularity contest.'
  },
  {
    emoji: '👀',
    title: 'See Who Linked Up With You',
    body: 'View the names and profiles of people who requested a LinkUp before you accept or decline.'
  },
  {
    emoji: '💬',
    title: 'Smart Conversation Starters',
    body: 'Personalised openers built from what you and the other person actually share.'
  },
  {
    emoji: '🕶️',
    title: 'Incognito Discovery',
    body: 'Browse profiles without showing up in anyone recently-viewed list.'
  },
  {
    emoji: '🏷️',
    title: 'Premium Badge',
    body: 'A subtle badge on your profile. Optional, and you can switch it off any time.'
  }
];

function PremiumInner() {
  const { isPremium, setPremium } = useStore();
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  const [toast, setToast] = useState<string | null>(null);

  return (
    <>
      <TopBar title="LinkUp Premium" back />

      <div className="px-5 pb-6 pt-4">
        <section className="rounded-2xl bg-ink-900 px-5 py-6 text-white">
          <h2 className="text-[24px] font-extrabold leading-tight">
            Meet better. Connect smarter.
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-white/75">
            Unlock more ways to find the people who actually match your vibe, goals and
            interests.
          </p>
          {isPremium ? (
            <p className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold">
              Premium is active on this account
            </p>
          ) : null}
        </section>

        <p className="mt-4 rounded-xl bg-mint-50 px-4 py-3 text-[13px] leading-relaxed text-mint-700">
          Basic LinkUp stays free, always. Making a profile, discovering people, accepting
          connections, chatting, joining communities and finding events do not need
          Premium.
        </p>

        <h3 className="mb-3 mt-6 text-[15px] font-bold">What you get</h3>
        <div className="space-y-2.5">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card flex gap-3 p-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-lg"
              >
                {feature.emoji}
              </span>
              <div>
                <h4 className="text-[15px] font-bold leading-snug">{feature.title}</h4>
                <p className="mt-0.5 text-[13px] leading-relaxed text-ink-500">
                  {feature.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <h3 className="mb-3 mt-6 text-[15px] font-bold">Choose a plan</h3>
        <div
          className="space-y-2.5"
          role="radiogroup"
          aria-label="LinkUp Premium plans"
        >
          <button
            type="button"
            role="radio"
            aria-checked={plan === 'monthly'}
            onClick={() => setPlan('monthly')}
            className={`flex w-full items-center justify-between rounded-2xl border-2 bg-white p-4 text-left ${
              plan === 'monthly' ? 'border-brand-500' : 'border-transparent shadow-card'
            }`}
          >
            <span>
              <span className="block text-[15px] font-bold">Monthly</span>
              <span className="block text-[12px] text-ink-500">Cancel any time</span>
            </span>
            <span className="text-[17px] font-extrabold">
              &#8377;79<span className="text-[12px] font-semibold text-ink-500">/mo</span>
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={plan === 'annual'}
            onClick={() => setPlan('annual')}
            className={`flex w-full items-center justify-between rounded-2xl border-2 bg-white p-4 text-left ${
              plan === 'annual' ? 'border-brand-500' : 'border-transparent shadow-card'
            }`}
          >
            <span>
              <span className="flex items-center gap-2">
                <span className="text-[15px] font-bold">Annual</span>
                <span className="chip bg-mint-50 text-mint-700">Save 37%</span>
              </span>
              <span className="block text-[12px] text-ink-500">
                &#8377;599 a year, about &#8377;50 a month
              </span>
            </span>
            <span className="text-[17px] font-extrabold">
              &#8377;599<span className="text-[12px] font-semibold text-ink-500">/yr</span>
            </span>
          </button>
        </div>

        {isPremium ? (
          <button
            type="button"
            className="btn-secondary mt-4 w-full"
            onClick={() => {
              setPremium(false);
              setToast('Premium switched off. Your free account is unchanged.');
            }}
          >
            Switch off Premium (demo)
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary mt-4 w-full"
            onClick={() => {
              setPremium(true);
              setToast(
                plan === 'annual'
                  ? 'Premium unlocked on the annual plan (demo).'
                  : 'Premium unlocked on the monthly plan (demo).'
              );
            }}
          >
            Upgrade to Premium
          </button>
        )}

        <button
          type="button"
          className="btn-ghost mt-2 w-full"
          onClick={() => setToast('No previous purchase found on this device.')}
        >
          Restore purchase
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-300">
          Prototype build. No payment is taken and no billing provider is connected.
          Upgrading here only toggles Premium features locally so they can be reviewed.
        </p>
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function PremiumPage() {
  return (
    <AppShell>
      <PremiumInner />
    </AppShell>
  );
}
