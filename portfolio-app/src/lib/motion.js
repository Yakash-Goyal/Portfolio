/* Shared motion state and small helpers used by several sections. */
import { gsap } from './gsap';

const mq = q => typeof window !== 'undefined' && window.matchMedia(q).matches;
export const reduced = mq('(prefers-reduced-motion: reduce)');
export const fine = mq('(hover: hover) and (pointer: fine)');

/* scroll speed and direction, written by App and read by the marquee + badge */
export const motion = { vel: 0, dir: 1, boost: 0 };

/* make a letter jump and bounce back */
export const hop = ch => {
  if (gsap.isTweening(ch)) return;
  const h = ch.offsetHeight * 0.22;
  gsap.timeline().to(ch, { y: -h, duration: 0.18, ease: 'power2.out' }).to(ch, { y: 0, duration: 0.7, ease: 'bounce.out' });
};

/* smooth scroll to an element id, '#top' or a number */
export const scrollToTarget = target => {
  const y = target === '#top' ? 0 : typeof target === 'string' ? document.querySelector(target) : target;
  if (y === null) return;
  gsap.to(window, { scrollTo: { y, autoKill: true }, duration: 1.3, ease: 'expo.inOut' });
};
