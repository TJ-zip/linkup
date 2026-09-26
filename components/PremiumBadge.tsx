export default function PremiumBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-sun-50 font-semibold text-sun-700 ${
        small ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
      title="LinkUp Premium member"
    >
      <svg
        width={small ? 10 : 12}
        height={small ? 10 : 12}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 9.6 8.6 2.6 9.2l5.3 4.6-1.6 6.9L12 17l5.7 3.7-1.6-6.9 5.3-4.6-7-.6z" />
      </svg>
      Premium
    </span>
  );
}
