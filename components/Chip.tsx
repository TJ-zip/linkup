interface ChipProps {
  children: React.ReactNode;
  tone?: 'brand' | 'mint' | 'sun' | 'neutral';
}

const TONES: Record<string, string> = {
  brand: 'bg-brand-50 text-brand-700',
  mint: 'bg-mint-50 text-mint-700',
  sun: 'bg-sun-50 text-sun-700',
  neutral: 'bg-surface-sunken text-ink-500'
};

export default function Chip({ children, tone = 'neutral' }: ChipProps) {
  return <span className={`chip ${TONES[tone]}`}>{children}</span>;
}

interface SelectChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SelectChip({ label, selected, onToggle }: SelectChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`chip border transition-colors ${
        selected
          ? 'border-brand-500 bg-brand-500 text-white'
          : 'border-ink-300/50 bg-white text-ink-700 hover:border-brand-300'
      }`}
    >
      {label}
    </button>
  );
}
