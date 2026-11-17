import { createRoot } from 'react-dom/client';
import { gsap, ScrollTrigger } from './lib/gsap';
import App from './App';
import './styles/global.css';

/* always start at the top so the intro plays (ScrollTrigger would otherwise restore the old position) */
ScrollTrigger.clearScrollMemory('manual');
window.scrollTo(0, 0);

/* handy for debugging in the browser console, only on your own machine */
if (['localhost', '127.0.0.1'].includes(window.location.hostname)) Object.assign(window, { gsap, ScrollTrigger });

createRoot(document.getElementById('root')).render(<App />);
