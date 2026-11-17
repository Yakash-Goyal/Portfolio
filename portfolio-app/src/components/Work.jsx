import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { coverPlay } from '../lib/covers';
import { work } from '../data/content';
import Cover from './Cover';

/* Selected work: pinned showcase (Nocturne). Desktop: the list advances and covers wipe in
   as you scroll. Phones: simple stacked cards. */
export default function Work() {
  const ref = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      const root = ref.current;
      const slides = [...root.querySelectorAll('.slide')];
      const items = [...root.querySelectorAll('.work-list li')];
      const bars = items.map(li => li.querySelector('i'));
      const n = slides.length;
      const shut = 'inset(100% 0% 0% 0% round 24px)';
      const full = 'inset(0% 0% 0% 0% round 24px)';
      gsap.set(slides, { clipPath: shut });
      gsap.set(slides[0], { clipPath: full });
      gsap.set(bars[0], { scaleX: 1 });

      let current = -1;
      const setActive = i => {
        if (i === current) return;
        current = i;
        items.forEach((li, k) => li.classList.toggle('active', k === i));
        coverPlay(slides[i].querySelector('.cover'), 0.05);
      };
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.querySelector('.showcase'),
          start: 'top top',
          end: () => '+=' + window.innerHeight * (n - 1) * 0.9,
          pin: true, scrub: 0.8, anticipatePin: 1,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.7 }, delay: 0.1, ease: 'power2.inOut' },
          onUpdate: s => setActive(Math.round(s.progress * (n - 1))),
        },
      });
      for (let i = 1; i < n; i++) {
        tl.to(slides[i], { clipPath: full, duration: 1, ease: 'power2.inOut' }, i - 1)
          .to(slides[i - 1].querySelector('.cover'), { scale: 0.9, opacity: 0.35, duration: 1 }, i - 1)
          .to(slides[i - 1].querySelector('.slide-cap'), { y: 30, opacity: 0, duration: 0.5 }, i - 1)
          .from(slides[i].querySelector('.slide-cap'), { y: 40, opacity: 0, duration: 0.5 }, i - 0.5)
          .to(bars[i], { scaleX: 1, duration: 1 }, i - 1);
      }

      /* clicking a project name scrolls to it */
      const handlers = items.map((li, i) => {
        const h = () => {
          const st = tl.scrollTrigger;
          gsap.to(window, { scrollTo: st.start + (st.end - st.start) * (i / (n - 1)), duration: 1, ease: 'expo.inOut' });
        };
        li.addEventListener('click', h);
        return h;
      });
      return () => items.forEach((li, i) => li.removeEventListener('click', handlers[i]));
    });

    mm.add('(max-width: 900px)', () => {
      ref.current.querySelectorAll('.slide .cover').forEach(c =>
        ScrollTrigger.create({ trigger: c, start: 'top 85%', once: true, onEnter: () => coverPlay(c) }));
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className="sec panel night work" id="work" ref={ref}>
      <div className="showcase">
        <div className="wrap show-grid">
          <div className="show-left">
            <p className="label"><span>(02)</span> Selected work</p>
            <h2 className="h2">Things I've <em>built</em> lately</h2>
            <ol className="work-list">
              {work.map((w, i) => (
                <li key={w.title} className={i === 0 ? 'active' : undefined}>
                  <span className="n">0{i + 1}</span>
                  <span className="t">{w.title}</span>
                  <span className="c">{w.kind}</span>
                  <i />
                </li>
              ))}
            </ol>
          </div>
          <div className="stage" data-cursor="Scroll">
            {work.map((w, i) => (
              <article className="slide" key={w.title}>
                <Cover name={w.cover} pal={w.pal} />
                <div className="slide-cap">
                  <span>0{i + 1} — {w.year} · {w.kind}</span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                  <div className="tags">{w.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <div className="cap-links">
                    <a className="link" href={w.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>
                    {w.live && <a className="link" href={w.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
