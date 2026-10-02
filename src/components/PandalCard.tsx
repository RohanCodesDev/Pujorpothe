'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pandal, imageMap } from '@/lib/data';

interface PandalCardProps {
  pandal: Pandal;
  showDistance?: boolean;
}

const styleColors: Record<string, string> = {
  'Traditional': 'badge-traditional',
  'Contemporary': 'badge-contemporary',
  'Artistic': 'badge-artistic',
  'Heritage': 'badge-heritage',
  'Eco': 'badge-contemporary',
  'Large scale': 'badge-traditional',
};

const crowdLabel: Record<string, string> = {
  quiet: '🟢 Quiet',
  moderate: '🟡 Moderate',
  busy: '🔴 Busy',
};

export default function PandalCard({ pandal, showDistance = true }: PandalCardProps) {
  const imageSrc = imageMap[pandal.imageKey] || imageMap.hero;

  return (
    <div className="pandal-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image */}
      <div className="pandal-card-image">
        <Image
          src={imageSrc}
          alt={pandal.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {/* Region badge */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          padding: '5px 12px',
          background: 'rgba(42, 36, 32, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 100,
          fontSize: 11,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {pandal.region.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
        {/* Crowd indicator */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          padding: '5px 10px',
          background: 'rgba(42, 36, 32, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 100,
          fontSize: 11,
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'var(--font-body)',
        }}>
          {crowdLabel[pandal.crowd]}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Name */}
        <div style={{ marginBottom: 8 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--charcoal)',
            marginBottom: 2,
          }}>
            {pandal.name}
          </h3>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 14,
            color: 'var(--charcoal-light)',
            fontWeight: 400,
          }}>
            {pandal.bengaliName}
          </div>
        </div>

        {/* Style badges */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {pandal.style.slice(0, 2).map(s => (
            <span key={s} className={`badge ${styleColors[s] || 'badge-traditional'}`}>
              {s}
            </span>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13.5,
          color: 'var(--charcoal-light)',
          lineHeight: 1.6,
          flex: 1,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {pandal.description}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--ivory-dark)',
          paddingTop: 16,
        }}>
          {showDistance && pandal.distanceKm && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--charcoal-light)',
            }}>
              <span>📍</span>
              <span>{pandal.distanceKm} km away</span>
            </div>
          )}
          {pandal.established && (
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--gold)',
              fontStyle: 'italic',
            }}>
              Est. {pandal.established}
            </div>
          )}
          <Link
            href={`/pandal/${pandal.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--vermilion)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'gap 0.2s ease',
            }}
            className="explore-link"
          >
            Explore →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .explore-link:hover {
          gap: 8px !important;
        }
      `}</style>
    </div>
  );
}
