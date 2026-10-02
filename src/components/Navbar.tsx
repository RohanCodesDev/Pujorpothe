'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { imageMap } from '@/lib/data';

const NAV_LINKS = [
  { label: 'Metro Guide', href: '/metro' },
  { label: 'Explore Pandals', href: '/explore' },
  { label: 'Helplines', href: '/helplines' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isDarkPage = pathname === '/' || pathname === '/drawyer';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const textColor = scrolled && !isDarkPage ? 'var(--charcoal)' : '#fff';

  if (isHome) return null;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`} style={{ justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(201, 168, 76, 0.5)', flexShrink: 0 }}>
            <Image src={imageMap.logo} alt="পুজোর পথে" width={40} height={40} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-bengali)', fontSize: 20, fontWeight: 600, color: textColor, lineHeight: 1, transition: 'color 0.3s ease' }}>
              পুজোর পথে
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: scrolled && !isDarkPage ? 'var(--gold)' : 'rgba(201, 168, 76, 0.85)', letterSpacing: '0.1em', transition: 'color 0.3s ease' }}>
              Discover the Puja · Follow the Path
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        {!isHome && (
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {NAV_LINKS.map(item => (
              <Link key={item.href} href={item.href} style={{ fontFamily: 'var(--font-bengali)', fontSize: 15, fontWeight: 500, color: textColor, textDecoration: 'none', transition: 'color 0.3s ease', letterSpacing: '0.02em' }} className="nav-link">
                {item.label}
              </Link>
            ))}
            <Link href="/explore" style={{ padding: '9px 22px', background: 'var(--vermilion)', color: '#fff', borderRadius: 4, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', transition: 'all 0.2s ease' }}>
              Explore Now
            </Link>
          </div>
        )}

        {/* Hamburger (mobile only, shown via CSS) */}
        {!isHome && (
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              display: 'none', // CSS shows it on mobile
              background: 'none', border: 'none', cursor: 'pointer',
              flexDirection: 'column', gap: '5px', padding: '8px', zIndex: 10,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: textColor, borderRadius: '2px', transition: 'background 0.3s' }} />
            ))}
          </button>
        )}

        <style jsx>{`
          .nav-link:hover { color: var(--vermilion) !important; }
        `}</style>
      </nav>

      {/* Mobile full-screen menu overlay */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '60px 40px' }}>
        <button className="nav-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>

        {/* Mobile Menu Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '3rem', gap: '16px' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(201, 168, 76, 0.5)', flexShrink: 0 }}>
            <Image src={imageMap.logo} alt="পুজোর পথে" width={60} height={60} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-bengali)', fontSize: 24, fontWeight: 600, color: '#fff', lineHeight: 1, marginBottom: '6px' }}>
              পুজোর পথে
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--gold)', letterSpacing: '0.1em' }}>
              Discover the Puja · Follow the Path
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', flex: 1 }}>
          {NAV_LINKS.map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="sidebar-link">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Footer */}
        <div style={{
          textAlign: 'left',
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          color: '#fef08a',
          opacity: 0.8,
          marginTop: 'auto',
          paddingBottom: '20px'
        }}>
          Made with love by RohanCodesDev
        </div>
      </div>
    </>
  );
}
