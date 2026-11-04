/**
 * Hero art registry. Pick the live one with "heroArt" in src/data/site.json.
 * Compare them all at /design/.
 */
import RoseWindowV1 from './RoseWindow-v1.astro';
import RoseWindowV2 from './RoseWindow-v2.astro';
import RoseWindowV3 from './RoseWindow-v3.astro';
import RoseWindowV4 from './RoseWindow-v4.astro';
import RoseWindowV5 from './RoseWindow-v5.astro';
import RoseWindowV6 from './RoseWindow-v6.astro';
import RoseWindowV7 from './RoseWindow-v7.astro';
import RoseWindowV8 from './RoseWindow-v8.astro';
import RoseWindowV9 from './RoseWindow-v9.astro';
import RoseWindowV10 from './RoseWindow-v10.astro';

export const heroArts = [
  {
    key: 'v1',
    name: 'Rose Window',
    theme: 'Cathedral · neural network',
    file: 'src/components/RoseWindow-v1.astro',
    text: 'A circular rose window whose tracery is a neural network. Stained-glass lancets radiate from your portrait; signals travel along synapses while the window slowly turns.',
    Art: RoseWindowV1,
  },
  {
    key: 'v2',
    name: 'Lancet of Learning',
    theme: 'Cathedral · deep learning',
    file: 'src/components/RoseWindow-v2.astro',
    text: 'A tall gothic lancet window. The glass is a feed-forward neural network — input at the sill, hidden layers rising, output converging on your portrait in the oculus. Forward-pass signals pulse upward as light shimmers through.',
    Art: RoseWindowV2,
  },
  {
    key: 'v3',
    name: 'Compiled Rose',
    theme: 'Software engineering',
    file: 'src/components/RoseWindow-v3.astro',
    text: 'A rose window built from software: a rotating ring of source code, a git history with feature branches forking and merging, and a stained-glass service architecture (api, auth, db, cache, queue, ci/cd…) with requests flowing to you at the centre.',
    Art: RoseWindowV3,
  },
  {
    key: 'v4',
    name: 'Attention Rose',
    theme: 'AI · ML · deep learning',
    file: 'src/components/RoseWindow-v4.astro',
    text: 'Transformer attention as tracery: 24 tokens linked by three attention heads form the rose. The glass is an activation heatmap, and an optimizer descends the loss landscape into your portrait. Equations circle the rim.',
    Art: RoseWindowV4,
  },
  {
    key: 'v5',
    name: 'Cathedral of Code & Mind',
    theme: 'Faith · code · intelligence',
    file: 'src/components/RoseWindow-v5.astro',
    text: 'Everything together: stained-glass lancets and a gold cross, a neural network with forward-pass signals, attention arcs between git commits, code and math glyphs in the roundels, and “ad maiorem Dei gloriam” in the rotating ring.',
    Art: RoseWindowV5,
  },
  {
    key: 'v6',
    name: 'Circuit Rose',
    theme: 'Static · hardware & software',
    file: 'src/components/RoseWindow-v6.astro',
    text: 'The rose window as a printed circuit board. Your portrait is the chip; gold copper traces route outward through stained-glass sectors with 45° bends, ending in vias and pads. Silkscreen labels: U1, SJ-01, AMDG, rev 1.0.',
    Art: RoseWindowV6,
  },
  {
    key: 'v7',
    name: 'Quatrefoil of Tensors',
    theme: 'Static · ML math',
    file: 'src/components/RoseWindow-v7.astro',
    text: 'A gothic quatrefoil whose four lobes are weight matrices — Q, K, V and W — rendered as heatmap glass with the matrix grid as lead lines. Roundels between the lobes hold 3×3 convolution kernels (sobel, sharpen, laplace, blur).',
    Art: RoseWindowV7,
  },
  {
    key: 'v8',
    name: 'Mosaic of Bits',
    theme: 'Static · Byzantine · binary',
    file: 'src/components/RoseWindow-v8.astro',
    text: 'A Byzantine mosaic of tesserae in concentric rings that secretly encodes “AD MAIOREM DEI GLORIAM · LOVE · STRENGTH · RELATIONSHIP” in 8-bit ASCII — gold tiles are 1s, stained-glass tiles are 0s.',
    Art: RoseWindowV8,
  },
  {
    key: 'v9',
    name: 'Sunburst of Skills',
    theme: 'Static · data-driven',
    file: 'src/components/RoseWindow-v9.astro',
    text: 'A sunburst chart is a rose window: the inner ring is your technology categories and the outer ring every visible technology, drawn from technologies.json. Add a technology and the window redraws itself.',
    Art: RoseWindowV9,
  },
  {
    key: 'v10',
    name: 'Triptych',
    theme: 'Static · altarpiece',
    file: 'src/components/RoseWindow-v10.astro',
    text: 'Three gothic lancets like an altarpiece: CODE on the left (glass panes carrying lines of code), FAITH in the centre (your portrait in the oculus under a cross, diamond-quarry glass), and MIND on the right (a neural network cut into stained glass).',
    Art: RoseWindowV10,
  },
] as const;

export type HeroArtKey = (typeof heroArts)[number]['key'];

export function getHeroArt(key: string) {
  const art = heroArts.find((a) => a.key === key);
  if (!art) throw new Error(`Unknown heroArt "${key}" in site.json. Use one of: ${heroArts.map((a) => a.key).join(', ')}`);
  return art;
}
