import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { regions, getPandalsByRegion, imageMap } from '@/lib/data';
import PandalCard from '@/components/PandalCard';

interface Params { regionId: string }

export async function generateStaticParams() {
  return regions.map(r => ({ regionId: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { regionId } = await params;
  const region = regions.find(r => r.id === regionId);
  if (!region) return {};
  return {
    title: `${region.name} — পুজোর পথে`,
    description: region.story,
  };
}

export default async function RegionDetailPage({ params }: { params: Promise<Params> }) {
  const { regionId } = await params;
  const region = regions.find(r => r.id === regionId);
  if (!region) notFound();

  const regionPandals = getPandalsByRegion(region.id);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>

      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '65vh',
        minHeight: 440,
        overflow: 'hidden',
      }}>
        <Image
          src={imageMap[region.imageKey]}
          alt={region.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(42,36,32,0.3) 0%, rgba(42,36,32,0.75) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '48px 48px',
          maxWidth: 1280,
          margin: '0 auto',
          left: 0,
          right: 0,
        }}>
          <Link href="/regions" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize: 13,
            fontFamily: 'var(--font-body)',
            marginBottom: 16,
          }}>
            ← Back to Regions
          </Link>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 700,
            color: 'rgba(201, 168, 76, 0.95)',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {region.bengaliName}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            color: '#fff',
            fontWeight: 400,
            marginBottom: 8,
          }}>
            {region.name}
          </h1>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {region.description} · {region.pandalCount} Pandals
          </div>
        </div>
      </div>

      {/* Story section */}
      <div style={{ background: 'var(--warm-white)', padding: '48px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: 'var(--charcoal)',
            lineHeight: 1.9,
            marginBottom: 20,
          }}>
            {region.story}
          </p>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--vermilion)',
            fontStyle: 'italic',
          }}>
            "{region.highlight}"
          </div>
        </div>
      </div>

      {/* Pandals Grid */}
      <div className="section">
        <div style={{ marginBottom: 40 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            color: 'var(--charcoal)',
            marginBottom: 4,
          }}>
            Pandals in {region.name}
          </h2>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 18,
            color: 'var(--charcoal-light)',
          }}>
            {region.bengaliName}-এর পুজো মণ্ডপ
          </div>
        </div>

        {regionPandals.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 28,
          }}>
            {regionPandals.map(pandal => (
              <PandalCard key={pandal.id} pandal={pandal} showDistance={false} />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: 'var(--charcoal-light)',
            fontFamily: 'var(--font-bengali)',
            fontSize: 18,
          }}>
            শীঘ্রই আসছে…
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, marginTop: 8 }}>
              More pandals coming soon.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
