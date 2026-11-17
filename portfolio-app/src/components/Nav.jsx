import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { reduced, scrollToTarget } from '../lib/motion';
import { nav, site } from '../data/content';

/* Floating pill nav (Nocturne) with a sliding indicator for the section in view (Folio),
   a light/dark switch with a circular reveal, and a full-screen menu on phones. */
export default function Nav() {
  const ref = useRef(null);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);
  const [open, setOpen] = useState(false);

  /* active-section indicator */
  useGSAP(() => {
    const ind = ref.current.querySelector('.nav-ind');
    const links = [...ref.current.querySelectorAll('.nav-links a')];
    const moveInd = a => {
      links.forEach(l => l.classList.toggle('active', l === a));
      if (!a) return gsap.to(ind, { opacity: 0, duration: 0.3 });
      gsap.to(ind, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: 0.6, ease: 'expo.out' });
    };
    let last = null;
    document.querySelectorAll('main > section').forEach(sec => {
      const own = sec.id && links.find(l => l.getAttribute('href') === '#' + sec.id);
      if (own) last = own;
      if (sec.id === 'top') last = null;
      const link = last;
      ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 55%', onToggle: s => s.isActive && moveInd(link) });
    });
  }, { scope: ref });

  /* phone menu: circular reveal from the burger button */
  const setMenu = next => {
    setOpen(next);
    document.body.classList.toggle('menu-open', next);
    const menu = menuRef.current;
    const r = burgerRef.current.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(x, window.innerHeight - y) + 40;
    gsap.killTweensOf(menu);
    if (next) {
      ref.current.classList.remove('hide');
      gsap.set(menu, { visibility: 'visible' });
      gsap.fromTo(menu, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${end}px at ${x}px ${y}px)`, duration: 0.8, ease: 'expo.inOut' });
      gsap.fromTo(menu.querySelectorAll('nav a, .menu-foot'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.05, ease: 'expo.out', delay: 0.3 });
    } else {
      gsap.to(menu, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.6, ease: 'expo.inOut', onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
    }
  };

  /* theme switch (Folio): the new theme spreads out in a circle from the button */
  const toggleTheme = e => {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    const flip = () => {
      root.classList.toggle('dark');
      const dark = root.classList.contains('dark');
      meta && meta.setAttribute('content', dark ? '#0e0e10' : '#f1ede4');
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (err) { /* private mode */ }
    };
    if (!document.startViewTransition || reduced) return flip();
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.startViewTransition(flip).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 800, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  };

  const go = id => e => { e.preventDefault(); setMenu(false); scrollToTarget('#' + id); };

  return (
    <>
      <header className="nav" id="nav" ref={ref}>
        <a className="logo magnet" href="#top" aria-label="Back to top"><span>{site.initial}</span><i /></a>
        <nav className="nav-links" aria-label="Main">
          <span className="nav-ind" aria-hidden="true" />
          {nav.map(n => <a key={n.id} href={'#' + n.id}>{n.label}</a>)}
        </nav>
        <div className="nav-right">
          <button className="theme" onClick={toggleTheme} aria-label="Switch light or dark theme"><span className="sun" /></button>
          <a className="nav-cta magnet" href="#contact">Let's talk</a>
          <button className="burger" ref={burgerRef} onClick={() => setMenu(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><i /><i /></button>
        </div>
      </header>

      <div className="menu" ref={menuRef} aria-hidden={!open}>
        <nav>
          {nav.map(n => <a key={n.id} href={'#' + n.id} onClick={go(n.id)}><small>{n.n}</small>{n.label}</a>)}
        </nav>
        <p className="menu-foot"><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a> &nbsp; <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></p>
      </div>
    </>
  );
}
