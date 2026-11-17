import { Fragment } from 'react';
import { about, site } from '../data/content';

/* turns "text [[highlighted]] text" into spans with the highlighter class */
const withHighlights = text => text.split(/(\[\[.*?\]\])/).map((part, i) =>
  part.startsWith('[[')
    ? <span className="hl" key={i}>{part.slice(2, -2)}</span>
    : <Fragment key={i}>{part}</Fragment>);

/* About (Atlas line reveal + Nocturne highlights + Folio profile card).
   The reveal animations are set up in App.jsx (classes: split, reveal, data-count). */
export default function About() {
  return (
    <section className="sec about" id="about">
      <div className="wrap about-grid">
        <div className="about-main">
          <p className="label"><span>(01)</span> About me</p>
          <p className="big split">{withHighlights(about.intro)}</p>
          <div className="about-cols">
            {about.more.map((p, i) => <p className="reveal" key={i}>{p}</p>)}
          </div>
        </div>

        <aside className="profile reveal" data-tilt>
          <div className="avatar">
            <div className="ring" />
            <div className="face">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="60" className="av-bg" />
                <path className="av-hair" d="M30 58c0-22 13-34 31-34s30 11 30 31c-6-8-16-12-27-12-14 0-25 6-34 15z" />
                <ellipse cx="60" cy="62" rx="24" ry="27" className="av-skin" />
                <path className="av-body" d="M22 120c3-22 19-32 38-32s35 10 38 32z" />
                <circle cx="51" cy="63" r="2.6" className="av-eye" />
                <circle cx="69" cy="63" r="2.6" className="av-eye" />
                <path d="M53 75q7 5 14 0" className="av-smile" />
              </svg>
            </div>
          </div>
          <h3>{site.name}</h3>
          <p className="muted">{site.role} &amp; CS student</p>
          <span className="status"><i />{site.status}</span>
          <ul className="facts">
            {about.facts.map(f => <li key={f.k}><span>{f.k}</span><b>{f.v}</b></li>)}
          </ul>
          <a className="btn small magnet" href={site.github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub">
            <span>View my GitHub ↗</span>
          </a>
        </aside>
      </div>

      <div className="wrap stats">
        {about.stats.map(s => (
          <div className="stat" key={s.label}><b data-count={s.n}>0</b><span>{s.label}</span></div>
        ))}
      </div>
    </section>
  );
}
