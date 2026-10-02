import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pandals, getRegionInfo, imageMap } from '@/lib/data';
import MapView from '@/components/MapView';
import PandalCard from '@/components/PandalCard';

interface Params { pandalId: string }

export async function generateStaticParams() {
  return pandals.map(p => ({ pandalId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { pandalId } = await params;
  const pandal = pandals.find(p => p.id === pandalId);
  if (!pandal) return {};
  return {
    title: `${pandal.name} — পুজোর পথে`,
    description: pandal.description,
  };
}

const crowdPercent = { quiet: 30, moderate: 60, busy: 90 };
const crowdColor = { quiet: 'var(--muted-green)', moderate: 'var(--gold)', busy: 'var(--vermilion)' };
const crowdLabel = { quiet: 'Quiet — comfortable visit', moderate: 'Moderate crowds', busy: 'Very busy — plan ahead' };

export default async function PandalDetailPage({ params }: { params: Promise<Params> }) {
  const { pandalId } = await params;
  const pandal = pandals.find(p => p.id === pandalId);
  if (!pandal) notFound();

  const region = getRegionInfo(pandal.region);
  const imageSrc = imageMap[pandal.imageKey] || imageMap.hero;
  const nearbyPandals = pandals.filter(p => p.id !== pandal.id && p.region === pandal.region).slice(0, 3);

  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}&travelmode=walking`;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <Image
          src={imageSrc}
          alt={pandal.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(42,36,32,0.2) 0%, rgba(42,36,32,0.85) 100%)',
        }} />

        {/* Back button */}
        <div style={{ position: 'absolute', top: 88, left: 40 }}>
          <Link href="/explore" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            padding: '8px 16px',
            background: 'rgba(42,36,32,0.4)',
            backdropFilter: 'blur(8px)',
            borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            ← Back to Explore
          </Link>
        </div>

        {/* Hero content */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '48px 48px',
          maxWidth: 1280,
          margin: '0 auto',
        }}>
          {pandal.style.slice(0, 2).map(s => (
            <span key={s} style={{
              display: 'inline-block',
              padding: '4px 14px',
              background: 'rgba(193,57,43,0.85)',
              borderRadius: 100,
              fontSize: 11,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#fff',
              textTransform: 'uppercase',
              marginRight: 6,
              marginBottom: 16,
            }}>
              {s}
            </span>
          ))}

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            color: '#fff',
            fontWeight: 500,
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            {pandal.name}
          </h1>

          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 'clamp(20px, 3vw, 30px)',
            color: 'rgba(201, 168, 76, 0.9)',
            marginBottom: 8,
          }}>
            {pandal.bengaliName}
          </div>

          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'rgba(255,255,255,0.65)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <span>📍 {region?.name}</span>
            {pandal.established && <span>· Est. {pandal.established}</span>}
            {pandal.distanceKm && <span>· {pandal.distanceKm} km away</span>}
          </div>
        </div>
      </div>

      {/* Navigate CTA bar */}
      <div style={{
        background: 'var(--vermilion)',
        padding: '16px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: 'var(--font-bengali)',
          fontSize: 16,
          color: 'rgba(255,255,255,0.9)',
        }}>
          এখানে পৌঁছান — Navigate Here
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={navUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            🚶 Walk
          </a>
          <a
            href={navUrl.replace('walking', 'driving')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            🚗 Drive
          </a>
          <a
            href={navUrl.replace('walking', 'bicycling')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            🚲 Cycle
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 48px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 60,
        }}
          className="pandal-detail-grid"
        >
          {/* Left: Content */}
          <div>
            {/* About */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                color: 'var(--charcoal)',
                marginBottom: 20,
              }}>About</h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: 'var(--charcoal-light)',
                lineHeight: 1.9,
              }}>
                {pandal.description}
              </p>
            </section>

            {/* Theme */}
            <section style={{
              marginBottom: 48,
              padding: 28,
              background: 'rgba(193, 57, 43, 0.05)',
              borderLeft: '4px solid var(--vermilion)',
              borderRadius: '0 12px 12px 0',
            }}>
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--vermilion)',
                marginBottom: 8,
                fontWeight: 600,
              }}>This Year's Theme</div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                color: 'var(--charcoal)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                {pandal.theme}
              </p>
            </section>

            {/* History */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                color: 'var(--charcoal)',
                marginBottom: 16,
              }}>History</h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--charcoal-light)',
                lineHeight: 1.9,
              }}>
                {pandal.history}
              </p>
            </section>

            {/* Map */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                color: 'var(--charcoal)',
                marginBottom: 20,
              }}>Location</h2>
              <div style={{ height: 320, borderRadius: 12, overflow: 'hidden' }}>
                <MapView
                  pandals={[pandal]}
                  center={[pandal.lat, pandal.lng]}
                  zoom={15}
                  selectedPandalId={pandal.id}
                  height="320px"
                />
              </div>
            </section>
          </div>

          {/* Right: Info sidebar */}
          <div>
            <div style={{
              position: 'sticky',
              top: 'calc(var(--nav-height) + 24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>
              {/* Quick info card */}
              <div style={{
                background: 'var(--warm-white)',
                border: '1px solid var(--ivory-dark)',
                borderRadius: 16,
                padding: 28,
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--charcoal-light)',
                  marginBottom: 20,
                }}>Quick Info</div>

                {[
                  { icon: '🕐', label: 'Timings', value: pandal.timings },
                  { icon: '🏛️', label: 'Committee', value: pandal.committee },
                  { icon: '📅', label: 'Established', value: pandal.established },
                  { icon: '📍', label: 'Region', value: region?.name },
                ].map(item => item.value && (
                  <div key={item.label} style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid var(--ivory-dark)',
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal-light)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--charcoal)', lineHeight: 1.5 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Crowd indicator */}
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal-light)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Crowd Level
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: crowdColor[pandal.crowd] }}>
                      {pandal.crowd}
                    </div>
                  </div>
                  <div className="crowd-bar">
                    <div
                      className="crowd-bar-fill"
                      style={{
                        width: `${crowdPercent[pandal.crowd]}%`,
                        background: crowdColor[pandal.crowd],
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--charcoal-light)', marginTop: 8, lineHeight: 1.4 }}>
                    {crowdLabel[pandal.crowd]}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--charcoal-light)', marginTop: 6, lineHeight: 1.4 }}>
                    {pandal.crowdInfo}
                  </div>
                </div>
              </div>

              {/* Experience tags */}
              <div style={{
                background: 'var(--warm-white)',
                border: '1px solid var(--ivory-dark)',
                borderRadius: 16,
                padding: 24,
              }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--charcoal-light)', marginBottom: 14 }}>
                  Best For
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {pandal.experience.map(tag => (
                    <span key={tag} style={{
                      padding: '6px 14px',
                      background: 'rgba(193, 57, 43, 0.08)',
                      border: '1px solid rgba(193, 57, 43, 0.2)',
                      borderRadius: 100,
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: 'var(--vermilion)',
                      fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigate button */}
              <a
                href={navUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ justifyContent: 'center', fontSize: 16, padding: '16px 24px' }}
              >
                <span>🗺️</span>
                <span>Navigate Here</span>
              </a>
            </div>
          </div>
        </div>

        {/* Nearby Pujas */}
        {nearbyPandals.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              color: 'var(--charcoal)',
              marginBottom: 8,
            }}>Nearby Pujas</h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--charcoal-light)',
              marginBottom: 28,
            }}>
              More pandals in {region?.name}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}>
              {nearbyPandals.map(p => (
                <PandalCard key={p.id} pandal={p} showDistance={false} />
              ))}
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
