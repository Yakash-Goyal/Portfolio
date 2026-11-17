import { useRef } from 'react';
import useAccordion from '../lib/useAccordion';
import { archive } from '../data/content';
import Cover from './Cover';

/* More projects: rows that open like an accordion (Atlas) */
export default function Archive() {
  const ref = useRef(null);
  useAccordion(ref);

  return (
    <section className="sec panel paper archive" id="archive">
      <div className="wrap">
        <div className="sec-head">
          <p className="label"><span>(03)</span> More projects</p>
          <h2 className="h2 split">Smaller builds and <em>experiments</em></h2>
        </div>
        <div className="rows acc" ref={ref}>
          {archive.map(p => (
            <div className="row-item acc-item" key={p.title}>
              <button className="acc-head" data-cursor="Open">
                <span className="y">{p.year}</span>
                <span className="t">{p.title}</span>
                <span className="c">{p.kind}</span>
                <span className="plus" />
              </button>
              <div className="acc-body">
                <div className="acc-inner row-open">
                  <Cover name={p.cover} pal={p.pal} />
                  <div>
                    <p>{p.text}</p>
                    <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <div className="cap-links">
                      <a className="link" href={p.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>
                      {p.live && <a className="link" href={p.live} target="_blank" rel="noopener noreferrer">Live site ↗</a>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
