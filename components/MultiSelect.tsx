'use client';

import { SelectChip } from './Chip';

interface MultiSelectProps {
  legend: string;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
}

export default function MultiSelect({
  legend,
  hint,
  options,
  value,
  onChange,
  max
}: MultiSelectProps) {
  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
      return;
    }
    if (max && value.length >= max) return;
    onChange([...value, option]);
  }

  return (
    <fieldset className="mb-6">
      <legend className="label">{legend}</legend>
      {hint ? <p className="mb-3 -mt-1 text-[13px] text-ink-500">{hint}</p> : null}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <SelectChip
            key={option}
            label={option}
            selected={value.includes(option)}
            onToggle={() => toggle(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}
