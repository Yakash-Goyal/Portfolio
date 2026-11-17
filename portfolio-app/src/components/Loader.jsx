import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { site } from '../data/content';

/* counter preloader (Atlas): counts to 100, then slides away and starts the hero intro */
export default function Loader({ onDone }) {
  const ref = useRef(null);
  const countRef = useRef(null);
  const [gone, setGone] = useState(false);

  useGSAP(() => {
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    const c = { v: 0 };
    gsap.timeline()
      .to(c, { v: 100, duration: 1.9, ease: 'power2.inOut', onUpdate: () => { countRef.current.textContent = Math.round(c.v); } })
      .to('.loader-bar i', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
      .to('.loader > *', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in', stagger: 0.04 }, '+=.1')
      .to(ref.current, {
        yPercent: -100, duration: 1.1, ease: 'expo.inOut',
        onComplete: () => { html.style.overflow = ''; setGone(true); ScrollTrigger.refresh(); },
      }, '-=.2')
      .add(() => onDone(), '-=.6');
  }, { scope: ref });

  if (gone) return null;
  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader-top"><span>{site.name}</span><span>Portfolio ©{new Date().getFullYear()}</span></div>
      <div className="loader-bar"><i /></div>
      <div className="loader-count"><span ref={countRef}>0</span><small>%</small></div>
    </div>
  );
}
