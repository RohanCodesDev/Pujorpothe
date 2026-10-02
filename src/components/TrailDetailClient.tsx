'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { trails, getTrailPandals, imageMap, type Pandal } from '@/lib/data';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

// Can't use async in client — we'll just find by param
export default function TrailDetailClient({ trailId }: { trailId: string }) {
  const trail = trails.find(t => t.id === trailId);
  if (!trail) return <div style={{ padding: 80, textAlign: 'center', fontFamily: 'var(--font-bengali)', fontSize: 24 }}>Trail not found</div>;

  const trailPandals = getTrailPandals(trail);
  const [currentStep, setCurrentStep] = useState(0);
  const [navigationMode, setNavigationMode] = useState<'walking' | 'driving' | 'bicycling'>('walking');

  const currentPandal = trailPandals[currentStep];
  const nextPandal = trailPandals[currentStep + 1];
  const isLastStep = currentStep === trailPandals.length - 1;

  const navUrl = currentPandal
    ? `https://www.google.com/maps/dir/?api=1&destination=${currentPandal.lat},${currentPandal.lng}&travelmode=${navigationMode}`
    : '#';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 'var(--nav-height)' }}>

      {/* Trail Header */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '40px 40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' fill='none' stroke='%23C9A84C' stroke-width='0.4' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <Link href="/trails" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 16,
          }}>← All Trails</Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 48 }}>{trail.emoji}</div>
            <div>
              <div style={{ fontFamily: 'var(--font-bengali)', fontSize: 14, color: 'var(--gold)', marginBottom: 4 }}>
                {trail.bengaliName}
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                color: '#fff',
                fontWeight: 400,
              }}>
                {trail.name}
              </h1>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 24 }}>
              {[
                { value: trailPandals.length, label: 'Stops' },
                { value: `${trail.totalKm}km`, label: 'Distance' },
                { value: `~${trail.estimatedHours}h`, label: 'Duration' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)', fontWeight: 500 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '40px 40px',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 40,
        alignItems: 'start',
      }}
        className="trail-detail-grid"
      >
        {/* Left: Trail Steps */}
        <div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--charcoal-light)',
            marginBottom: 20,
          }}>
            Trail Stops ({trailPandals.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {trailPandals.map((pandal, i) => (
              <div
                key={pandal.id}
                className="trail-step"
                style={{ cursor: 'pointer' }}
                onClick={() => setCurrentStep(i)}
              >
                <div className="trail-step-connector">
                  <div
                    className="trail-step-dot"
                    style={{
                      background: i === currentStep ? 'var(--vermilion)' : i < currentStep ? 'var(--muted-green)' : 'var(--ivory-dark)',
                      border: `2px solid ${i === currentStep ? 'var(--vermilion)' : i < currentStep ? 'var(--muted-green)' : 'var(--charcoal-light)'}`,
                    }}
                  />
                  {i < trailPandals.length - 1 && <div className="trail-step-line" />}
                </div>
                <div style={{
                  paddingBottom: i < trailPandals.length - 1 ? 20 : 0,
                  padding: '0 0 20px 0',
                }}>
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: 10,
                      background: i === currentStep ? 'rgba(193,57,43,0.08)' : 'var(--warm-white)',
                      border: `1.5px solid ${i === currentStep ? 'rgba(193,57,43,0.3)' : 'var(--ivory-dark)'}`,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{
                        width: 20, height: 20,
                        background: i === currentStep ? 'var(--vermilion)' : i < currentStep ? 'var(--muted-green)' : 'var(--ivory-dark)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#fff', fontWeight: 700, flexShrink: 0,
                        fontFamily: 'var(--font-body)',
                      }}>
                        {i < currentStep ? '✓' : i + 1}
                      </span>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 16,
                        color: i === currentStep ? 'var(--vermilion)' : 'var(--charcoal)',
                        fontWeight: 500,
                      }}>
                        {pandal.name}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-bengali)',
                      fontSize: 12,
                      color: 'var(--charcoal-light)',
                    }}>
                      {pandal.bengaliName}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map + Current Stop */}
        <div>
          {/* Navigation Mode */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            alignItems: 'center',
          }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal-light)', marginRight: 4 }}>
              Travel by:
            </span>
            {[
              { mode: 'walking' as const, label: '🚶 Walk' },
              { mode: 'driving' as const, label: '🚗 Drive' },
              { mode: 'bicycling' as const, label: '🚲 Cycle' },
            ].map(({ mode, label }) => (
              <button
                key={mode}
                className={`filter-chip ${navigationMode === mode ? 'active' : ''}`}
                onClick={() => setNavigationMode(mode)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Map */}
          <div style={{ height: 380, borderRadius: 16, overflow: 'hidden', marginBottom: 24, boxShadow: 'var(--shadow-lg)' }}>
            <MapView
              pandals={trailPandals}
              center={[currentPandal?.lat ?? 22.5726, currentPandal?.lng ?? 88.3639]}
              zoom={13}
              selectedPandalId={currentPandal?.id}
              height="380px"
            />
          </div>

          {/* Current stop card */}
          {currentPandal && (
            <div style={{
              background: 'var(--warm-white)',
              borderRadius: 16,
              border: '1px solid rgba(193,57,43,0.15)',
              padding: 28,
              boxShadow: 'var(--shadow-md)',
              marginBottom: 20,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12,
              }}>
                <span style={{
                  padding: '4px 12px',
                  background: 'var(--vermilion)',
                  borderRadius: 100,
                  fontSize: 11,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  textTransform: 'uppercase',
                }}>
                  Stop {currentStep + 1} of {trailPandals.length}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                color: 'var(--charcoal)',
                marginBottom: 4,
              }}>
                {currentPandal.name}
              </h2>
              <div style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: 16,
                color: 'var(--charcoal-light)',
                marginBottom: 12,
              }}>
                {currentPandal.bengaliName}
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--charcoal-light)',
                lineHeight: 1.7,
                marginBottom: 20,
              }}>
                {currentPandal.description.slice(0, 160)}...
              </p>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                <a
                  href={navUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  🗺️ Navigate to This Stop
                </a>
                <Link href={`/pandal/${currentPandal.id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          )}

          {/* Next/Prev controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              style={{
                padding: '10px 24px',
                background: 'var(--warm-white)',
                border: '1.5px solid var(--ivory-dark)',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: currentStep === 0 ? 'var(--ivory-dark)' : 'var(--charcoal)',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              ← Previous Stop
            </button>

            {!isLastStep ? (
              <button
                onClick={() => setCurrentStep(s => Math.min(trailPandals.length - 1, s + 1))}
                className="btn-primary"
              >
                Next Stop →
              </button>
            ) : (
              <div style={{
                fontFamily: 'var(--font-bengali)',
                fontSize: 16,
                color: 'var(--muted-green)',
                fontWeight: 600,
              }}>
                ✓ Trail Complete!
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .trail-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
