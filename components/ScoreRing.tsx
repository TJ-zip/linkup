interface ScoreRingProps {
  value: number;
  size?: number;
  label?: string;
}

export default function ScoreRing({ value, size = 52, label }: ScoreRingProps) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, value)) / 100);
  const tone = value >= 85 ? '#12B886' : value >= 70 ? '#5B5BD6' : '#98A1B8';

  return (
    <div
      className="flex shrink-0 flex-col items-center"
      role="img"
      aria-label={`${value} percent match${label ? ` on ${label}` : ''}`}
    >
      <svg width={size} height={size} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EEF0F6"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize={size / 3.6}
          fontWeight="700"
          fill="#0B1020"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
