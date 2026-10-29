"use client";
import { useEffect } from "react";

// All GSAP + Lenis motion lives here (wearebrand-style skew/blur language):
//   - Lenis smooth wheel scrolling, synced with ScrollTrigger
//   - pinned hero "story": statements skew + blur into each other, scrubbed by scroll
//   - split-line reveals for section headings as they enter the viewport
// Libraries are imported when the browser is idle, so they never delay first paint.
// Reduced-motion users get none of it (the page is complete without it).
export default function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let dispose = () => {};

    const start = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const root = document.documentElement;
      // Where the reader already is (early scroll, scroll restoration, or a #hash deep link).
      // The pin spacer is inserted below, so this position is restored once it exists.
      const y0 = window.scrollY;

      const lenis = new Lenis({ anchors: { offset: -80 } });
      const tick = (t: number) => lenis.raf(t * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const observers: IntersectionObserver[] = [];
      // Runs `fn` once, the first time `el` is mostly in view.
      const onView = (el: Element, fn: () => void) => {
        const io = new IntersectionObserver(([e]) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          fn();
        }, { rootMargin: "0px 0px -12% 0px" });
        io.observe(el);
        observers.push(io);
      };

      // Splits into masked lines and rises them in. Re-splits on resize without replaying.
      const revealLines = (el: HTMLElement) => {
        let played = false;
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            if (played) return;
            played = true;
            return gsap.from(self.lines, { yPercent: 110, skewY: 5, duration: 1, stagger: 0.08, ease: "power3.out" });
          },
        });
      };

      const ctx = gsap.context(() => {
        // --- Hero story ---------------------------------------------------
        const hero = document.querySelector<HTMLElement>(".hero");
        const frames = gsap.utils.toArray<HTMLElement>(".story > *");
        if (hero && frames.length > 1) {
          hero.classList.add("live");
          const bar = hero.querySelector<HTMLElement>(".story-bar");
          const count = hero.querySelector<HTMLElement>(".story-count");
          // opacity (not autoAlpha/visibility) so every statement, including the h1, stays in the
          // accessibility tree; the frames are non-interactive text.
          const hidden = { opacity: 0, yPercent: 14, skewY: 6, filter: "blur(16px)" };
          const heroBottom = hero.offsetTop + hero.offsetHeight; // measured before the pin spacer exists
          gsap.set(frames.slice(1), hidden);

          const tl = gsap.timeline({
            defaults: { duration: 1, ease: "sine.inOut" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () => `+=${(frames.length - 1) * window.innerHeight}`,
              pin: true,
              scrub: 1,
              snap: { snapTo: "labels", duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" },
              invalidateOnRefresh: true,
              onUpdate(self) {
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                if (count) count.textContent = String(Math.round(self.progress * (frames.length - 1)) + 1).padStart(2, "0");
              },
            },
          });
          tl.addLabel("f0");
          frames.slice(1).forEach((frame, i) => {
            tl.to(frames[i], { opacity: 0, yPercent: -14, skewY: -6, filter: "blur(16px)" })
              .to(frame, { opacity: 1, yPercent: 0, skewY: 0, filter: "blur(0px)" }, "<0.2")
              .addLabel(`f${i + 1}`);
          });

          // Keep the reader where they were: a deep link goes to its target, and a position that was
          // already past the hero is shifted by the distance the pin just added.
          // Only needed when not at the top (most visits skip this forced layout entirely).
          // Measure first: the pin spacer only gets its height on refresh, and Lenis caches the
          // scroll limit, so an immediate scrollTo would otherwise be clamped to the old page height.
          const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
          if (target || y0 >= heroBottom) {
            ScrollTrigger.refresh();
            lenis.resize();
            const st = tl.scrollTrigger!;
            if (target) lenis.scrollTo(target, { immediate: true, offset: -80 });
            else lenis.scrollTo(y0 + (st.end - st.start), { immediate: true });
          }
          // The h1 is deliberately not split/re-animated on load: it is the LCP element, and
          // re-rendering it after paint would push LCP back. The preloader wipe is the intro.
        }

        // --- Section headings ---------------------------------------------------
        // "motion" (which makes waiting h2s transparent) is added only once their observers exist,
        // so headings never blink out while fonts load.
        document.fonts.ready.then(() => {
          if (cancelled) return;
          root.classList.add("motion");
          ctx.add(() => {
            gsap.utils.toArray<HTMLElement>("main h2").forEach((h) => onView(h, () => ctx.add(() => revealLines(h))));
          });
        });
      });

      dispose = () => {
        observers.forEach((o) => o.disconnect());
        ctx.revert();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33); // GSAP default
        lenis.destroy();
        root.classList.remove("motion");
      };
    };

    const idle = "requestIdleCallback" in window;
    // A failed chunk download just means no motion; the page is complete without it.
    const run = () => void start().catch(() => {});
    const handle = idle ? requestIdleCallback(run, { timeout: 700 }) : window.setTimeout(run, 200);
    return () => {
      cancelled = true;
      if (idle) cancelIdleCallback(handle);
      else clearTimeout(handle);
      dispose();
    };
  }, []);

  return null;
}
