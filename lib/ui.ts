// Shared class tokens so every section, card and control uses the same scale.
export const container = "mx-auto w-full max-w-7xl px-5";
export const section = "py-24 sm:py-32";
export const afterHeading = "mt-12 sm:mt-16";

export const h2 = "max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl";
export const h3 = "text-balance font-display text-2xl font-bold leading-tight";
export const lead = "mt-6 max-w-2xl text-pretty text-lg text-muted";
export const body = "mt-3 text-pretty text-muted";
export const label = "font-mono text-sm text-subtle";

// Shape only; pair with exactly one surface so background/border utilities never compete.
export const cardShape = "spot rounded-3xl border p-8 sm:p-10";
export const card = `${cardShape} border-white/10 bg-panel/80`;
export const cardFeatured = `${cardShape} border-sidi/50 bg-sidi/10`;

export const cta =
  "magnetic inline-flex min-h-12 items-center rounded-full bg-white px-7 font-bold text-ink hover:bg-mint";
export const pill =
  "inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 transition-colors hover:border-white hover:bg-white hover:text-ink";
export const navLink = "inline-flex min-h-11 items-center text-muted transition-colors hover:text-white";
