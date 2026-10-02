import Link from 'next/link';
import { trails, getTrailPandals, imageMap } from '@/lib/data';
import Image from 'next/image';

export const metadata = {
  title: 'Puja Trails — পুজোর পথে',
  description: 'Pre-planned journeys through multiple pandals. Create your perfect Puja trail.',
};

export default function TrailsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 'var(--nav-height)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '56px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='25' fill='none' stroke='%23C9A84C' stroke-width='0.5' stroke-opacity='0.15'/%3E%3C/svg%3E")`,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 14,
            color: 'var(--gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>পুজো পথ</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 60px)',
            color: '#fff',
            fontWeight: 400,
            marginBottom: 16,
          }}>
            Puja Trails
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Instead of visiting one pandal, build a complete Puja journey. 
            Pick a trail and start navigating.
          </p>
        </div>
      </div>

      {/* Trails */}
      <div className="section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          {trails.map((trail, idx) => {
            const trailPandals = getTrailPandals(trail);
            return (
              <div
                key={trail.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 60,
                  alignItems: 'start',
                }}
                className="trail-row"
              >
                {/* Left: Trail info */}
                <div>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>{trail.emoji}</div>
                  <div style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: 16,
                    color: 'var(--vermilion)',
                    marginBottom: 4,
                  }}>
                    {trail.bengaliName}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    color: 'var(--charcoal)',
                    fontWeight: 500,
                    marginBottom: 16,
                    lineHeight: 1.2,
                  }}>
                    {trail.name}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: 'var(--charcoal-light)',
                    lineHeight: 1.8,
                    marginBottom: 28,
                  }}>
                    {trail.description}
                  </p>

                  {/* Trail stats */}
                  <div style={{
                    display: 'flex',
                    gap: 0,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: '1px solid var(--ivory-dark)',
                    marginBottom: 28,
                  }}>
                    {[
                      { icon: '🏛️', value: trail.pandalIds.length, label: 'Pandals', bengali: 'পুজো' },
                      { icon: '📍', value: `${trail.totalKm} km`, label: 'Distance', bengali: 'দূরত্ব' },
                      { icon: '⏱️', value: `~${trail.estimatedHours}h`, label: 'Duration', bengali: 'সময়' },
                    ].map((stat, i) => (
                      <div key={stat.label} style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '20px 16px',
                        background: 'var(--warm-white)',
                        borderRight: i < 2 ? '1px solid var(--ivory-dark)' : 'none',
                      }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{stat.icon}</div>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 24,
                          color: 'var(--charcoal)',
                          fontWeight: 500,
                          marginBottom: 2,
                        }}>
                          {stat.value}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 11,
                          color: 'var(--charcoal-light)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href={`/trails/${trail.id}`} className="btn-primary">
                    Start This Trail →
                  </Link>
                </div>

                {/* Right: Trail steps */}
                <div style={{
                  background: 'var(--warm-white)',
                  borderRadius: 20,
                  padding: 32,
                  border: '1px solid var(--ivory-dark)',
                  boxShadow: 'var(--shadow-md)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal-light)',
                    marginBottom: 24,
                  }}>
                    Trail Route
                  </div>

                  {trailPandals.map((p, i) => (
                    <div key={p.id} className="trail-step" style={{ marginBottom: i < trailPandals.length - 1 ? 0 : 0 }}>
                      <div className="trail-step-connector">
                        <div className="trail-step-dot" />
                        {i < trailPandals.length - 1 && (
                          <div className="trail-step-line" />
                        )}
                      </div>
                      <div style={{ paddingBottom: i < trailPandals.length - 1 ? 20 : 0, paddingTop: 0 }}>
                        <Link
                          href={`/pandal/${p.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 18,
                            color: 'var(--charcoal)',
                            fontWeight: 500,
                            marginBottom: 2,
                            transition: 'color 0.2s ease',
                          }}
                            className="trail-pandal-name"
                          >
                            {p.name}
                          </div>
                        </Link>
                        <div style={{
                          fontFamily: 'var(--font-bengali)',
                          fontSize: 13,
                          color: 'var(--charcoal-light)',
                          marginBottom: 4,
                        }}>
                          {p.bengaliName}
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {p.style.slice(0, 1).map(s => (
                            <span key={s} style={{
                              padding: '2px 8px',
                              background: 'rgba(193,57,43,0.08)',
                              borderRadius: 100,
                              fontSize: 11,
                              color: 'var(--vermilion)',
                              fontFamily: 'var(--font-body)',
                            }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
}
