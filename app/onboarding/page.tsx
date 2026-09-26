'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import MultiSelect from '@/components/MultiSelect';
import { useStore } from '@/lib/store';
import {
  ACTIVITIES,
  AVATAR_EMOJIS,
  CAREER_INTERESTS,
  COLLEGES,
  COURSES,
  GOALS,
  HOBBIES,
  INTERESTS,
  LOOKING_FOR,
  PERSONALITY,
  SKILLS,
  YEARS
} from '@/lib/options';

const TOTAL_STEPS = 8;

export default function OnboardingPage() {
  const router = useRouter();
  const { saveMe, hydrated } = useStore();

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(0);
  const [emoji, setEmoji] = useState(AVATAR_EMOJIS[0]);
  const [college, setCollege] = useState(COLLEGES[0].name);
  const [course, setCourse] = useState(COURSES[0]);
  const [year, setYear] = useState(YEARS[0]);
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [personality, setPersonality] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [bio, setBio] = useState('');

  const domain = useMemo(
    () => COLLEGES.find((c) => c.name === college)?.domain ?? 'college.edu',
    [college]
  );

  const canContinue = useMemo(() => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return name.trim().length >= 2;
      case 2:
        return verified;
      case 3:
        return interests.length >= 3;
      case 4:
        return hobbies.length >= 2 && activities.length >= 2;
      case 5:
        return skills.length >= 1 && careerInterests.length >= 1;
      case 6:
        return goals.length >= 1 && personality.length >= 2;
      case 7:
        return lookingFor.length >= 1;
      default:
        return false;
    }
  }, [
    step,
    name,
    verified,
    interests,
    hobbies,
    activities,
    skills,
    careerInterests,
    goals,
    personality,
    lookingFor
  ]);

  function sendCode() {
    const value = email.trim().toLowerCase();
    if (!value.includes('@')) {
      setError('Enter your college email address.');
      return;
    }
    if (!value.endsWith(`@${domain}`)) {
      setError(`Use your college email ending in @${domain}`);
      return;
    }
    setError('');
    setCodeSent(true);
  }

  function confirmCode() {
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code.');
      return;
    }
    setError('');
    setVerified(true);
  }

  function finish() {
    saveMe({
      id: 'me',
      name: name.trim(),
      avatarSeed,
      emoji,
      college,
      course,
      year,
      bio:
        bio.trim() ||
        `${course} student at ${college}. Here to meet people with similar goals.`,
      interests,
      hobbies,
      skills,
      careerInterests,
      goals,
      personality,
      activities,
      lookingFor,
      verified: true,
      verifiedEmail: email.trim().toLowerCase(),
      premium: false,
      showPremiumBadge: false,
      onboarded: true
    });
    router.replace('/home');
  }

  function next() {
    if (step === TOTAL_STEPS - 1) {
      finish();
      return;
    }
    setError('');
    setStep((s) => s + 1);
  }

  if (!hydrated) {
    return (
      <main className="shell flex min-h-screen items-center justify-center">
        <p className="text-sm text-ink-500">Loading LinkUp…</p>
      </main>
    );
  }

  return (
    <main className="shell flex min-h-screen flex-col px-5 pb-8 pt-6">
      {step > 0 ? (
        <div className="mb-6">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken"
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS - 1}
            aria-label="Onboarding progress"
          >
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${(step / (TOTAL_STEPS - 1)) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-[12px] font-medium text-ink-500">
            Step {step} of {TOTAL_STEPS - 1}
          </p>
        </div>
      ) : null}

      <div className="flex-1 animate-fade-up">
        {step === 0 ? (
          <section className="flex h-full flex-col justify-center py-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-3xl font-black text-white">
              L
            </div>
            <h1 className="text-[30px] font-extrabold leading-tight">
              Find the people
              <br />
              you are actually looking for.
            </h1>
            <p className="mx-auto mt-3 max-w-[34ch] text-[15px] leading-relaxed text-ink-500">
              LinkUp matches you with students on your campus by interests, goals,
              skills and personality. Not followers. Not popularity.
            </p>
            <p className="mt-6 text-[13px] font-semibold text-brand-600">
              No student should feel alone in a crowd.
            </p>
          </section>
        ) : null}

        {step === 1 ? (
          <section>
            <h2 className="text-2xl font-extrabold">The basics</h2>
            <p className="mt-1 text-[14px] text-ink-500">
              This is what other students see first.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Avatar name={name || 'You'} seed={avatarSeed} emoji={emoji} size="xl" />
              <div className="flex-1">
                <p className="label">Pick your look</p>
                <div className="flex flex-wrap gap-1.5">
                  {AVATAR_EMOJIS.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      aria-label={`Avatar style ${index + 1}`}
                      aria-pressed={emoji === option}
                      onClick={() => {
                        setEmoji(option);
                        setAvatarSeed(index);
                      }}
                      className={`h-8 w-8 rounded-lg border text-base transition-colors ${
                        emoji === option
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-ink-300/40 bg-white'
                      }`}
                    >
                      <span aria-hidden="true">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="label" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="label" htmlFor="college">
                  College
                </label>
                <select
                  id="college"
                  className="input"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                >
                  {COLLEGES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label" htmlFor="course">
                    Course
                  </label>
                  <select
                    id="course"
                    className="input"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="year">
                    Year
                  </label>
                  <select
                    id="year"
                    className="input"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section>
            <h2 className="text-2xl font-extrabold">Verify your college</h2>
            <p className="mt-1 text-[14px] text-ink-500">
              LinkUp is college-exclusive. Verification keeps your community real and
              relevant.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="label" htmlFor="email">
                  College email
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`you@${domain}`}
                  disabled={verified}
                  autoComplete="email"
                />
                <p className="mt-1.5 text-[12px] text-ink-500">
                  Must end in @{domain}
                </p>
              </div>

              {!codeSent ? (
                <button type="button" className="btn-primary w-full" onClick={sendCode}>
                  Send verification code
                </button>
              ) : null}

              {codeSent && !verified ? (
                <div>
                  <label className="label" htmlFor="code">
                    6-digit code
                  </label>
                  <input
                    id="code"
                    inputMode="numeric"
                    maxLength={6}
                    className="input tracking-[0.4em]"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                  />
                  <button
                    type="button"
                    className="btn-primary mt-3 w-full"
                    onClick={confirmCode}
                  >
                    Verify
                  </button>
                </div>
              ) : null}

              {verified ? (
                <div className="flex items-center gap-2 rounded-xl bg-mint-50 px-4 py-3 text-[14px] font-semibold text-mint-700">
                  <span aria-hidden="true">✓</span> Verified as a {college} student
                </div>
              ) : null}

              {error ? (
                <p role="alert" className="text-[13px] font-medium text-red-600">
                  {error}
                </p>
              ) : null}

              <p className="rounded-xl bg-surface-sunken px-4 py-3 text-[12px] leading-relaxed text-ink-500">
                Prototype note: no email is actually sent. Any 6-digit code is accepted
                so the demo can be explored end to end. A production build would send a
                real one-time code.
              </p>
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section>
            <h2 className="text-2xl font-extrabold">What are you into?</h2>
            <p className="mt-1 mb-6 text-[14px] text-ink-500">
              Pick at least 3. This drives most of your matching.
            </p>
            <MultiSelect
              legend="Interests"
              options={INTERESTS}
              value={interests}
              onChange={setInterests}
            />
          </section>
        ) : null}

        {step === 4 ? (
          <section>
            <h2 className="text-2xl font-extrabold">How you spend your time</h2>
            <p className="mt-1 mb-6 text-[14px] text-ink-500">
              Pick at least 2 hobbies and 2 activities.
            </p>
            <MultiSelect
              legend="Hobbies"
              options={HOBBIES}
              value={hobbies}
              onChange={setHobbies}
            />
            <MultiSelect
              legend="Activities you actually show up for"
              options={ACTIVITIES}
              value={activities}
              onChange={setActivities}
            />
          </section>
        ) : null}

        {step === 5 ? (
          <section>
            <h2 className="text-2xl font-extrabold">Skills and direction</h2>
            <p className="mt-1 mb-6 text-[14px] text-ink-500">
              Used to find people whose skills complement yours.
            </p>
            <MultiSelect
              legend="Skills"
              options={SKILLS}
              value={skills}
              onChange={setSkills}
            />
            <MultiSelect
              legend="Career interests"
              options={CAREER_INTERESTS}
              value={careerInterests}
              onChange={setCareerInterests}
            />
          </section>
        ) : null}

        {step === 6 ? (
          <section>
            <h2 className="text-2xl font-extrabold">Goals and personality</h2>
            <p className="mt-1 mb-6 text-[14px] text-ink-500">
              Pick at least 1 goal and 2 traits.
            </p>
            <MultiSelect
              legend="Goals this year"
              options={GOALS}
              value={goals}
              onChange={setGoals}
            />
            <MultiSelect
              legend="Personality"
              options={PERSONALITY}
              value={personality}
              onChange={setPersonality}
            />
          </section>
        ) : null}

        {step === 7 ? (
          <section>
            <h2 className="text-2xl font-extrabold">What are you looking for?</h2>
            <p className="mt-1 mb-6 text-[14px] text-ink-500">
              You can change this any time as your plans change.
            </p>
            <MultiSelect
              legend="Right now I want to"
              options={LOOKING_FOR}
              value={lookingFor}
              onChange={setLookingFor}
            />
            <div>
              <label className="label" htmlFor="bio">
                Short bio (optional)
              </label>
              <textarea
                id="bio"
                className="input min-h-[90px] resize-none"
                maxLength={160}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="One or two lines about you."
              />
              <p className="mt-1 text-right text-[12px] text-ink-300">
                {bio.length}/160
              </p>
            </div>
          </section>
        ) : null}
      </div>

      <div className="sticky bottom-0 mt-6 flex gap-3 bg-surface-muted pb-2 pt-3">
        {step > 0 ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </button>
        ) : null}
        <button
          type="button"
          className="btn-primary flex-1"
          disabled={!canContinue}
          onClick={next}
        >
          {step === 0
            ? 'Get started'
            : step === TOTAL_STEPS - 1
              ? 'Enter LinkUp'
              : 'Continue'}
        </button>
      </div>
    </main>
  );
}
