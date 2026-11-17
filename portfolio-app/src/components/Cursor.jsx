import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { fine } from '../lib/motion';

/* small dot that follows the mouse and grows into a label over [data-cursor] elements */
export default function Cursor() {
  const ref = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!fine) return;
    const cur = ref.current;
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
    const move = e => { xTo(e.clientX); yTo(e.clientY); cur.classList.add('on'); };
    const leave = () => cur.classList.remove('on');
    const over = e => {
      const t = e.target.closest('[data-cursor], a, button, input');
      cur.classList.remove('big', 'hover');
      if (!t) return;
      if (t.dataset.cursor) {
        let text = t.dataset.cursor;
        if (text === 'Open' && t.closest('.acc-item.open')) text = 'Close';
        label.current.textContent = text;
        cur.classList.add('big');
      } else cur.classList.add('hover');
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerover', over);
    };
  }, []);

  return <div className="cursor" ref={ref} aria-hidden="true"><span className="cursor-label" ref={label} /></div>;
}
