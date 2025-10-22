"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-4 rounded-[24px] border border-soft-gray bg-off-white px-6 py-8 shadow-[0_8px_24px_rgba(17,17,17,0.08)] md:px-10 md:py-12"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <h2 className="font-display text-2xl font-semibold text-carbon">
          상담 및 협업 문의
        </h2>
        <p className="text-sm text-ink">
          제품 상담, 테스트 라이딩, 미디어 협업을 남겨주시면 24시간 이내 안내드릴게요.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-carbon/80">
          이름
          <input
            name="name"
            required
            className="rounded-full border border-electric-blue/20 bg-off-white px-4 py-3 outline-none transition focus:border-electric-yellow focus:ring-2 focus:ring-electric-yellow/30"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-carbon/80">
          이메일
          <input
            type="email"
            name="email"
            required
            className="rounded-full border border-electric-blue/20 bg-off-white px-4 py-3 outline-none transition focus:border-electric-yellow focus:ring-2 focus:ring-electric-yellow/30"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-carbon/80 md:col-span-2">
          관심 프리셋
          <input
            name="preset"
            placeholder="예: City-01"
            className="rounded-full border border-electric-blue/20 bg-off-white px-4 py-3 outline-none transition focus:border-electric-yellow focus:ring-2 focus:ring-electric-yellow/30"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-carbon/80 md:col-span-2">
          메시지
          <textarea
            name="message"
            rows={4}
            className="rounded-3xl border border-electric-blue/20 bg-off-white px-4 py-3 outline-none transition focus:border-electric-yellow focus:ring-2 focus:ring-electric-yellow/30"
          />
        </label>
      </div>
      <button
        type="submit"
        className="rounded-full bg-electric-yellow px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-off-white transition hover:bg-electric-blue"
      >
        제출
      </button>
      {submitted && (
        <p className="text-sm text-electric-blue">
          전송이 완료되었습니다. 곧 연락드릴게요.
        </p>
      )}
    </form>
  );
}
