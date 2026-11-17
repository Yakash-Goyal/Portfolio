import { useRef } from 'react';
import { gsap, Draggable, useGSAP } from '../lib/gsap';
import { journey, now, tools } from '../data/content';

/* Journey: hover-fill rows (Nocturne), a toolbox of throwable chips, and a "currently" card */
export default function Journey() {
  const ref = useRef(null);

  useGSAP(() => {
    const chips = gsap.utils.toArray('.chip');
    let z = 1;
    const drags = Draggable.create(chips, {
      bounds: ref.current.querySelector('.toybox'), inertia: true, edgeResistance: 0.75,
      onPress() { this.target.style.zIndex = ++z; gsap.to(this.target, { scale: 1.1, rotation: gsap.utils.random(-10, 10), duration: 0.25 }); },
      onRelease() { gsap.to(this.target, { scale: 1, duration: 0.5, ease: 'back.out(3)' }); },
    });
    gsap.from(chips, { scale: 0, opacity: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(2)', scrollTrigger: { trigger: '.toybox', start: 'top 85%' } });
    return () => drags.forEach(d => d.kill());
  }, { scope: ref });

  const tidy = () => gsap.to(ref.current.querySelectorAll('.chip'), { x: 0, y: 0, rotation: 0, duration: 1, stagger: 0.02, ease: 'elastic.out(1,.6)' });

  return (
    <section className="sec panel night experience" id="journey" ref={ref}>
      <div className="wrap">
        <div className="sec-head">
          <p className="label"><span>(06)</span> Journey</p>
          <h2 className="h2 split">Where I've <em>been</em></h2>
        </div>
        <ul className="jobs">
          {journey.map(j => (
            <li key={j.when}><span className="y">{j.when}</span><span className="r">{j.what}</span><span className="co">{j.where}</span><span className="l">{j.tag}</span></li>
          ))}
        </ul>

        <div className="tool-grid">
          <div className="tool-card">
            <div className="tool-head"><h3>Toolbox</h3><button className="link reset" onClick={tidy}>Tidy up ↺</button></div>
            <p className="muted">The languages and tools I use most. Go ahead, throw them around.</p>
            <div className="toybox" data-cursor="Drag">
              {tools.map(t => <span key={t.t} className={'chip' + (t.c ? ' ' + t.c : '')}>{t.t}</span>)}
            </div>
          </div>
          <div className="tool-card awards">
            <h3>Right now</h3>
            <ul>
              {now.map(n => <li key={n.k}><span>{n.k}</span><b>{n.v}</b><em>{n.e}</em></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
