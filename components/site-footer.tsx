import Link from "next/link";

const footerNav = [
  {
    title: "Bikes",
    links: [
      { label: "Lineup", href: "/bikes/lineup" },
      { label: "Presets", href: "/bikes/presets" },
    ],
  },
  {
    title: "Story",
    links: [
      { label: "Philosophy", href: "/story" },
      { label: "Craft", href: "/story#craft" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty", href: "/support/warranty" },
      { label: "Contact", href: "/support/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-soft-gray bg-off-white">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-[2fr,1fr,1fr,1fr]">
          <div className="space-y-3 rounded-[24px] bg-electric-blue/5 p-6 text-sm text-ink">
            <p className="font-display text-lg font-semibold text-electric-blue">
              MOPEZ
            </p>
            <p>
              모듈형 퍼스널 모빌리티 브랜드 MOPEZ. 사진을 통해 모듈의 자유로움을
              기록하고, 프리셋으로 주행 감성을 안내합니다.
            </p>
            <p className="inline-flex rounded-full bg-electric-yellow px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-off-white">
              Create Your Own MOPEZ
            </p>
          </div>
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-electric-blue">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-ink">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition hover:text-electric-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-soft-gray pt-8 text-xs text-ink md:flex-row md:items-center md:justify-between">
          <p className="text-electric-blue">
            © {new Date().getFullYear()} MOPEZ. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="https://instagram.com"
              className="hover:text-electric-yellow"
            >
              Instagram
            </Link>
            <Link
              href="https://behance.net"
              className="hover:text-electric-yellow"
            >
              Behance
            </Link>
            <Link href="/brand-kit" className="hover:text-electric-yellow">
              Media Kit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
