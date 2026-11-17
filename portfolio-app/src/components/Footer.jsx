import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { fine, hop } from '../lib/motion';
import { site } from '../data/content';
import Clock from './Clock';

/* Footer: the name sized to fill the full width, letters hop on hover (Atlas) */
export default function Footer() {
  const ref = useRef(null);

  useGSAP(() => {
    const giant = ref.current.querySelector('.giant');
    const fit = () => {
      giant.style.fontSize = '';
      giant.style.width = 'max-content';
      const fs = parseFloat(getComputedStyle(giant).fontSize);
      const w = giant.parentElement.clientWidth;
      giant.style.fontSize = (fs * w / giant.offsetWidth) * 0.995 + 'px';
      giant.style.width = '';
    };
    fit();
    const split = SplitText.create(giant, { type: 'words,chars', charsClass: 'char' });
    gsap.from(split.chars, { yPercent: 100, duration: 1.2, stagger: 0.035, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
    const handlers = fine ? split.chars.map(ch => { const h = () => hop(ch); ch.addEventListener('pointerenter', h); return [ch, h]; }) : [];
    let w = window.innerWidth;
    const onResize = () => { if (window.innerWidth !== w) { w = window.innerWidth; fit(); } };
    window.addEventListener('resize', onResize);
    if (document.fonts) document.fonts.ready.then(fit);
    return () => {
      window.removeEventListener('resize', onResize);
      handlers.forEach(([ch, h]) => ch.removeEventListener('pointerenter', h));
    };
  }, { scope: ref });

  const toTop = () => gsap.to(window, { scrollTo: 0, duration: 1.8, ease: 'expo.inOut' });

  return (
    <footer className="panel night foot" ref={ref}>
      <div className="wrap">
        <div className="foot-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.location.split(',')[0]} · <Clock /></span>
          <button className="link totop" onClick={toTop}>Back to top ↑</button>
        </div>
        <div className="giant" aria-hidden="true">{site.name}</div>
      </div>
    </footer>
  );
}
