"use client";
import { useEffect } from "react";

type Move = (el: HTMLElement, x: number, y: number) => void;

// Attaches pointer handlers to every element matching `sel`; x/y are 0..1 within the element.
function bind(sel: string, move: Move, leave: (el: HTMLElement) => void) {
  const off: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    const m = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      move(el, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    };
    const l = () => leave(el);
    el.addEventListener("pointermove", m);
    el.addEventListener("pointerleave", l);
    off.push(() => {
      el.removeEventListener("pointermove", m);
      el.removeEventListener("pointerleave", l);
    });
  });
  return off;
}

// Pointer effects for mouse users only (no-ops on touch):
//   .spot      soft light that follows the cursor (sets --mx/--my, painted in CSS)
//   .tilt      card leans towards the cursor
//   .magnetic  button drifts a few pixels towards the cursor
// Tilt and magnetic are skipped for reduced-motion users. Wired up when the browser is idle,
// since none of it is needed for first paint.
export default function Interactions() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let off: (() => void)[] = [];

    const setup = () => {
      off = bind(
        ".spot",
        (el, x, y) => {
          el.style.setProperty("--mx", `${x * 100}%`);
          el.style.setProperty("--my", `${y * 100}%`);
        },
        (el) => {
          el.style.removeProperty("--mx");
          el.style.removeProperty("--my");
        }
      );
      if (still) return;
      off.push(
        ...bind(".tilt", (el, x, y) => {
          el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg)`;
        }, (el) => { el.style.transform = ""; }),
        ...bind(".magnetic", (el, x, y) => {
          el.style.transform = `translate(${(x - 0.5) * 14}px, ${(y - 0.5) * 10}px)`;
        }, (el) => { el.style.transform = ""; })
      );
    };

    const idle = "requestIdleCallback" in window;
    const handle = idle ? requestIdleCallback(setup) : window.setTimeout(setup, 200);
    return () => {
      if (idle) cancelIdleCallback(handle);
      else clearTimeout(handle);
      off.forEach((f) => f());
    };
  }, []);

  return null;
}
