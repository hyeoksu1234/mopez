type FAQ = {
  question: string;
  answer: string;
};

type FAQListProps = {
  items: FAQ[];
};

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-[20px] border border-soft-gray bg-off-white px-5 py-4 shadow-[0_6px_18px_rgba(17,17,17,0.06)] transition hover:border-electric-yellow/70"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-carbon transition group-open:text-electric-yellow">
            {item.question}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
