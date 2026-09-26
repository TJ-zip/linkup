'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import type { ReactNode } from 'react';
import type { Me, Message, RequestState } from './types';
import { SEEDED_INCOMING } from './students';
import { FREE_DAILY_LINKUPS } from './options';

const STORAGE_KEY = 'linkup:v1';

interface PersistedState {
  me: Me | null;
  outgoing: Record<string, RequestState>;
  incoming: string[];
  declined: string[];
  messages: Record<string, Message[]>;
  viewed: string[];
  boostUntil: number | null;
  requestLog: number[];
  joined: string[];
}

const EMPTY: PersistedState = {
  me: null,
  outgoing: {},
  incoming: SEEDED_INCOMING,
  declined: [],
  messages: {},
  viewed: [],
  boostUntil: null,
  requestLog: [],
  joined: []
};

interface StoreValue extends PersistedState {
  hydrated: boolean;
  isPremium: boolean;
  incognito: boolean;
  requestsUsedToday: number;
  requestsLeftToday: number;
  boostActive: boolean;
  saveMe: (me: Me) => void;
  updateMe: (patch: Partial<Me>) => void;
  sendLinkUp: (id: string) => { ok: boolean; reason?: string };
  acceptIncoming: (id: string) => void;
  declineIncoming: (id: string) => void;
  sendMessage: (id: string, text: string) => void;
  markViewed: (id: string) => void;
  setIncognito: (on: boolean) => void;
  startBoost: () => void;
  toggleJoined: (id: string) => void;
  setPremium: (on: boolean) => void;
  reset: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const DAY_MS = 24 * 60 * 60 * 1000;
const BOOST_MS = 30 * 60 * 1000;

function load(): PersistedState {
  if (typeof window === 'undefined') return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [incognito, setIncognitoState] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode); state stays in memory */
    }
  }, [state, hydrated]);

  const saveMe = useCallback((me: Me) => {
    setState((s) => ({ ...s, me }));
  }, []);

  const updateMe = useCallback((patch: Partial<Me>) => {
    setState((s) => (s.me ? { ...s, me: { ...s.me, ...patch } } : s));
  }, []);

  const setPremium = useCallback((on: boolean) => {
    setState((s) =>
      s.me ? { ...s, me: { ...s.me, premium: on, showPremiumBadge: on } } : s
    );
    if (!on) setIncognitoState(false);
  }, []);

  const isPremium = state.me?.premium ?? false;

  const requestsUsedToday = useMemo(() => {
    const cutoff = Date.now() - DAY_MS;
    return state.requestLog.filter((t) => t > cutoff).length;
  }, [state.requestLog]);

  const requestsLeftToday = isPremium
    ? Number.POSITIVE_INFINITY
    : Math.max(0, FREE_DAILY_LINKUPS - requestsUsedToday);

  const sendLinkUp = useCallback(
    (id: string) => {
      let result: { ok: boolean; reason?: string } = { ok: true };
      setState((s) => {
        if (s.outgoing[id]) {
          result = { ok: false, reason: 'Request already sent.' };
          return s;
        }
        const premium = s.me?.premium ?? false;
        const cutoff = Date.now() - DAY_MS;
        const recent = s.requestLog.filter((t) => t > cutoff);
        if (!premium && recent.length >= FREE_DAILY_LINKUPS) {
          result = {
            ok: false,
            reason: `You have used all ${FREE_DAILY_LINKUPS} free LinkUps for today. More unlock tomorrow.`
          };
          return s;
        }
        return {
          ...s,
          outgoing: { ...s.outgoing, [id]: 'pending' },
          requestLog: [...recent, Date.now()]
        };
      });
      return result;
    },
    []
  );

  const acceptIncoming = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      incoming: s.incoming.filter((x) => x !== id),
      outgoing: { ...s.outgoing, [id]: 'connected' }
    }));
  }, []);

  const declineIncoming = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      incoming: s.incoming.filter((x) => x !== id),
      declined: s.declined.includes(id) ? s.declined : [...s.declined, id]
    }));
  }, []);

  const sendMessage = useCallback((id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setState((s) => {
      const thread = s.messages[id] ?? [];
      const msg: Message = {
        id: `${Date.now()}-${thread.length}`,
        from: 'me',
        text: trimmed,
        ts: Date.now()
      };
      return { ...s, messages: { ...s.messages, [id]: [...thread, msg] } };
    });
  }, []);

  const markViewed = useCallback(
    (id: string) => {
      if (incognito) return;
      setState((s) =>
        s.viewed.includes(id)
          ? s
          : { ...s, viewed: [...s.viewed.slice(-19), id] }
      );
    },
    [incognito]
  );

  const startBoost = useCallback(() => {
    setState((s) => ({ ...s, boostUntil: Date.now() + BOOST_MS }));
  }, []);

  const toggleJoined = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      joined: s.joined.includes(id)
        ? s.joined.filter((x) => x !== id)
        : [...s.joined, id]
    }));
  }, []);

  const reset = useCallback(() => {
    setState(EMPTY);
    setIncognitoState(false);
  }, []);

  const setIncognito = useCallback(
    (on: boolean) => {
      if (!isPremium) return;
      setIncognitoState(on);
    },
    [isPremium]
  );

  const boostActive = (state.boostUntil ?? 0) > Date.now();

  const value: StoreValue = {
    ...state,
    hydrated,
    isPremium,
    incognito,
    requestsUsedToday,
    requestsLeftToday,
    boostActive,
    saveMe,
    updateMe,
    sendLinkUp,
    acceptIncoming,
    declineIncoming,
    sendMessage,
    markViewed,
    setIncognito,
    startBoost,
    toggleJoined,
    setPremium,
    reset
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
