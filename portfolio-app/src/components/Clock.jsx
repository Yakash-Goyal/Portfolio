import { useEffect, useState } from 'react';
import { site } from '../data/content';

let fmt;
try { fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timeZone || undefined }); }
catch (e) { fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }); }

/* live local time, refreshed every 10 seconds */
export default function Clock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 10000);
    return () => clearInterval(id);
  }, []);
  return <b className="clock">{now}</b>;
}
