import { Fragment, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { motion, reduced } from '../lib/motion';
import { bands } from '../data/content';

/* two crossing marquee bands (Nocturne); speed and direction follow your scrolling */
const Track = ({ items, mark }) => (
  <div className="track">
    {[0, 1].map(k => (
      <Fragment key={k}>
        {items.map(t => <Fragment key={t}><span>{t}</span><b>{mark}</b></Fragment>)}
      </Fragment>
    ))}
  </div>
);

export default function Bands() {
  const ref = useRef(null);

  useGSAP(() => {
    if (reduced) return;
    const tracks = [...ref.current.querySelectorAll('.track')].map((el, i) => ({ el, x: 0, w: 1, side: i ? -1 : 1 }));
    const measure = () => tracks.forEach(t => (t.w = t.el.scrollWidth / 2));
    measure();
    const loop = () => {
      const dr = gsap.ticker.deltaRatio(60);
      tracks.forEach(t => {
        t.x -= (1.1 + motion.boost) * t.side * motion.dir * dr;
        t.x = gsap.utils.wrap(-t.w, 0, t.x);
        t.el.style.transform = `translateX(${t.x}px)`;
      });
    };
    gsap.ticker.add(loop);
    window.addEventListener('resize', measure);
    if (document.fonts) document.fonts.ready.then(measure);
    return () => {
      gsap.ticker.remove(loop);
      window.removeEventListener('resize', measure);
    };
  }, { scope: ref });

  return (
    <div className="bands" ref={ref} aria-hidden="true">
      <div className="band b1"><Track items={bands.top} mark="✺" /></div>
      <div className="band b2"><Track items={bands.bottom} mark="●" /></div>
    </div>
  );
}
