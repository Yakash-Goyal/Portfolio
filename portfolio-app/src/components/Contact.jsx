import { useRef, useState } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { fine, hop } from '../lib/motion';
import { contact, site } from '../data/content';

/* Contact (Panels mad-libs + Atlas hopping letters).
   With site.email set, "Send" opens an email. Without it, the message is copied and LinkedIn opens. */
export default function Contact() {
  const ref = useRef(null);
  const form = useRef(null);
  const [topic, setTopic] = useState(contact.topics[0]);
  const [note, setNote] = useState(site.email ? 'Opens your email app with the message filled in.' : 'Copies your message and opens my LinkedIn, so you can paste it.');
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    const split = SplitText.create('.hop-title', { type: 'chars,words', charsClass: 'char' });
    gsap.from(split.chars, { yPercent: 100, opacity: 0, duration: 1, stagger: 0.025, ease: 'expo.out', scrollTrigger: { trigger: '.hop-title', start: 'top 82%' } });
    const handlers = fine ? split.chars.map(ch => { const h = () => hop(ch); ch.addEventListener('pointerenter', h); return [ch, h]; }) : [];
    /* inputs grow with their text */
    const inputs = [...form.current.querySelectorAll('input')];
    const fit = inp => { inp.style.width = Math.max(inp.placeholder.length, inp.value.length) * 0.62 + 0.6 + 'em'; };
    inputs.forEach(fit);
    const onInput = e => { fit(e.target); e.target.classList.remove('bad'); };
    inputs.forEach(i => i.addEventListener('input', onInput));
    return () => {
      handlers.forEach(([ch, h]) => ch.removeEventListener('pointerenter', h));
      inputs.forEach(i => i.removeEventListener('input', onInput));
    };
  }, { scope: ref });

  const pick = (t, e) => {
    setTopic(t);
    gsap.fromTo(e.currentTarget, { scale: 0.88 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' });
  };

  const send = async e => {
    e.preventDefault();
    const f = form.current;
    const name = f.name.value.trim(), company = f.company.value.trim(), email = f.email.value.trim();
    const bad = [];
    if (!name) bad.push(f.name);
    if (!/^\S+@\S+\.\S+$/.test(email)) bad.push(f.email);
    if (bad.length) {
      bad.forEach(i => i.classList.add('bad'));
      gsap.fromTo(bad, { x: -8 }, { x: 0, duration: 0.6, ease: 'elastic.out(1,.3)' });
      bad[0].focus();
      setNote('Just add your name and a valid email first.');
      return;
    }
    const message = `Hi ${site.first},\n\nI'm ${name}${company ? ' from ' + company : ''} and I'd like to talk about ${topic}.\n\nYou can reach me at ${email}.`;
    if (site.email) {
      setNote('Opening your email app…');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Hello from ${name}: ${topic}`)}&body=${encodeURIComponent(message)}`;
      return;
    }
    try { await navigator.clipboard.writeText(message); setNote('Message copied. Paste it into a LinkedIn message.'); }
    catch (err) { setNote('Opening LinkedIn. Send me a message there.'); }
    window.open(site.linkedin, '_blank', 'noopener');
  };

  const copyEmail = async e => {
    try { await navigator.clipboard.writeText(site.email); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch (err) { /* ignore */ }
    gsap.fromTo(e.currentTarget.querySelector('.copy-v'), { opacity: 0.3 }, { opacity: 1, duration: 0.6 });
  };

  return (
    <section className="sec panel forest contact" id="contact" ref={ref}>
      <div className="wrap">
        <p className="label"><span>(10)</span> Contact</p>
        <h2 className="hop-title" aria-label="Let's build something good.">Let's build<br />something <em>good.</em></h2>

        <form className="lib" ref={form} onSubmit={send} noValidate>
          <p>Hi {site.first}, I'm <input name="name" placeholder="your name" autoComplete="name" aria-label="Your name" /> from <input name="company" placeholder="company" autoComplete="organization" aria-label="Company or college" />.</p>
          <p>I'd like to talk about{' '}
            <span className="chips">
              {contact.topics.map(t => (
                <button type="button" key={t} className={t === topic ? 'on' : undefined} onClick={e => pick(t, e)}>{t}</button>
              ))}
            </span>
          </p>
          <p>You can reach me at <input name="email" type="email" placeholder="you@email.com" autoComplete="email" aria-label="Your email" />.</p>
          <div className="lib-foot">
            <button className="send magnet" type="submit" data-cursor="Send"><span>Send<br />it ↗</span></button>
            <p className="muted small" aria-live="polite">{note}</p>
          </div>
        </form>

        <div className="contact-row">
          {site.email ? (
            <button className="copy" onClick={copyEmail}>
              <span className="copy-k">Email</span>
              <span className="copy-v">{site.email}</span>
              <span className="copy-hint">{copied ? 'Copied to clipboard ✓' : 'Click to copy'}</span>
            </button>
          ) : (
            <a className="copy" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="copy-k">Best way to reach me</span>
              <span className="copy-v">LinkedIn ↗</span>
              <span className="copy-hint">/in/yakash-goyal</span>
            </a>
          )}
          <ul className="socials">
            <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
            <li><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
