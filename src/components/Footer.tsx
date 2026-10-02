'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { imageMap } from '@/lib/data';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on landing page
  if (pathname === '/') {
    return null;
  }

  return (
    <footer style={{
      background: 'var(--charcoal)',
      color: 'rgba(255,255,255,0.75)',
      padding: '60px 32px 32px',
    }}>
      {/* Alpana border top */}
      <div style={{
        height: 3,
        background: 'linear-gradient(to right, var(--vermilion), var(--gold), var(--vermilion))',
        marginBottom: 48,
        borderRadius: 2,
      }} />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 48,
        marginBottom: 48,
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}>
            পুজোর পথে
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            color: 'var(--gold)',
            fontStyle: 'italic',
            marginBottom: 16,
          }}>
            Discover the Puja · Follow the Path
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            A digital journey through Bengal during Durga Puja. Explore pandals, discover traditions, and build your perfect Puja trail.
          </p>
        </div>

        {/* Explore */}
        <div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: 16,
          }}>অন্বেষণ</div>
          {[
            { label: 'Explore Pandals', href: '/explore' },
            { label: 'Explore Regions', href: '/regions' },
            { label: 'Puja Trails', href: '/trails' },
            { label: 'Navigate', href: '/explore' },
          ].map(item => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s ease',
              }}
              className="footer-link"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Regions */}
        <div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: 16,
          }}>অঞ্চল</div>
          {[
            { label: 'উত্তর কলকাতা', href: '/regions/north-kolkata' },
            { label: 'মধ্য কলকাতা', href: '/regions/central-kolkata' },
            { label: 'দক্ষিণ কলকাতা', href: '/regions/south-kolkata' },
            { label: 'সল্ট লেক', href: '/regions/salt-lake' },
            { label: 'নিউটাউন', href: '/regions/new-town' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                fontFamily: 'var(--font-bengali)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s ease',
              }}
              className="footer-link"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* About */}
        <div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--gold)',
            marginBottom: 16,
          }}>পরিচয়</div>
          {[
            { label: 'About the Project', href: '/about' },
            { label: 'Cultural Stories', href: '/about' },
            { label: 'Contact', href: '/about' },
          ].map(item => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                marginBottom: 10,
                transition: 'color 0.2s ease',
              }}
              className="footer-link"
            >
              {item.label}
            </Link>
          ))}

          {/* Shiuli decoration */}
          <div style={{ marginTop: 24, fontSize: 24 }}>🌸</div>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 6,
          }}>
            শুভ দুর্গাপূজা
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
        }}>
          © 2026 পুজোর পথে · Made with ❤️ for Bengal
        </div>
        <div style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 12,
          color: 'rgba(201, 168, 76, 0.5)',
        }}>
          আসুন, পুজো দেখতে যাই।
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: var(--gold) !important;
        }
      `}</style>
    </footer>
  );
}
