'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { imageMap } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const isDarkPage = pathname === '/' || pathname === '/drawyer';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}
      style={{ justifyContent: 'space-between' }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', overflow: 'hidden',
          border: '2px solid rgba(201, 168, 76, 0.5)',
          flexShrink: 0,
        }}>
          <Image
            src={imageMap.logo}
            alt="পুজোর পথে"
            width={40} height={40}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 20,
            fontWeight: 600,
            color: scrolled && !isDarkPage ? 'var(--charcoal)' : '#fff',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}>
            পুজোর পথে
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            color: scrolled && !isDarkPage ? 'var(--gold)' : 'rgba(201, 168, 76, 0.85)',
            letterSpacing: '0.1em',
            transition: 'color 0.3s ease',
          }}>
            Discover the Puja · Follow the Path
          </div>
        </div>
      </Link>

      {/* Desktop Nav */}
      {!isHome && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { label: 'Metro Guide', href: '/metro' },
            { label: 'Explore Pandals', href: '/explore' },
            { label: 'Helplines', href: '/helplines' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: 15,
                fontWeight: 500,
                color: scrolled && !isDarkPage ? 'var(--charcoal)' : 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                letterSpacing: '0.02em',
              }}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/explore"
            style={{
              padding: '9px 22px',
              background: 'var(--vermilion)',
              color: '#fff',
              borderRadius: 4,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            Explore Now
          </Link>
        </div>
      )}

      <style jsx>{`
        .nav-link:hover {
          color: var(--vermilion) !important;
        }
        @media (max-width: 768px) {
          .nav-link, .navbar > div:last-child > a:last-child {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
