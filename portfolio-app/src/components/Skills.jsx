import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import useAccordion from '../lib/useAccordion';
import { skills } from '../data/content';

/* line icons, drawn on scroll with DrawSVG */
const icons = {
  screen: <><rect className="d" x="6" y="8" width="36" height="28" rx="4" /><path className="d" d="M6 15h36M16 44h16M24 36v8" /></>,
  spark: <><path className="d" d="M24 5l4 13 13 4-13 4-4 13-4-13-13-4 13-4z" /><path className="d" d="M39 33l1.5 4.5L45 39l-4.5 1.5L39 45l-1.5-4.5L33 39l4.5-1.5z" /></>,
  wave: <><path className="d" d="M6 34c8 0 8-20 18-20s10 20 18 20" /><circle className="d" cx="24" cy="14" r="4" /><path className="d" d="M6 42h36" /></>,
  chart: <><path className="d" d="M6 42h36M12 42V28M21 42V18M30 42V24M39 42V10" /><path className="d" d="M10 20l10-8 9 6 12-10" /></>,
};

/* What I do: coloured panel (Panels) + accordion with self-drawing icons (Atlas) */
export default function Skills() {
  const ref = useRef(null);
  useAccordion(ref, { firstOpen: true });
  useGSAP(() => {
    gsap.from('.ico .d', { drawSVG: '0%', duration: 1.4, stagger: 0.06, ease: 'power2.inOut', scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
  }, { scope: ref });

  return (
    <section className="sec panel cobalt services" id="skills">
      <div className="wrap svc-grid">
        <div className="sec-head sticky-head">
          <p className="label"><span>(04)</span> What I do</p>
          <h2 className="h2 split">How I can <em>help</em></h2>
          <p className="muted reveal">From the database to the last animation: these are the kinds of things I build, with the tools I use for each.</p>
        </div>
        <div className="svc acc" ref={ref}>
          {skills.map((s, i) => (
            <div className="svc-item acc-item" key={s.title}>
              <button className="acc-head">
                <span className="n">0{i + 1}</span>
                <svg className="ico" viewBox="0 0 48 48" aria-hidden="true">{icons[s.icon]}</svg>
                <span className="t">{s.title}</span>
                <span className="plus" />
              </button>
              <div className="acc-body">
                <div className="acc-inner">
                  <p>{s.text}</p>
                  <div className="tags">{s.tags.map(t => <span key={t}>{t}</span>)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
