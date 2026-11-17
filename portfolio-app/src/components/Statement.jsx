import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { statement } from '../data/content';

/* Statement: words light up as you scroll (Atlas), then a signature draws itself */
export default function Statement() {
  const ref = useRef(null);
  useGSAP(() => {
    SplitText.create('.statement', {
      type: 'words', autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(self.words, { opacity: 0.14 }, {
          opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: '.statement', start: 'top 78%', end: 'bottom 45%', scrub: true },
        });
      },
    });
    gsap.fromTo('.sign path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.4, ease: 'power2.inOut', scrollTrigger: { trigger: '.sign', start: 'top 92%' } });
  }, { scope: ref });

  return (
    <section className="sec panel night quote" ref={ref}>
      <div className="wrap">
        <p className="label"><span>(08)</span> What I believe</p>
        <p className="statement">{statement}</p>
        <svg className="sign" viewBox="0 0 320 90" aria-hidden="true">
          <path d="M8 62c14-30 28-48 34-44s-14 52-6 50 22-40 30-38-6 30 2 30 14-22 20-22-2 20 6 20 16-26 24-28 2 26 10 26 20-34 30-34-12 40-2 38 30-30 44-28 26 18 40 14 30-10 54-14" />
        </svg>
      </div>
    </section>
  );
}
