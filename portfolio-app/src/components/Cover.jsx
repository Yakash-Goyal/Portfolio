import { memo } from 'react';
import { covers, PAL } from '../lib/covers';

/* A drawn project mockup. name: aether | monolith | pulse | driftwood, pal: see PAL in lib/covers.js */
function Cover({ name, pal }) {
  const draw = covers[name];
  return <div className="cover" dangerouslySetInnerHTML={{ __html: draw ? draw(PAL[pal] || PAL.paper) : '' }} />;
}
export default memo(Cover);
