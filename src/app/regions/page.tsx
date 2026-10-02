import Image from 'next/image';
import Link from 'next/link';
import { regions, getPandalsByRegion, imageMap } from '@/lib/data';

export const metadata = {
  title: 'Explore Regions — পুজোর পথে',
  description: 'Explore different regions of Kolkata and Bengal during Durga Puja.',
};

export default function RegionsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 'var(--nav-height)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '48px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='35' fill='none' stroke='%23C9A84C' stroke-width='0.4' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 14,
            color: 'var(--gold)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>বাংলা অন্বেষণ</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            color: '#fff',
            fontWeight: 500,
            marginBottom: 12,
          }}>
            Explore Bengal
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Each corner of Kolkata tells a different Puja story. Where will you begin?
          </p>
        </div>
      </div>

      {/* Regions */}
      <div className="section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {regions.map((region, idx) => {
            const regionPandals = getPandalsByRegion(region.id);
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={region.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                  direction: isReversed ? 'rtl' : 'ltr',
                }}
                className="region-row"
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  height: 480,
                  borderRadius: 20,
                  overflow: 'hidden',
                  direction: 'ltr',
                  boxShadow: 'var(--shadow-xl)',
                }}>
                  <Image
                    src={imageMap[region.imageKey]}
                    alt={region.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Pandal count badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    padding: '10px 20px',
                    background: 'rgba(193, 57, 43, 0.9)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 100,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#fff',
                  }}>
                    {region.pandalCount} Pandals
                  </div>
                </div>

                {/* Content */}
                <div style={{ direction: 'ltr', padding: '0 8px' }}>
                  <div style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 600,
                    color: 'var(--vermilion)',
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}>
                    {region.bengaliName}
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(32px, 5vw, 52px)',
                    color: 'var(--charcoal)',
                    fontWeight: 500,
                    marginBottom: 8,
                    lineHeight: 1.15,
                  }}>
                    {region.name}
                  </h2>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: 'var(--gold)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 20,
                    fontWeight: 600,
                  }}>
                    {region.description}
                  </div>

                  {/* Divider */}
                  <div style={{
                    width: 48,
                    height: 2,
                    background: 'var(--vermilion)',
                    marginBottom: 20,
                    borderRadius: 1,
                  }} />

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: 'var(--charcoal-light)',
                    lineHeight: 1.8,
                    marginBottom: 12,
                  }}>
                    {region.story}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    color: 'var(--charcoal)',
                    fontStyle: 'italic',
                    marginBottom: 32,
                  }}>
                    "{region.highlight}"
                  </p>

                  {/* Pandal preview */}
                  {regionPandals.length > 0 && (
                    <div style={{ marginBottom: 28 }}>
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 11,
                        color: 'var(--charcoal-light)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: 12,
                      }}>
                        Notable Pandals
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {regionPandals.slice(0, 3).map(p => (
                          <Link
                            key={p.id}
                            href={`/pandal/${p.id}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              textDecoration: 'none',
                              padding: '8px 12px',
                              borderRadius: 8,
                              background: 'var(--warm-white)',
                              border: '1px solid var(--ivory-dark)',
                              transition: 'all 0.2s ease',
                            }}
                            className="pandal-link-row"
                          >
                            <span style={{ fontSize: 6, color: 'var(--vermilion)' }}>●</span>
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 13,
                              fontWeight: 500,
                              color: 'var(--charcoal)',
                              flex: 1,
                            }}>{p.name}</span>
                            <span style={{
                              fontFamily: 'var(--font-bengali)',
                              fontSize: 12,
                              color: 'var(--charcoal-light)',
                            }}>{p.bengaliName}</span>
                            <span style={{ color: 'var(--vermilion)', fontSize: 12 }}>→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/regions/${region.id}`} className="btn-primary">
                    Explore {region.name} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Beyond Kolkata teaser */}
      <div style={{
        background: 'var(--ivory-dark)',
        padding: '60px 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 32,
            color: 'var(--charcoal)',
            marginBottom: 8,
          }}>
            আরো দূরে…
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            color: 'var(--charcoal)',
            marginBottom: 16,
          }}>
            Beyond Kolkata
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--charcoal-light)',
            lineHeight: 1.7,
            marginBottom: 28,
          }}>
            Durga Puja extends far beyond the city. Howrah, Hooghly, Chandannagar, Krishnanagar, Siliguri, Durgapur — 
            each holds its own tradition. Coming soon.
          </p>
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {['Howrah', 'Hooghly', 'Chandannagar', 'Krishnanagar', 'Siliguri', 'Durgapur'].map(city => (
              <span
                key={city}
                style={{
                  padding: '8px 18px',
                  border: '1.5px solid var(--ivory-dark)',
                  borderRadius: 100,
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--charcoal-light)',
                  background: 'var(--warm-white)',
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
