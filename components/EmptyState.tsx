export default function EmptyState({
  emoji,
  title,
  body
}: {
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div className="card flex flex-col items-center px-6 py-10 text-center">
      <span className="mb-3 text-3xl" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="text-[15px] font-bold">{title}</h3>
      <p className="mt-1 max-w-[36ch] text-[13px] text-ink-500">{body}</p>
    </div>
  );
}
