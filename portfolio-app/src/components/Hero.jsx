import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { fine, motion } from '../lib/motion';
import { coverPlay } from '../lib/covers';
import { site, work } from '../data/content';
import Cover from './Cover';
import Clock from './Clock';

/* Hero: name flips in letter by letter, the grid lights up around the mouse (Nocturne),
   the role word scrambles between values, a spinning badge speeds up with scrolling (Panels)
   and project covers drift sideways (Atlas). */
export default function Hero({ ready }) {
  const ref = useRef(null);
  const chars = useRef([]);

  useGSAP(() => {
    const hero = ref.current;
    const split = SplitText.create('.hero-name .r1, .hero-name .name2', { type: 'chars', charsClass: 'char' });
    chars.current = split.chars;
    gsap.set(split.chars, { yPercent: 110, rotationX: -85, opacity: 0 });
    gsap.set(['.hero-meta > *', '.hero-role', '.hero-cta > *'], { y: 26, opacity: 0 });
    gsap.set('.badge', { scale: 0, rotation: -140 });
    gsap.set('.tile', { yPercent: 40, opacity: 0 });

    /* spotlight on the grid */
    const move = e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', e.clientX - r.left + 'px');
      hero.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    const leave = () => { hero.style.setProperty('--mx', '-500px'); hero.style.setProperty('--my', '-500px'); };
    if (fine) { hero.addEventListener('pointermove', move); hero.addEventListener('pointerleave', leave); }

    /* scroll-linked drift */
    const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.strip', { xPercent: -16, ease: 'none', scrollTrigger: st });
    gsap.utils.toArray('.tile', hero).forEach((t, i) => gsap.to(t, { y: i % 2 ? -70 : 40, ease: 'none', scrollTrigger: st }));
    gsap.to('.hero-name', { yPercent: -18, ease: 'none', scrollTrigger: st });

    /* badge spins faster while you scroll */
    const badge = hero.querySelector('.badge svg');
    let rot = 0;
    const spin = () => {
      rot += (0.25 + motion.boost * 0.8) * gsap.ticker.deltaRatio(60);
      badge.style.transform = `rotate(${rot}deg)`;
    };
    gsap.ticker.add(spin);

    return () => {
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      gsap.ticker.remove(spin);
    };
  }, { scope: ref });

  /* intro, once the loader is done */
  useGSAP(() => {
    if (!ready) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(chars.current, { yPercent: 0, rotationX: 0, opacity: 1, duration: 1.4, stagger: 0.045 })
      .to('.hero-meta > *', { y: 0, opacity: 1, duration: 1, stagger: 0.06 }, 0.15)
      .to('.badge', { scale: 1, rotation: 0, duration: 1.5, ease: 'back.out(1.5)' }, 0.5)
      .to(['.hero-role', '.hero-cta > *'], { y: 0, opacity: 1, duration: 1.1, stagger: 0.08 }, 0.55)
      .to('.tile', { yPercent: 0, opacity: 1, duration: 1.5, stagger: 0.08 }, 0.6)
      .add(() => ref.current.querySelectorAll('.tile .cover').forEach((c, i) => coverPlay(c, i * 0.08)), 0.7);

    const scr = ref.current.querySelector('.scr');
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % site.roles.length;
      gsap.to(scr, { duration: 1.1, scrambleText: { text: site.roles[i], chars: 'lowerCase', speed: 0.5, revealDelay: 0.25 } });
    }, 2800);
    return () => clearInterval(id);
  }, { scope: ref, dependencies: [ready] });

  const tiles = [...work, work[0]];
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="grid-bg" aria-hidden="true" />
      <div className="grid-hot" aria-hidden="true" />

      <div className="hero-meta wrap">
        <span><b>Portfolio</b> — {new Date().getFullYear()}</span>
        <span className="hide-sm">{site.role}</span>
        <span className="hide-sm">Based in {site.location}</span>
        <span>Local time <Clock /></span>
      </div>

      <h1 className="hero-name" aria-label={site.name}>
        <span className="row r1">{site.first}</span>
        <span className="row r2">
          <a className="badge" href="#contact" aria-label="Open to opportunities: get in touch" data-cursor="Hire">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="circ" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
              <circle cx="100" cy="100" r="98" className="badge-bg" />
              <text><textPath href="#circ" textLength="462" lengthAdjust="spacing">OPEN TO OPPORTUNITIES • FULL-STACK DEV • </textPath></text>
            </svg>
            <span className="badge-arrow">↘</span>
          </a>
          <span className="name2">{site.last}</span>
        </span>
      </h1>

      <div className="hero-foot wrap">
        <p className="hero-role">I build <span className="scr">{site.roles[0]}</span><br />with <em>creativity</em> + logic.</p>
        <div className="hero-cta">
          <a className="btn magnet" href="#work"><span>See my work</span></a>
          <a className="btn ghost magnet" href="#contact"><span>Get in touch</span></a>
        </div>
      </div>

      <div className="strip-wrap" aria-hidden="true">
        <div className="strip">
          {tiles.map((w, i) => <div className="tile" key={i}><Cover name={w.cover} pal={i === 4 ? 'violet' : w.pal} /></div>)}
        </div>
      </div>
    </section>
  );
}
