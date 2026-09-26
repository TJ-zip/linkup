'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import TopBar from '@/components/TopBar';
import MatchCard from '@/components/MatchCard';
import EmptyState from '@/components/EmptyState';
import MultiSelect from '@/components/MultiSelect';
import Toast from '@/components/Toast';
import { useStore } from '@/lib/store';
import { STUDENTS } from '@/lib/students';
import { rankMatches } from '@/lib/matching';
import {
  CAREER_INTERESTS,
  COURSES,
  GOALS,
  HOBBIES,
  INTERESTS,
  LOOKING_FOR,
  SKILLS,
  YEARS
} from '@/lib/options';

function DiscoverInner() {
  const { me, outgoing, isPremium, sendLinkUp, incognito } = useStore();
  const [query, setQuery] = useState('');
  const [campusOnly, setCampusOnly] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [fInterests, setFInterests] = useState<string[]>([]);
  const [fHobbies, setFHobbies] = useState<string[]>([]);
  const [fSkills, setFSkills] = useState<string[]>([]);
  const [fCareer, setFCareer] = useState<string[]>([]);
  const [fGoals, setFGoals] = useState<string[]>([]);
  const [fLooking, setFLooking] = useState<string[]>([]);
  const [fCourse, setFCourse] = useState('');
  const [fYear, setFYear] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const ranked = useMemo(() => (me ? rankMatches(me, STUDENTS) : []), [me]);

  const activeFilterCount =
    fInterests.length +
    fHobbies.length +
    fSkills.length +
    fCareer.length +
    fGoals.length +
    fLooking.length +
    (fCourse ? 1 : 0) +
    (fYear ? 1 : 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ranked.filter((m) => {
      const s = m.student;
      if (campusOnly && s.college !== me?.college) return false;

      if (q) {
        const haystack = [
          s.name,
          s.course,
          s.bio,
          ...s.interests,
          ...s.hobbies,
          ...s.skills,
          ...s.goals
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (!isPremium) return true;

      const has = (need: string[], have: string[]) =>
        need.length === 0 || need.some((n) => have.includes(n));

      if (!has(fInterests, s.interests)) return false;
      if (!has(fHobbies, s.hobbies)) return false;
      if (!has(fSkills, s.skills)) return false;
      if (!has(fCareer, s.careerInterests)) return false;
      if (!has(fGoals, s.goals)) return false;
      if (!has(fLooking, s.lookingFor)) return false;
      if (fCourse && s.course !== fCourse) return false;
      if (fYear && s.year !== fYear) return false;

      return true;
    });
  }, [
    ranked,
    query,
    campusOnly,
    me,
    isPremium,
    fInterests,
    fHobbies,
    fSkills,
    fCareer,
    fGoals,
    fLooking,
    fCourse,
    fYear
  ]);

  function handleLinkUp(id: string) {
    const result = sendLinkUp(id);
    setToast(result.ok ? 'LinkUp request sent.' : (result.reason ?? 'Could not send.'));
  }

  function clearFilters() {
    setFInterests([]);
    setFHobbies([]);
    setFSkills([]);
    setFCareer([]);
    setFGoals([]);
    setFLooking([]);
    setFCourse('');
    setFYear('');
  }

  return (
    <>
      <TopBar
        title="Discover"
        subtitle="Search students by what they do, not who they know."
      />

      <div className="space-y-3 px-5 pt-4">
        <div>
          <label className="sr-only" htmlFor="search">
            Search students
          </label>
          <input
            id="search"
            type="search"
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: photography, Python, case competition"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-ink-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink-300 accent-brand-500"
              checked={campusOnly}
              onChange={(e) => setCampusOnly(e.target.checked)}
            />
            My campus only
          </label>

          {isPremium ? (
            <button
              type="button"
              className="btn-secondary py-1.5 text-[13px]"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
            >
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
          ) : null}
        </div>

        {incognito ? (
          <p className="rounded-xl bg-ink-900 px-4 py-2.5 text-[12px] font-medium text-white">
            Incognito discovery is on. You are not appearing in anyone recently-viewed
            list.
          </p>
        ) : null}

        {!isPremium ? (
          <Link
            href="/premium"
            className="flex items-center justify-between rounded-xl border border-brand-300/60 bg-white px-4 py-3"
          >
            <span className="text-[13px] text-ink-700">
              <strong className="font-bold">Advanced Discovery</strong>
              <br />
              Filter by interest, skill, course, year, goal and more.
            </span>
            <span className="text-[12px] font-bold text-brand-600">Premium</span>
          </Link>
        ) : null}

        {isPremium && showFilters ? (
          <div className="card p-4">
            <MultiSelect
              legend="Interests"
              options={INTERESTS}
              value={fInterests}
              onChange={setFInterests}
            />
            <MultiSelect
              legend="Hobbies"
              options={HOBBIES}
              value={fHobbies}
              onChange={setFHobbies}
            />
            <MultiSelect
              legend="Skills"
              options={SKILLS}
              value={fSkills}
              onChange={setFSkills}
            />
            <MultiSelect
              legend="Career interests"
              options={CAREER_INTERESTS}
              value={fCareer}
              onChange={setFCareer}
            />
            <MultiSelect legend="Goals" options={GOALS} value={fGoals} onChange={setFGoals} />
            <MultiSelect
              legend="What they are looking for"
              options={LOOKING_FOR}
              value={fLooking}
              onChange={setFLooking}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="f-course">
                  Course
                </label>
                <select
                  id="f-course"
                  className="input"
                  value={fCourse}
                  onChange={(e) => setFCourse(e.target.value)}
                >
                  <option value="">Any</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="f-year">
                  Year
                </label>
                <select
                  id="f-year"
                  className="input"
                  value={fYear}
                  onChange={(e) => setFYear(e.target.value)}
                >
                  <option value="">Any</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="button" className="btn-ghost mt-2 w-full" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        ) : null}

        <p className="pt-1 text-[13px] font-medium text-ink-500">
          {results.length} student{results.length === 1 ? '' : 's'}
        </p>

        {results.length === 0 ? (
          <EmptyState
            emoji="🧭"
            title="No students match that yet"
            body="Try clearing a filter, or switch off campus-only to see students from nearby colleges."
          />
        ) : (
          <div className="space-y-3 pb-4">
            {results.map((match) => (
              <MatchCard
                key={match.student.id}
                match={match}
                state={outgoing[match.student.id]}
                premium={isPremium}
                onLinkUp={handleLinkUp}
              />
            ))}
          </div>
        )}
      </div>

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </>
  );
}

export default function DiscoverPage() {
  return (
    <AppShell>
      <DiscoverInner />
    </AppShell>
  );
}
