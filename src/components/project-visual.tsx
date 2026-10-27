import type { ProjectSlug } from '@/lib/projects';

const PIXEL_FRAMES = { 'your-next-binge': 16, mem: 12, airblued: 16 } as const;

function PixelScene({ slug, variant }: { slug: keyof typeof PIXEL_FRAMES; variant: 'card' | 'wide' | 'detail' }) {
  const frames = PIXEL_FRAMES[slug];
  const scale = variant === 'card' ? 2 : 3;
  return (
    <div className="pixel-stage">
      <div className={`pixel-sprite pixel-sprite-${slug}${variant === 'wide' ? ' pixel-sprite-wide' : ''}`}>
        <picture>
          {variant === 'wide' && <source media="(min-width: 900px)" srcSet={`/art/${slug}-sheet-3x.png`} />}
          <img src={`/art/${slug}-sheet-${scale}x.png`} alt="" width={frames * 192 * scale} height={108 * scale} decoding="async" />
        </picture>
      </div>
    </div>
  );
}

export function ProjectVisual({ slug, variant = 'card' }: { slug: ProjectSlug; variant?: 'card' | 'wide' | 'detail' }) {
  if (slug === 'your-next-binge') {
    return <div role="img" className={`project-visual visual-binge ${variant === 'detail' ? 'visual-detail' : ''}`} aria-label="Pixel diagram of a TV query being embedded and matched against a vector index">
      <div className="mock-top"><span>YNB / DISCOVER</span><span>INDIA · NOW</span></div>
      <PixelScene slug="your-next-binge" variant={variant} />
      <div className="mock-bottom"><span>LIVE AVAILABILITY</span><span>14 TITLES IN YOUR REGION <i /></span></div>
    </div>;
  }
  if (slug === 'mem') {
    return <div role="img" className={`project-visual visual-mem ${variant === 'detail' ? 'visual-detail' : ''}`} aria-label="Pixel diagram of indexed documents with a matched line under a magnifier">
      <div className="mock-top"><span>mem / local index</span><span>GO · SQLITE FTS5</span></div>
      <PixelScene slug="mem" variant={variant} />
      <div className="mock-bottom"><span>LOCAL FIRST</span><span>NO NETWORK REQUIRED <i /></span></div>
    </div>;
  }
  return <div role="img" className={`project-visual visual-airblued ${variant === 'detail' ? 'visual-detail' : ''}`} aria-label="Pixel diagram of AirBlued sending a request through BlueZ to the Bluetooth adapter">
    <div className="mock-top"><span>AIRBLUED / BLUETOOTH</span><span>BLUEZ · DBUS</span></div>
    <PixelScene slug="airblued" variant={variant} />
    <div className="mock-bottom"><span>LIVE DEVICE SCAN</span><span>EVENT-DRIVEN <i /></span></div>
  </div>;
}
