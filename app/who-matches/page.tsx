'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import MatchCard from '@/components/MatchCard';
import EmptyState from '@/components/EmptyState';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { STUDENTS } from '@/lib/students';
import { rankMatches } from '@/lib/matching';

const THRESHOLD = 85;

function WhoMatchesInner() {
  const { me, outgoing, isPremium, sendLinkUp } = useStore();
  const [toast, setToast] = useState<string | null>(null);

  const matches = useMemo(() => {
    if (!me) return [];
    return rankMatches(me, STUDENTS).filter((m) => m.breakdown.overall >= THRESHOLD);
  }, [me]);

  if (!isPremium) {
    return (
      <>
        <TopBar title="Who matches with me?" back />
        <div className="px-5 pt-4">
          <EmptyState
            emoji="⭐"
            title="This is a Premium feature"
            body="Premium shows every student who scores 85% or higher with you, ranked by compatibility."
          />
          <Link href="/premium" className="btn-primary mt-3 w-full">
            See Premium
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar
        title="Who matches with me?"
        subtitle={`${matches.length} students are an ${THRESHOLD}%+ match with you`}
        back
      />
      <div className="space-y-3 px-5 pt-4">
        {matches.length === 0 ? (
          <EmptyState
            emoji="🌱"
            title="No 85%+ matches yet"
            body="Add a few more interests, goals or activities to your profile and this list will fill up."
          />
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.student.id}
              match={match}
              state={outgoing[match.student.id]}
              premium
              onLinkUp={(id) => {
                const result = sendLinkUp(id);
                setToast(
                  result.ok ? 'LinkUp request sent.' : (result.reason ?? 'Could not send.')
                );
              }}
            />
          ))
        )}
      </div>
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function WhoMatchesPage() {
  return (
    <AppShell>
      <WhoMatchesInner />
    </AppShell>
  );
}
