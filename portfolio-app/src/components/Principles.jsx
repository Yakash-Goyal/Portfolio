import { useRef, useState } from 'react';
import { gsap, Draggable, useGSAP } from '../lib/gsap';
import { principles } from '../data/content';

/* Principles: a stack of cards you drag or throw away (Panels). Quotes come from my project READMEs. */
export default function Principles() {
  const ref = useRef(null);
  const api = useRef({});
  const [shown, setShown] = useState(1);

  useGSAP(() => {
    let cards = gsap.utils.toArray('.q-card');
    let busy = false;
    let drags = [];
    const layout = () => {
      cards.forEach((c, i) => {
        gsap.set(c, { zIndex: cards.length - i });
        gsap.to(c, { x: 0, y: i * 16, scale: 1 - i * 0.05, rotation: i ? (i % 2 ? 3 : -3) : 0, opacity: i > 2 ? 0 : 1, duration: 0.8, ease: 'expo.out', transformOrigin: '50% 100%' });
      });
      setShown(+cards[0].dataset.i);
      drags.forEach(d => d.enabled(d.target === cards[0]));
    };
    const next = (side = 1) => {
      if (busy) return;
      busy = true;
      const top = cards[0];
      gsap.to(top, {
        x: side * Math.max(window.innerWidth * 0.6, 500), y: '-=40', rotation: side * 22, opacity: 0, duration: 0.55, ease: 'power2.in',
        onComplete: () => { cards.push(cards.shift()); gsap.set(top, { x: 0, y: 48 }); layout(); busy = false; },
      });
    };
    const prev = () => {
      if (busy) return;
      busy = true;
      cards.unshift(cards.pop());
      gsap.set(cards[0], { zIndex: cards.length + 1, x: -Math.max(window.innerWidth * 0.6, 500), rotation: -22, opacity: 0 });
      layout();
      gsap.delayedCall(0.5, () => { busy = false; });
    };
    drags = Draggable.create(cards, {
      type: 'x,y', zIndexBoost: false,
      onDrag() { gsap.set(this.target, { rotation: this.x / 18 }); },
      onRelease() { if (Math.abs(this.x) > 130) next(Math.sign(this.x)); else layout(); },
    });
    layout();
    api.current = { next, prev };
    gsap.from('.stack', { y: 120, opacity: 0, rotation: 6, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.stack', start: 'top 85%' } });
    return () => drags.forEach(d => d.kill());
  }, { scope: ref });

  return (
    <section className="sec panel accent testimonials" id="principles" ref={ref}>
      <div className="wrap t-grid">
        <div className="sec-head">
          <p className="label"><span>(07)</span> How I build</p>
          <h2 className="h2 split">Rules I <em>keep</em></h2>
          <p className="reveal">Straight from my project READMEs. Drag a card away to read the next one.</p>
          <div className="t-ctrl reveal">
            <button className="round" onClick={() => api.current.prev()} aria-label="Previous">←</button>
            <span className="t-count"><b>{shown}</b> / {principles.length}</span>
            <button className="round" onClick={() => api.current.next(1)} aria-label="Next">→</button>
          </div>
        </div>
        <div className="stack" data-cursor="Drag">
          {principles.map((p, i) => (
            <figure className="q-card" key={p.from} data-i={i + 1}>
              <blockquote>“{p.quote}”</blockquote>
              <figcaption><span className="pic">{p.short}</span><span><b>{p.from}</b>Rule 0{i + 1}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
