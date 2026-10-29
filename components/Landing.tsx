import Backdrop from "@/components/Backdrop";
import Interactions from "@/components/Interactions";
import MoneyCalculator from "@/components/MoneyCalculator";
import Motion from "@/components/Motion";
import { copy, waLink, type Lang } from "@/lib/site";
import { afterHeading, body, card, cardFeatured, cardShape, container, cta, h2, h3, label, lead, navLink, pill, section } from "@/lib/ui";

const storyText =
  "max-w-5xl text-balance font-display text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold leading-[0.92] tracking-tight";

export default function Landing({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const otherLang = lang === "fr" ? "en" : "fr";
  const otherHref = lang === "fr" ? "/en" : "/";
  const wa = waLink(lang);
  const id = (i: number) => c.nav[i][1].slice(1);
  const switchProps = { href: otherHref, hrefLang: otherLang, lang: otherLang, "aria-label": `${c.switchLabel}, ${c.switchAria}` };

  return (
    <>
      {/* First-visit intro (pure CSS; hidden on repeat visits and for reduced motion). */}
      <div className="preloader" aria-hidden="true">
        <span className="font-display text-6xl font-extrabold tracking-tight sm:text-8xl">
          {"avyro".split("").map((ch, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>{ch}</span>
          ))}
        </span>
      </div>

      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-white px-5 py-3 font-bold text-ink focus:translate-y-0"
      >
        {c.skip}
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-30">
        <div className={`${container} flex items-center justify-between gap-4 py-2`}>
          <a href={lang === "fr" ? "/" : "/en"} className="inline-flex min-h-11 items-center font-display text-2xl font-extrabold tracking-tight">
            avyro
          </a>
          <nav aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"} className="hidden gap-7 font-mono text-sm md:flex">
            {c.nav.map(([text, href]) => (
              <a key={href} href={href} className={navLink}>{text}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 font-mono text-sm">
            <a {...switchProps} className={pill}>{c.switchLabel}</a>
            <a href={wa} className={pill}>{c.waShort}</a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero: pinned scroll story (see components/Motion.tsx). Without motion only the h1 shows. */}
        <section aria-labelledby="hero-title" className="hero relative h-svh min-h-140 overflow-hidden">
          <Backdrop kind="arc" />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
          <div className={`${container} relative z-10 flex h-full flex-col justify-end pb-8 pt-28 sm:pb-12`}>
            <div className="story">
              <h1 id="hero-title" className={storyText}>{c.h1}</h1>
              {c.story.map((s) => (
                <p key={s} className={storyText}>{s}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-6 sm:mt-10 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-pretty text-lg text-muted">{c.sub}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={wa} className={cta}>{c.cta}</a>
                <span className={label}>{c.reply}</span>
              </div>
            </div>
            <div className="story-progress mt-8 items-center gap-4 font-mono text-sm text-subtle" aria-hidden="true">
              <span className="story-count tabular-nums">01</span>
              <span className="relative h-px flex-1 bg-white/15">
                <span className="story-bar absolute inset-0 origin-left scale-x-0 bg-sidi" />
              </span>
              <span className="tabular-nums">{String(c.story.length + 1).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        {/* Problem: the funnel */}
        <section id={id(0)} aria-labelledby="problem-title" className="defer relative overflow-hidden border-y border-white/10">
          <Backdrop kind="flow" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/80 via-transparent to-ink/90" />
          <div className={`${container} ${section} relative z-10`}>
            <h2 id="problem-title" className={h2}>{c.problemTitle}</h2>
            <p className={lead}>{c.problemIntro}</p>
            <ul className={`${afterHeading} grid gap-5 md:grid-cols-3`}>
              {c.leaks.map(([t, d]) => (
                <li key={t} className={card}>
                  <h3 className={h3}>{t}</h3>
                  <p className={body}>{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Statement */}
        <section className={`defer ${container} py-32 sm:py-48`}>
          <p className="statement max-w-6xl text-balance font-display text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold leading-[1.04] tracking-tight">
            <span>{c.statement}</span>
          </p>
        </section>

        {/* Calculator */}
        <section id={id(1)} aria-labelledby="calc-title" className="defer bg-panel">
          <div className={`${container} ${section}`}>
            <h2 id="calc-title" className={h2}>{c.calc.title}</h2>
            <p className={lead}>{c.calc.intro}</p>
            <MoneyCalculator lang={lang} c={c.calc} />
          </div>
        </section>

        {/* Services */}
        <section id={id(2)} aria-labelledby="services-title" className={`defer ${container} ${section}`}>
          <h2 id="services-title" className={h2}>{c.servicesTitle}</h2>
          <ul className={`${afterHeading} divide-y divide-white/10 border-y border-white/10`}>
            {c.services.map(([t, d]) => (
              <li key={t} className="grid gap-3 py-8 sm:py-10 md:grid-cols-2 md:gap-16">
                <h3 className={`${h3} sm:text-3xl`}>{t}</h3>
                <p className="text-pretty text-lg text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Industries marquee */}
        <section aria-labelledby="industries-title" className="defer overflow-hidden border-y border-white/10 py-16 sm:py-20">
          <div className={`${container} flex items-center justify-between gap-4`}>
            <h2 id="industries-title" className={label}>{c.industriesTitle}</h2>
            <label className={`${pill} cursor-pointer font-mono text-sm has-checked:border-white has-checked:bg-white has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-harissa`}>
              <input type="checkbox" className="marquee-toggle sr-only" />
              pause
            </label>
          </div>
          <div className="marquee mt-10 flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 || undefined} className="flex shrink-0 gap-12 pr-12">
                {c.industries.map((name, i) => (
                  <li key={name} className={`whitespace-nowrap font-display text-4xl font-bold tracking-tight sm:text-6xl ${i % 2 ? "text-sidi" : "text-text"}`}>
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* Process timeline */}
        <section aria-labelledby="process-title" className="defer relative overflow-x-clip">
          <Backdrop kind="constellation" />
          <div className="absolute inset-0 bg-linear-to-b from-ink via-ink/30 to-ink" />
          <div className={`${container} ${section} relative z-10`}>
            <h2 id="process-title" className={h2}>{c.processTitle}</h2>
            <ol className={`timeline ${afterHeading} space-y-8`}>
              {c.process.map(([t, d], i) => (
                <li key={t}>
                  <div className={`step ${cardShape} border-white/10 bg-panel/90`}>
                    <span aria-hidden="true" className="font-display text-5xl font-extrabold leading-none tracking-tight text-sidi sm:text-6xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`${h3} mt-6`}>{t}</h3>
                    <p className={body}>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section id={id(3)} aria-labelledby="pricing-title" className={`defer ${container} ${section}`}>
          <h2 id="pricing-title" className={h2}>{c.pricingTitle}</h2>
          <ul className={`${afterHeading} grid gap-5 md:grid-cols-3`}>
            {c.plans.map(([n, price, items], i) => (
              <li key={n} className={`${i === 1 ? cardFeatured : card} tilt`}>
                <h3 className={label}>{n}</h3>
                <p className="mt-4 whitespace-nowrap font-display text-4xl font-extrabold tracking-tight">{price}</p>
                <ul className="mt-8 space-y-3 text-muted">
                  {items.map((it) => (
                    <li key={it} className="flex gap-3"><span className="text-mint" aria-hidden="true">+</span>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className={`defer ${container} pb-24 sm:pb-32`}>
          <h2 id="faq-title" className={h2}>{c.faqTitle}</h2>
          <div className={`${afterHeading} max-w-3xl divide-y divide-white/10 border-y border-white/10`}>
            {c.faq.map(([q, a]) => (
              <details key={q} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-semibold transition-colors hover:text-sidi sm:text-xl">
                  {q}
                  <span aria-hidden="true" className="text-2xl font-normal leading-none text-sidi transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl text-pretty pb-6 text-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing call to action */}
        <section aria-labelledby="end-title" className="defer relative overflow-hidden">
          <Backdrop kind="liquid" />
          <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-transparent" />
          <div className={`${container} relative z-10 py-32 sm:py-40`}>
            <h2 id="end-title" className="max-w-4xl text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">{c.endTitle}</h2>
            <p className={lead}>{c.endText}</p>
            <a href={wa} className={`${cta} mt-10`}>{c.endCta}</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-2 py-6 font-mono text-sm text-subtle sm:flex-row sm:items-center sm:justify-between`}>
          <p>{c.footer}</p>
          <div className="flex gap-6">
            <a href={wa} className={navLink}>{c.waShort}</a>
            <a {...switchProps} className={navLink}>{c.switchLabel}</a>
          </div>
        </div>
      </footer>
      <Interactions />
      <Motion />
    </>
  );
}
