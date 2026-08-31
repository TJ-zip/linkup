const GRADIENTS = [
  'from-[#5B5BD6] to-[#8E7BF0]',
  'from-[#12B886] to-[#63D8B0]',
  'from-[#E8A317] to-[#F3C969]',
  'from-[#3B39A6] to-[#5B5BD6]',
  'from-[#0C8F69] to-[#3FBF95]',
  'from-[#6C5CE7] to-[#A29BFE]',
  'from-[#D6455B] to-[#F08A9B]',
  'from-[#2C7BE5] to-[#6FA8F5]',
  'from-[#7C4DFF] to-[#B39DFF]',
  'from-[#00897B] to-[#4DB6AC]',
  'from-[#C2410C] to-[#FB923C]',
  'from-[#1E3A8A] to-[#3B82F6]',
  'from-[#9333EA] to-[#C084FC]',
  'from-[#0F766E] to-[#2DD4BF]',
  'from-[#B45309] to-[#F59E0B]',
  'from-[#4338CA] to-[#818CF8]'
];

interface AvatarProps {
  name: string;
  seed: number;
  emoji?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hidden?: boolean;
}

const SIZES: Record<string, string> = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl'
};

const EMOJI_SIZES: Record<string, string> = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
  xl: 'text-lg'
};

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  name,
  seed,
  emoji,
  size = 'md',
  hidden = false
}: AvatarProps) {
  const gradient = GRADIENTS[Math.abs(seed) % GRADIENTS.length];

  if (hidden) {
    return (
      <div
        className={`${SIZES[size]} relative flex shrink-0 items-center justify-center rounded-full bg-ink-300/40 font-bold text-white`}
        aria-hidden="true"
      >
        <span>?</span>
      </div>
    );
  }

  return (
    <div
      className={`${SIZES[size]} relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-bold text-white`}
      role="img"
      aria-label={`Profile avatar for ${name}`}
    >
      <span>{initials(name)}</span>
      {emoji ? (
        <span
          className={`absolute -bottom-0.5 -right-0.5 flex h-1/2 w-1/2 items-center justify-center rounded-full bg-white shadow-sm ${EMOJI_SIZES[size]}`}
          aria-hidden="true"
        >
          {emoji}
        </span>
      ) : null}
    </div>
  );
}

export { GRADIENTS };
