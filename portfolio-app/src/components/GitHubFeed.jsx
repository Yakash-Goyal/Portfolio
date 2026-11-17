import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { repoFallback, repoNotes, site } from '../data/content';

const month = d => new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

/* Latest on GitHub: loads my most recently updated public repos live from the GitHub API
   (falls back to a saved list if GitHub can't be reached). Arrow hover from Folio. */
export default function GitHubFeed() {
  const [repos, setRepos] = useState(repoFallback);
  const listRef = useRef(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://api.github.com/users/${site.githubUser}/repos?sort=pushed&per_page=30`)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(list => {
        if (!alive || !Array.isArray(list)) return;
        const mine = list.filter(r => !r.fork && r.name.toLowerCase() !== site.githubUser.toLowerCase()).slice(0, 5);
        if (mine.length) setRepos(mine);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  /* reveal the rows whenever the list changes */
  useEffect(() => {
    const rows = listRef.current.querySelectorAll('li');
    const tween = gsap.from(rows, { y: 50, opacity: 0, duration: 1.1, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: listRef.current, start: 'top 86%' } });
    ScrollTrigger.refresh();
    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.revert(); };
  }, [repos]);

  return (
    <section className="sec panel paper writing" id="github">
      <div className="wrap">
        <div className="sec-head row-head">
          <div>
            <p className="label"><span>(09)</span> Latest on GitHub</p>
            <h2 className="h2 split">Fresh from the <em>commit log</em></h2>
          </div>
          <a className="link" href={site.github} target="_blank" rel="noopener noreferrer">All repositories ↗</a>
        </div>
        <ul className="posts" ref={listRef}>
          {repos.map(r => (
            <li key={r.name}>
              <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                <span className="d">{month(r.pushed_at)}</span>
                <span className="t">{r.name}<small>{r.description || repoNotes[r.name] || ''}</small></span>
                <span className="m">{r.language || 'Code'}</span>
                <span className="arr"><i>↗</i><i>↗</i></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
