'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-stuck', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link className="wordmark" href="/#top" aria-label="Kunal Wagh, home">KUNAL WAGH<span>®</span></Link>
        <span className="header-location">INDEPENDENT BUILDER <i /> MUMBAI, IN</span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          <a className="nav-github" href="https://github.com/Kaiser879" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((value) => !value)}>
          <span>{open ? 'CLOSE' : 'MENU'}</span><i aria-hidden="true">{open ? '−' : '+'}</i>
        </button>
      </div>
      <AnimatePresence>
        {open && <motion.nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
          {links.map((link) => <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↘</span></Link>)}
          <a href="https://github.com/Kaiser879" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
