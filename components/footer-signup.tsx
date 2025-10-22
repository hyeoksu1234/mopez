export function FooterSignup() {
  return (
    <section
      id="newsletter"
      className="mx-auto mt-20 max-w-5xl rounded-[28px] border border-soft-gray bg-off-white px-6 py-12 shadow-[0_8px_24px_rgba(17,17,17,0.08)] md:px-12"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-carbon/60">
            Newsletter
          </span>
          <h3 className="font-display text-2xl font-semibold text-carbon">
            씬 큐레이션과 프리셋 업데이트를 받아보세요.
          </h3>
          <p className="text-sm text-ink">
            월 1–2회, 새 저널과 사진 시리즈, 테스트 라이딩 일정을 담아 전송합니다.
          </p>
        </div>
        <form className="flex w-full max-w-md flex-col gap-3 text-sm md:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">
            이메일
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="이메일 주소"
            className="w-full rounded-full border border-carbon/15 bg-off-white px-5 py-3 outline-none transition focus:border-electric-yellow focus:ring-2 focus:ring-electric-yellow/30"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-carbon px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-off-white transition hover:bg-electric-yellow hover:text-carbon"
          >
            구독
          </button>
        </form>
      </div>
    </section>
  );
}
