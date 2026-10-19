"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// The ThreeUI stylesheet (26 KB, inlined font) is fetched together with the scene, never up front.
const css = () => import("@designcodeio/threeui/style.css");
const scenes = {
  arc: dynamic(() => Promise.all([css(), import("@designcodeio/threeui/components/PredictiveArcCanvas")]).then(([, m]) => m.PredictiveArcCanvas), { ssr: false }),
  flow: dynamic(() => Promise.all([css(), import("@designcodeio/threeui/components/GatewayFlow")]).then(([, m]) => m.GatewayFlow), { ssr: false }),
  liquid: dynamic(() => Promise.all([css(), import("@designcodeio/threeui/components/LiquidFormBackground")]).then(([, m]) => m.LiquidFormBackground), { ssr: false }),
  constellation: dynamic(() => Promise.all([css(), import("@designcodeio/threeui/components/ConstellationField")]).then(([, m]) => m.ConstellationField), { ssr: false }),
};

// Per-scene tuning to the brand blue.
const props: Partial<Record<keyof typeof scenes, Record<string, number>>> = {
  liquid: { tintHue: 225, tintAmount: 0.6 },
  constellation: { hue: 225, opacity: 0.55 },
};

// A static poster paints instantly; the heavy WebGL code loads only after the visitor
// interacts (or after 10 s idle), and never for reduced-motion or data-saver users.
const poster = {
  arc: "radial-gradient(60% 45% at 50% 55%, rgba(124,77,255,.35), transparent 70%)",
  flow: "radial-gradient(50% 40% at 50% 50%, rgba(91,130,255,.18), transparent 70%)",
  liquid: "radial-gradient(60% 60% at 70% 50%, rgba(91,130,255,.4), transparent 70%)",
  constellation: "radial-gradient(50% 50% at 50% 40%, rgba(91,130,255,.12), transparent 70%)",
};

export default function Backdrop({ kind }: { kind: keyof typeof scenes }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const Scene = scenes[kind];

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(ref.current!);

    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || saveData) return () => io.disconnect();

    const events = ["pointerdown", "pointermove", "wheel", "keydown", "touchstart"] as const;
    const stop = () => events.forEach((e) => removeEventListener(e, go));
    const go = () => {
      setReady(true);
      stop();
      clearTimeout(timer);
    };
    const timer = setTimeout(go, 10000);
    events.forEach((e) => addEventListener(e, go, { passive: true }));
    return () => {
      io.disconnect();
      clearTimeout(timer);
      stop();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${kind === "constellation" ? "mix-blend-screen" : ""}`}
      style={{ backgroundImage: poster[kind] }}
    >
      {visible && ready && <Scene className="h-full w-full" {...props[kind]} />}
    </div>
  );
}
