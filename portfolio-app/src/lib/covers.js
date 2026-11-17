/* Project cover mockups, drawn as SVG strings so they stay sharp and can be animated. */
import { gsap } from './gsap';

const r = (x, y, w, h, rx, f, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${extra}/>`;
const t = (x, y, s, f, txt, w = 700) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${f}" font-family="inherit" letter-spacing="-.03em">${txt}</text>`;
const wrap = (p, inner) => `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${r(0, 0, 800, 500, 0, p.bg)}${inner}</svg>`;
const phone = (x, y, rot, p, inner) => `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="c-pop">${r(0, 0, 210, 420, 36, p.ink)}${r(8, 8, 194, 404, 29, p.card)}${r(75, 17, 60, 14, 7, p.ink)}${inner}</g></g>`;
const browser = (x, y, w, h, p, inner) => `<g transform="translate(${x} ${y})"><g class="c-pop">${r(0, 0, w, h, 16, p.card)}<path d="M0 16a16 16 0 0 1 16-16h${w - 32}a16 16 0 0 1 16 16v20H0z" fill="${p.ink}"/><circle cx="20" cy="18" r="5" fill="${p.a}"/><circle cx="38" cy="18" r="5" fill="${p.b}"/><circle cx="56" cy="18" r="5" fill="${p.card}" opacity=".5"/>${r(w / 2 - 90, 9, 180, 18, 9, p.card, 'opacity=".18"')}${inner}</g></g>`;

export const covers = {
  /* weather app: two phones */
  aether: p => wrap(p,
    `<circle cx="640" cy="430" r="190" fill="${p.a}" opacity=".22"/><circle cx="120" cy="60" r="90" fill="${p.b}" opacity=".25"/>` +
    phone(455, 78, 8, p, [0, 1, 2, 3].map(i => r(22, 62 + i * 74, 166, 60, 16, p.bg) + `<circle class="c-dot" cx="52" cy="${92 + i * 74}" r="14" fill="${i % 2 ? p.b : p.a}"/>` + r(78, 80 + i * 74, 70, 8, 4, p.ink, 'opacity=".8"') + r(78, 96 + i * 74, 44, 6, 3, p.ink, 'opacity=".3"')).join('')) +
    phone(245, 36, -6, p,
      `<circle class="c-dot" cx="105" cy="104" r="40" fill="${p.a}"/>` + t(52, 224, 70, p.ink, '24°', 800) + r(54, 240, 96, 8, 4, p.ink, 'opacity=".35"') +
      [30, 50, 66, 46, 36, 24].map((h, i) => r(30 + i * 27, 338 - h, 16, h, 8, i === 2 ? p.a : p.b, 'class="c-bar"')).join('') + r(22, 352, 166, 40, 14, p.bg))),

  /* design system: a component sheet */
  monolith: p => wrap(p,
    Array.from({ length: 60 }, (_, i) => `<circle cx="${40 + (i % 12) * 66}" cy="${40 + Math.floor(i / 12) * 105}" r="2" fill="${p.ink}" opacity=".18"/>`).join('') +
    `<g class="c-pop">${t(54, 222, 190, p.ink, 'Aa', 800)}</g>` +
    [p.ink, p.a, p.b, p.card].map((c, i) => `<circle class="c-dot" cx="${82 + i * 62}" cy="300" r="26" fill="${c}" stroke="${p.ink}" stroke-width="${c === p.card ? 2 : 0}"/>`).join('') +
    `<g class="c-pop">${r(54, 356, 250, 14, 7, p.ink, 'opacity=".2"')}${r(54, 356, 150, 14, 7, p.a, 'class="c-bar"')}<circle cx="204" cy="363" r="15" fill="${p.card}" stroke="${p.ink}" stroke-width="3"/>${r(54, 400, 200, 10, 5, p.ink, 'opacity=".5"')}${r(54, 420, 130, 10, 5, p.ink, 'opacity=".25"')}</g>` +
    `<g class="c-pop">${r(400, 62, 176, 56, 28, p.ink)}${t(446, 98, 22, p.card, 'Button', 600)}${r(596, 62, 150, 56, 28, 'none', `stroke="${p.ink}" stroke-width="3"`)}${t(634, 98, 22, p.ink, 'Ghost', 600)}</g>` +
    `<g class="c-pop">${r(400, 146, 86, 46, 23, p.a)}<circle class="c-dot" cx="463" cy="169" r="17" fill="${p.card}"/>${r(506, 146, 86, 46, 23, p.ink, 'opacity=".2"')}<circle cx="529" cy="169" r="17" fill="${p.card}"/>${r(616, 148, 42, 42, 10, p.b)}<path d="M627 169l8 8 14-16" fill="none" stroke="${p.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>${r(676, 148, 42, 42, 10, 'none', `stroke="${p.ink}" stroke-width="3"`)}</g>` +
    `<g class="c-pop">${r(400, 220, 346, 56, 14, p.card, `stroke="${p.ink}" stroke-width="2"`)}${r(420, 243, 120, 10, 5, p.ink, 'opacity=".4"')}${r(548, 234, 3, 28, 1, p.a)}</g>` +
    `<g class="c-pop">${r(400, 304, 346, 140, 20, p.card)}<circle cx="446" cy="350" r="24" fill="${p.a}"/>${r(484, 334, 150, 12, 6, p.ink)}${r(484, 356, 90, 9, 4, p.ink, 'opacity=".35"')}${r(424, 396, 298, 9, 4, p.ink, 'opacity=".2"')}${r(424, 414, 210, 9, 4, p.ink, 'opacity=".2"')}</g>`),

  /* dashboard in a browser window */
  pulse: p => wrap(p,
    browser(70, 50, 660, 404, p,
      r(0, 36, 126, 368, 0, p.ink, 'opacity=".06"') + [0, 1, 2, 3, 4].map(i => r(18, 62 + i * 38, i ? 70 + (i % 2) * 18 : 90, 14, 7, i ? p.ink : p.a, i ? 'opacity=".25"' : '')).join('') +
      [0, 1, 2].map(i => r(148 + i * 166, 58, 150, 78, 14, p.bg) + r(164 + i * 166, 74, 60, 8, 4, p.ink, 'opacity=".4"') + t(164 + i * 166, 120, 30, p.ink, ['18.2k', '94%', '312'][i], 800)).join('') +
      r(148, 152, 316, 232, 14, p.bg) +
      `<path class="c-line" d="M168 330 C200 320 214 270 246 276 S296 330 326 290 S372 196 402 214 S436 236 446 190" fill="none" stroke="${p.a}" stroke-width="6" stroke-linecap="round"/>` +
      `<circle class="c-dot" cx="446" cy="190" r="9" fill="${p.card}" stroke="${p.a}" stroke-width="5"/>` +
      [168, 214, 260, 306, 352, 398, 444].map(x => r(x, 356, 2, 10, 1, p.ink, 'opacity=".3"')).join('') +
      r(480, 152, 150, 232, 14, p.bg) +
      [70, 120, 92, 150, 110].map((h, i) => r(496 + i * 24, 366 - h, 15, h, 7, i === 3 ? p.a : p.b, 'class="c-bar"')).join(''))),

  /* shop: product page in a browser window */
  driftwood: p => wrap(p,
    browser(70, 50, 660, 404, p,
      r(22, 58, 300, 324, 14, p.bg) +
      `<g class="c-dot" transform="translate(90 108)"><path d="M30 0h100a14 14 0 0 1 14 14v96H16V14A14 14 0 0 1 30 0z" fill="${p.a}"/>${r(0, 110, 160, 26, 10, p.ink)}${r(14, 136, 12, 78, 4, p.ink)}${r(134, 136, 12, 78, 4, p.ink)}</g>` +
      [0, 1, 2].map(i => r(346 + i * 62, 320, 52, 52, 10, i ? p.bg : p.b, i ? '' : `stroke="${p.ink}" stroke-width="2"`)).join('') +
      r(346, 70, 90, 10, 5, p.a) + r(346, 96, 250, 22, 8, p.ink) + r(346, 128, 180, 22, 8, p.ink) +
      r(346, 172, 270, 8, 4, p.ink, 'opacity=".3"') + r(346, 190, 240, 8, 4, p.ink, 'opacity=".3"') + r(346, 208, 200, 8, 4, p.ink, 'opacity=".3"') +
      t(346, 268, 34, p.ink, '$240', 800) + [p.a, p.b, p.ink].map((c, i) => `<circle cx="${470 + i * 34}" cy="257" r="12" fill="${c}"/>`).join('') +
      `<g class="c-pop">${r(538, 322, 100, 48, 24, p.ink)}${t(560, 353, 18, p.card, 'Add +', 600)}</g>`)),
};

/* Play the "build" animation of a cover (needs GSAP). Call when the cover scrolls into view or on hover. */
export function coverPlay(el, delay = 0) {
  if (!el) return;
  const q = sel => [...el.querySelectorAll(sel)];
  const pops = q('.c-pop'), bars = q('.c-bar'), dots = q('.c-dot');
  if (pops.length) gsap.fromTo(pops, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'expo.out', stagger: .07, delay, overwrite: true });
  if (bars.length) gsap.fromTo(bars, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .9, ease: 'back.out(1.6)', stagger: .05, delay: delay + .3, overwrite: true });
  if (dots.length) gsap.fromTo(dots, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .7, ease: 'back.out(2)', stagger: .05, delay: delay + .35, overwrite: true });
  q('.c-line').forEach(l => { const n = l.getTotalLength(); gsap.fromTo(l, { strokeDasharray: n, strokeDashoffset: n }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', delay: delay + .3, overwrite: true }); });
}

export const PAL = {
  cobalt: { bg: '#2b45ff', ink: '#141414', card: '#f1ede4', a: '#ff4f1f', b: '#4de3c2' },
  paper:  { bg: '#e6dfd1', ink: '#141414', card: '#ffffff', a: '#ff4f1f', b: '#8f7bff' },
  mint:   { bg: '#4de3c2', ink: '#141414', card: '#f7f5f0', a: '#2b45ff', b: '#8f7bff' },
  sand:   { bg: '#e7d3bb', ink: '#1d1a16', card: '#fbf7f1', a: '#ff4f1f', b: '#0f3d2b' },
  violet: { bg: '#8f7bff', ink: '#141414', card: '#f4f1ff', a: '#ff4f1f', b: '#4de3c2' },
};
