"use client";
import { useEffect, useId, useRef, useState } from "react";
import { waLink, type CalcCopy, type Lang } from "@/lib/site";
import { afterHeading, cta } from "@/lib/ui";

// Eases the displayed number towards the new value; instant for reduced-motion users.
function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      const n = Math.round(a + (target - a) * (1 - (1 - p) ** 3));
      from.current = n;
      setValue(n);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
}

function Slider({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-muted">{label}</label>
        <span className="shrink-0 font-display text-xl font-bold tabular-nums" aria-hidden="true">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer accent-sidi"
      />
    </div>
  );
}

export default function MoneyCalculator({ lang, c }: { lang: Lang; c: CalcCopy }) {
  const [reach, setReach] = useState(20000);
  const [price, setPrice] = useState(60);
  const [rate, setRate] = useState(1);

  const monthly = Math.round(reach * (rate / 100) * price);
  const shown = useCountUp(monthly);
  const fmt = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US");
  const tnd = (n: number) => `${fmt.format(n)} TND`;

  return (
    <div className={`${afterHeading} grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
      <div className="space-y-8">
        <Slider label={c.reach} value={reach} display={fmt.format(reach)} min={1000} max={100000} step={1000} onChange={setReach} />
        <Slider label={c.price} value={price} display={tnd(price)} min={10} max={500} step={5} onChange={setPrice} />
        <Slider label={c.rate} value={rate} display={`${fmt.format(rate)} %`} min={0.5} max={5} step={0.5} onChange={setRate} />
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-sidi/50 bg-linear-to-br from-sidi/20 via-ink to-ink p-8 sm:p-10">
        {/* The animated figure is visual only; screen readers get the settled value once. */}
        <p className="font-display text-[clamp(2.25rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight text-text tabular-nums" aria-hidden="true">
          +{fmt.format(shown)} <span className="text-[0.4em] tracking-normal text-muted">TND</span>
        </p>
        <p className="sr-only" aria-live="polite">+{tnd(monthly)}</p>
        <p className="mt-4 text-pretty text-lg text-muted">{c.result}</p>
        <p className="mt-6 font-display text-2xl font-bold text-mint tabular-nums">
          {tnd(monthly * 12)} <span className="text-base font-normal text-muted">{c.perYear}</span>
        </p>
        <a href={waLink(lang, c.msg.replace("{amount}", tnd(monthly)))} className={`${cta} mt-8`}>
          {c.cta}
        </a>
        <p className="mt-6 text-pretty text-sm text-subtle">{c.note}</p>
      </div>
    </div>
  );
}
