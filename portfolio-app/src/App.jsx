import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from './lib/gsap';
import { fine, motion, reduced, scrollToTarget } from './lib/motion';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Bands from './components/Bands';
import About from './components/About';
import Work from './components/Work';
import Archive from './components/Archive';
import Skills from './components/Skills';
import Process from './components/Process';
import Journey from './components/Journey';
import Principles from './components/Principles';
import Statement from './components/Statement';
import GitHubFeed from './components/GitHubFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const root = useRef(null);
  const [ready, setReady] = useState(reduced);

  /* Site-wide effects. Child components set up their own effects first,
     then this runs, so the final refresh measures everything (including pins). */
  useGSAP(() => {
    const nav = document.getElementById('nav');

    /* scroll speed + direction (drives the marquee and badge), nav hides while scrolling down */
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: s => {
        motion.vel = s.getVelocity();
        motion.dir = s.direction;
        if (!document.body.classList.contains('menu-open')) nav.classList.toggle('hide', s.direction === 1 && s.scroll() > 320);
      },
    });
    const decay = () => { motion.vel *= 0.9; motion.boost = Math.min(Math.abs(motion.vel) / 300, 9); };
    gsap.ticker.add(decay);
    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    /* domed panels flatten as they arrive (Panels) */
    gsap.utils.toArray('.panel').forEach(p => gsap.fromTo(p,
      { '--r': () => (window.innerWidth < 900 ? '7vh' : '16vh') },
      {
        '--r': '0vh', ease: 'none', immediateRender: true,
        scrollTrigger: { trigger: p, start: 'top bottom', end: p.classList.contains('foot') ? 'bottom bottom' : 'top 25%', scrub: true, invalidateOnRefresh: true },
      }));

    /* masked line reveals + highlighter sweeps (Atlas + Nocturne) */
    gsap.utils.toArray('.split').forEach(el => SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'line', autoSplit: true,
      onSplit(self) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%' } });
        tl.from(self.lines, { yPercent: 110, duration: 1.15, stagger: 0.08, ease: 'expo.out' });
        const hl = el.querySelectorAll('.hl');
        if (hl.length) tl.to(hl, { backgroundSize: '100% 36%', duration: 1, stagger: 0.25, ease: 'power3.inOut' }, '-=.5');
        return tl;
      },
    }));

    gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 44, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

    [['.rows', '.row-item'], ['.svc', '.svc-item'], ['.jobs', 'li'], ['.proc', '.step'], ['.awards ul', 'li']].forEach(([wrap, kids]) => {
      const w = document.querySelector(wrap);
      if (w) gsap.from(w.querySelectorAll(kids), { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: w, start: 'top 86%' } });
    });

    /* counters */
    gsap.utils.toArray('[data-count]').forEach(el => {
      const o = { v: 0 };
      gsap.to(o, { v: +el.dataset.count, duration: 2.2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v); }, scrollTrigger: { trigger: el, start: 'top 92%' } });
    });

    /* magnetic buttons + 3D tilt */
    const off = [];
    const on = (el, type, fn) => { el.addEventListener(type, fn); off.push(() => el.removeEventListener(type, fn)); };
    if (fine) {
      gsap.utils.toArray('.magnet').forEach(el => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1,.45)' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1,.45)' });
        on(el, 'pointermove', e => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.3);
          yTo((e.clientY - r.top - r.height / 2) * 0.3);
        });
        on(el, 'pointerleave', () => { xTo(0); yTo(0); });
      });
      gsap.utils.toArray('[data-tilt]').forEach(el => {
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3' });
        const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3' });
        on(el, 'pointermove', e => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        });
        on(el, 'pointerleave', () => { rx(0); ry(0); });
      });
    }
    gsap.timeline({ repeat: -1, repeatDelay: 3.2 }).to('.av-eye', { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1 });

    /* smooth scrolling for in-page links */
    on(document, 'click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.closest('.menu')) return;
      e.preventDefault();
      const id = a.getAttribute('href');
      if (id !== '#') scrollToTarget(id);
    });

    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => { off.forEach(f => f()); gsap.ticker.remove(decay); };
  }, { scope: root });

  return (
    <div ref={root}>
      {!reduced && <Loader onDone={() => setReady(true)} />}
      <Cursor />
      <div className="progress" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Bands />
        <About />
        <Work />
        <Archive />
        <Skills />
        <Process />
        <Journey />
        <Principles />
        <Statement />
        <GitHubFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

