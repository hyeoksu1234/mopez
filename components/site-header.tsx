"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/bikes/lineup", label: "Bikes" },
  { href: "/story", label: "Story" },
  { href: "/journal", label: "Journal" },
  { href: "/support/warranty", label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const assetPrefix =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_BASE_PATH ?? ""
      : "";
  const logoSrc = assetPrefix ? `${assetPrefix}/img/logo.png` : "/img/logo.png";

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-off-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoSrc}
            alt="MOPEZ"
            width={132}
            height={32}
            priority
            unoptimized
          />
          <span className="sr-only">MOPEZ Home</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink md:flex">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-electric-yellow ${
                  isActive ? "text-electric-blue" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/support/contact"
          className="hidden rounded-full bg-electric-yellow px-6 py-2 text-xs font-semibold uppercase tracking-wide text-off-white transition hover:bg-electric-blue md:inline-flex"
        >
          문의하기
        </Link>

        <button
          className="inline-flex flex-col gap-1 md:hidden"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`h-[2px] w-6 bg-carbon transition-transform duration-200 ${
              menuOpen ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-carbon transition-all duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-carbon transition-transform duration-200 ${
              menuOpen ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-off-white/95 backdrop-blur-sm md:hidden">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-5 py-6">
            <div className="mb-10 flex items-center justify-between">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src={logoSrc}
                  alt="MOPEZ"
                  width={132}
                  height={32}
                  priority
                  unoptimized
                />
                <span className="sr-only">MOPEZ Home</span>
              </Link>
              <button
                className="rounded-full border border-electric-blue px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-electric-blue"
                onClick={() => setMenuOpen(false)}
              >
                닫기
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-semibold text-electric-blue">
              {navigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`uppercase tracking-[0.3em] ${
                      isActive ? "text-electric-yellow" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <Link
                href="/support/contact"
                className="rounded-full bg-electric-yellow px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-off-white"
                onClick={() => setMenuOpen(false)}
              >
                문의하기
              </Link>
              <div className="text-xs uppercase tracking-[0.24em] text-carbon/60">
                Create Your Own MOPEZ
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
