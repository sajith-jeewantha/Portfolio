/** Shared geometry for the rose-window hero art (SVG coordinates, centre at 0,0). */
export type Pt = [number, number];

export const round = (n: number) => +n.toFixed(2);

/** Polar → cartesian, 0° at the top, clockwise. */
export const polar = (r: number, deg: number): Pt => [
  round(r * Math.sin((deg * Math.PI) / 180)),
  round(-r * Math.cos((deg * Math.PI) / 180)),
];
export const pt = (r: number, deg: number) => polar(r, deg).join(' ');

/** Pointed-arch (gothic lancet) petal between radii r1 → r2 at angle `a`, half-width `w` degrees. */
export function lancet(r1: number, r2: number, a: number, w: number) {
  const mid = r1 + (r2 - r1) * 0.55;
  return [
    `M ${pt(r1, a - w)}`,
    `Q ${pt(mid, a - w * 1.18)} ${pt(r2, a)}`,
    `Q ${pt(mid, a + w * 1.18)} ${pt(r1, a + w)}`,
    `A ${r1} ${r1} 0 0 0 ${pt(r1, a - w)} Z`,
  ].join(' ');
}

/** Annular sector (a "cell" of a polar grid). */
export function sector(r1: number, r2: number, a1: number, a2: number) {
  const large = a2 - a1 > 180 ? 1 : 0;
  return [
    `M ${pt(r1, a1)}`,
    `L ${pt(r2, a1)}`,
    `A ${r2} ${r2} 0 ${large} 1 ${pt(r2, a2)}`,
    `L ${pt(r1, a2)}`,
    `A ${r1} ${r1} 0 ${large} 0 ${pt(r1, a1)}`,
    'Z',
  ].join(' ');
}

/** Arc along a circle from a1 → a2 (clockwise). */
export function arc(r: number, a1: number, a2: number) {
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M ${pt(r, a1)} A ${r} ${r} 0 ${large} 1 ${pt(r, a2)}`;
}

/** Full circle as a path starting at the top (for <textPath>). */
export const circlePath = (r: number) => `M 0 ${-r} A ${r} ${r} 0 1 1 0 ${r} A ${r} ${r} 0 1 1 0 ${-r}`;

/** Deterministic pseudo-random in [0,1) — stable across builds. */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const glassFills = ['fill-lapis', 'fill-ruby', 'fill-gold', 'fill-emerald', 'fill-amethyst'];
export const glassStrokes = ['stroke-lapis', 'stroke-ruby', 'stroke-gold', 'stroke-emerald', 'stroke-amethyst'];
