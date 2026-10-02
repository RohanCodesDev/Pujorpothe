'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RegionInfo, imageMap } from '@/lib/data';

interface RegionCardProps {
  region: RegionInfo;
  index?: number;
}

export default function RegionCard({ region, index = 0 }: RegionCardProps) {
  const imageSrc = imageMap[region.imageKey] || imageMap.hero;

  return (
    <Link
      href={`/regions/${region.id}`}
      className="region-card"
      style={{
        display: 'block',
        textDecoration: 'none',
        animationDelay: `${index * 100}ms`,
      }}
    >
      <Image
        src={imageSrc}
        alt={region.name}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      <div className="region-card-overlay">
        {/* Pandal count */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          background: 'rgba(193, 57, 43, 0.8)',
          borderRadius: 100,
          marginBottom: 12,
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{ fontSize: 11, color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.06em' }}>
            {region.pandalCount} PANDALS
          </span>
        </div>

        {/* Bengali name */}
        <div style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 16,
          color: 'rgba(201, 168, 76, 0.9)',
          marginBottom: 4,
          fontWeight: 400,
        }}>
          {region.bengaliName}
        </div>

        {/* English name */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          fontWeight: 600,
          color: '#fff',
          marginBottom: 6,
          lineHeight: 1.2,
        }}>
          {region.name}
        </h3>

        {/* Description */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          {region.description}
        </div>

        {/* Story */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {region.story}
        </p>

        {/* Hover CTA */}
        <div style={{
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--gold-light)',
          letterSpacing: '0.04em',
        }}>
          <span>Explore Region</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
