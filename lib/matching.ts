import type { Breakdown, MatchResult, Student } from './types';

function norm(v: string): string {
  return v.trim().toLowerCase();
}

export function overlap(a: string[], b: string[]): string[] {
  const setB = new Set(b.map(norm));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of a) {
    const key = norm(item);
    if (setB.has(key) && !seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

/** Dice coefficient, expressed as a 0-100 score. Deterministic. */
function dice(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const shared = overlap(a, b).length;
  return Math.round((200 * shared) / (a.length + b.length));
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * Skills the other person has that the viewer does not, limited to people whose
 * career interests or goals actually overlap. This is what makes a pairing
 * complementary rather than merely similar.
 */
export function complementarySkills(me: Student, them: Student): string[] {
  const mine = new Set(me.skills.map(norm));
  const relevant =
    overlap(me.careerInterests, them.careerInterests).length > 0 ||
    overlap(me.goals, them.goals).length > 0;
  if (!relevant) return [];
  return them.skills.filter((s) => !mine.has(norm(s))).slice(0, 3);
}

export function scoreMatch(me: Student, them: Student): Breakdown {
  const interest = clamp(
    Math.round(
      0.6 * dice(me.interests, them.interests) + 0.4 * dice(me.hobbies, them.hobbies)
    ) + (overlap(me.interests, them.interests).length >= 3 ? 8 : 0),
    0,
    100
  );

  const goal = clamp(
    Math.round(
      0.4 * dice(me.goals, them.goals) +
        0.35 * dice(me.careerInterests, them.careerInterests) +
        0.25 * dice(me.lookingFor, them.lookingFor)
    ) + (overlap(me.lookingFor, them.lookingFor).length >= 2 ? 7 : 0),
    0,
    100
  );

  const personality = clamp(dice(me.personality, them.personality) + 10, 0, 100);
  const activity = clamp(dice(me.activities, them.activities) + 6, 0, 100);

  let overall =
    0.32 * interest + 0.28 * goal + 0.2 * personality + 0.2 * activity;

  if (me.college === them.college) overall += 6;
  if (me.course === them.course) overall += 3;
  if (me.year === them.year) overall += 2;
  if (complementarySkills(me, them).length > 0) overall += 4;

  return {
    interest,
    goal,
    personality,
    activity,
    overall: clamp(Math.round(overall), 38, 98)
  };
}

function list(items: string[], max = 2): string {
  const picked = items.slice(0, max);
  if (picked.length === 0) return '';
  if (picked.length === 1) return picked[0];
  return picked.slice(0, -1).join(', ') + ' and ' + picked[picked.length - 1];
}

export function buildMatch(me: Student, them: Student): MatchResult {
  const breakdown = scoreMatch(me, them);
  const shared = {
    interests: overlap(me.interests, them.interests),
    hobbies: overlap(me.hobbies, them.hobbies),
    goals: overlap(me.goals, them.goals),
    activities: overlap(me.activities, them.activities),
    personality: overlap(me.personality, them.personality),
    lookingFor: overlap(me.lookingFor, them.lookingFor)
  };
  const comp = complementarySkills(me, them);
  const reasons: string[] = [];

  if (shared.interests.length > 0) {
    reasons.push(`You both care about ${list(shared.interests)}`);
  }
  if (shared.lookingFor.length > 0) {
    reasons.push(`You are both here to ${list(shared.lookingFor).toLowerCase()}`);
  }
  if (shared.goals.length > 0) {
    reasons.push(`Same goal right now: ${list(shared.goals).toLowerCase()}`);
  }
  if (comp.length > 0) {
    reasons.push(`They bring skills you have not listed: ${list(comp, 3)}`);
  }
  if (shared.activities.length > 0) {
    reasons.push(`You both show up for ${list(shared.activities).toLowerCase()}`);
  }
  if (shared.hobbies.length > 0 && reasons.length < 3) {
    reasons.push(`Shared hobbies: ${list(shared.hobbies)}`);
  }
  if (shared.personality.length > 0 && reasons.length < 3) {
    reasons.push(`Similar energy: both ${list(shared.personality).toLowerCase()}`);
  }
  if (me.college === them.college && reasons.length < 3) {
    reasons.push(`Same campus, ${me.college}`);
  }
  if (reasons.length === 0) {
    reasons.push('New perspective from a different course and campus');
  }

  return {
    student: them,
    breakdown,
    reasons: reasons.slice(0, 3),
    shared,
    complementarySkills: comp,
    sameCollege: me.college === them.college
  };
}

export function rankMatches(me: Student, pool: Student[]): MatchResult[] {
  return pool
    .filter((s) => s.id !== me.id)
    .map((s) => buildMatch(me, s))
    .sort((a, b) => {
      if (b.breakdown.overall !== a.breakdown.overall) {
        return b.breakdown.overall - a.breakdown.overall;
      }
      if (a.sameCollege !== b.sameCollege) return a.sameCollege ? -1 : 1;
      return a.student.name.localeCompare(b.student.name);
    });
}

/** Conversation starters grounded in what the two people actually share. */
export function conversationStarters(match: MatchResult, premium: boolean): string[] {
  const s = match.shared;
  const out: string[] = [];

  if (s.activities.length > 0) {
    out.push(
      `You both show up for ${s.activities[0].toLowerCase()}. Ask them: "Been to any good ones this month?"`
    );
  }
  if (s.interests.includes('Entrepreneurship') || s.goals.includes('Build a startup')) {
    out.push(
      'You both want to build a startup. Ask them: "What would you build if you had unlimited resources?"'
    );
  }
  if (s.interests.length > 0) {
    out.push(
      `You both like ${s.interests[0]}. Ask them: "How did you get into ${s.interests[0].toLowerCase()}?"`
    );
  }
  if (s.hobbies.length > 0) {
    out.push(
      `Shared hobby: ${s.hobbies[0]}. Ask them: "Free this week to do ${s.hobbies[0].toLowerCase()} together?"`
    );
  }
  if (match.complementarySkills.length > 0) {
    out.push(
      `They know ${match.complementarySkills[0]}. Ask them: "How did you learn ${match.complementarySkills[0]}?"`
    );
  }
  if (s.goals.length > 0) {
    out.push(
      `Same goal: ${s.goals[0].toLowerCase()}. Ask them: "What is your plan for this semester?"`
    );
  }
  if (out.length === 0) {
    out.push(`Ask them what they are working on this semester.`);
  }

  return premium ? out.slice(0, 4) : out.slice(0, 1);
}
