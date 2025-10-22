"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const ctaMap: Record<string, { label: string; href: string }[]> = {
  "/journal": [
    { label: "뉴스레터 구독", href: "#newsletter" },
    { label: "저널 전체 보기", href: "/journal" },
  ],
  default: [
    { label: "문의하기", href: "/support/contact" },
    { label: "SNS 팔로우", href: "https://instagram.com" },
  ],
};

export function StickyCTA() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const ctas = useMemo(() => {
    const matched = Object.entries(ctaMap).find(([key]) =>
      key !== "default" ? pathname.startsWith(key) : false,
    );
    if (matched) {
      return matched[1];
    }
    return ctaMap.default;
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <aside className="fixed bottom-6 right-5 hidden md:flex lg:right-10 lg:bottom-10">
      {open ? (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={ctas[0].href}
              className="flex items-center justify-center rounded-2xl bg-electric-yellow px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-off-white shadow-[0_10px_30px_rgba(255,122,0,0.24)] transition hover:bg-electric-blue text-center"
              onClick={() => setOpen(false)}
            >
              {ctas[0].label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="빠른 액션 닫기"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-electric-yellow text-base font-semibold text-off-white shadow-[0_10px_30px_rgba(255,122,0,0.2)] transition hover:bg-electric-blue"
            >
              ×
            </button>
          </div>
          {ctas.slice(1).map((cta) => {
            const isExternal = cta.href.startsWith("http");
            return (
              <Link
                key={cta.href}
                href={cta.href}
                className="flex items-center justify-center rounded-2xl bg-electric-yellow px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-off-white shadow-[0_10px_30px_rgba(255,122,0,0.24)] transition hover:bg-electric-blue text-center"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </Link>
            );
          })}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="빠른 액션 열기"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-electric-yellow text-lg font-semibold text-off-white shadow-[0_10px_30px_rgba(255,122,0,0.28)] transition hover:bg-electric-blue"
        >
          +
        </button>
      )}
    </aside>
  );
}
