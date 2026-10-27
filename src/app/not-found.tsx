import Link from 'next/link';

export default function NotFound() {
  return <main id="main" className="not-found section-shell"><p className="eyebrow">404 / NOT IN THE INDEX</p><h1>That page<br /><em>isn’t here.</em></h1><Link className="text-link" href="/">Return to the portfolio <span aria-hidden="true">↗</span></Link></main>;
}
