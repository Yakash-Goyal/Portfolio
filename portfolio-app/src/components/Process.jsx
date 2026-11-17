import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { process } from '../data/content';

/* Process: a line fills as you scroll and each step lights up (Nocturne) */
export default function Process() {
  const ref = useRef(null);
  useGSAP(() => {
    const proc = ref.current;
    const steps = [...proc.querySelectorAll('.step')];
    gsap.fromTo(proc, { '--p': 0 }, {
      '--p': 1, ease: 'none',
      scrollTrigger: {
        trigger: proc, start: 'top 72%', end: 'bottom 60%', scrub: 0.5,
        onUpdate: s => steps.forEach((st, i) => st.classList.toggle('on', s.progress > i / steps.length + 0.005)),
      },
    });
  }, { scope: ref });

  return (
    <section className="sec panel paper process" id="process">
      <div className="wrap">
        <div className="sec-head">
          <p className="label"><span>(05)</span> How I work</p>
          <h2 className="h2 split">Four steps, <em>no surprises</em></h2>
        </div>
        <div className="proc" ref={ref}>
          <div className="proc-line"><i /></div>
          {process.map(p => (
            <div className="step" key={p.title}>
              <span className="dot" />
              <span className="n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
