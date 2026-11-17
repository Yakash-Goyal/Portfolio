import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { coverPlay } from './covers';

let refreshTimer;
const softRefresh = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
};

/* Wires up an accordion inside `ref`: .acc-item > .acc-head (button) + .acc-body.
   Opening animates the height, plays any cover inside, and draws any .ico .d strokes. */
export default function useAccordion(ref, { firstOpen = false } = {}) {
  useGSAP(() => {
    const items = [...ref.current.querySelectorAll('.acc-item')];
    const toggle = (it, on) => {
      it.classList.toggle('open', on);
      it.querySelector('.acc-head').setAttribute('aria-expanded', on);
      gsap.to(it.querySelector('.acc-body'), { height: on ? 'auto' : 0, duration: 0.75, ease: 'expo.inOut', onComplete: softRefresh });
      if (!on) return;
      const cover = it.querySelector('.cover');
      if (cover) coverPlay(cover, 0.2);
      const strokes = it.querySelectorAll('.ico .d');
      if (strokes.length) gsap.fromTo(strokes, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1, stagger: 0.1, ease: 'power2.inOut' });
      gsap.from(it.querySelectorAll('.acc-inner > *, .acc-inner > div > *'), { y: 20, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'expo.out', delay: 0.15 });
    };
    const handlers = items.map(it => {
      const head = it.querySelector('.acc-head');
      head.setAttribute('aria-expanded', 'false');
      const h = () => {
        const on = !it.classList.contains('open');
        items.forEach(o => o !== it && o.classList.contains('open') && toggle(o, false));
        toggle(it, on);
      };
      head.addEventListener('click', h);
      return [head, h];
    });
    if (firstOpen && items[0]) {
      items[0].classList.add('open');
      items[0].querySelector('.acc-head').setAttribute('aria-expanded', 'true');
      gsap.set(items[0].querySelector('.acc-body'), { height: 'auto' });
    }
    return () => handlers.forEach(([head, h]) => head.removeEventListener('click', h));
  }, { scope: ref });
}
