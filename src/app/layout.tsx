import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: {
    default: 'Kunal Wagh — Selected Work',
    template: '%s — Kunal Wagh',
  },
  description: 'Selected work and experiments by Kunal Wagh, a student at MIT Mumbai.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
