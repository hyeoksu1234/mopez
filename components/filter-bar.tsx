"use client";

type FilterBarProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function FilterBar({ options, value, onChange }: FilterBarProps) {
  return (
    <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto rounded-2xl border-[2.5px] border-electric-blue bg-off-white/60 p-2 text-xs font-medium uppercase tracking-[0.24em] text-carbon/60 shadow-[0_8px_24px_rgba(17,17,17,0.06)] md:flex-wrap md:justify-center">
      {options.map((option) => {
        const isActive = option === value;
        return (
          <button
            key={option}
            className={`flex-shrink-0 rounded-2xl px-5 py-2 transition ${
              isActive
                ? "bg-electric-yellow text-off-white shadow-[0_12px_28px_rgba(255,122,0,0.22)]"
                : "hover:bg-electric-blue/10 hover:text-electric-blue"
            }`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
