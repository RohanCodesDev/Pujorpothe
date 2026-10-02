'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PandalCard from '@/components/PandalCard';
import { pandals, regions, type Pandal, type Region, type PandalStyle } from '@/lib/data';

// Dynamic import for map (no SSR)
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const STYLE_FILTERS: PandalStyle[] = ['Traditional', 'Contemporary', 'Artistic', 'Heritage', 'Eco'];
const CROWD_FILTERS = [
  { label: '🟢 Quiet', value: 'quiet' },
  { label: '🟡 Moderate', value: 'moderate' },
  { label: '🔴 Busy', value: 'busy' },
];
const DISTANCE_FILTERS = [
  { label: '< 5 km', value: 5 },
  { label: '< 10 km', value: 10 },
  { label: 'Any', value: Infinity },
];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [selectedStyles, setSelectedStyles] = useState<PandalStyle[]>([]);
  const [selectedCrowd, setSelectedCrowd] = useState<string | null>(null);
  const [selectedPandalId, setSelectedPandalId] = useState<string | undefined>();
  const [mapView, setMapView] = useState(true);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [useLocation, setUseLocation] = useState(false);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locationError, setLocationError] = useState('');

  const toggleStyle = (style: PandalStyle) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setUseLocation(true);
        setLocationError('');
      },
      () => setLocationError('Could not get your location. Please try again.')
    );
  };

  // Distance calculation
  function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const filteredPandals = useMemo(() => {
    let result = pandals;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.bengaliName.includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedRegion !== 'all') {
      result = result.filter(p => p.region === selectedRegion);
    }

    if (selectedStyles.length > 0) {
      result = result.filter(p => selectedStyles.some(s => p.style.includes(s)));
    }

    if (selectedCrowd) {
      result = result.filter(p => p.crowd === selectedCrowd);
    }

    if (useLocation && userLat !== null && userLng !== null) {
      result = result.map(p => ({
        ...p,
        distanceKm: Math.round(haversineKm(userLat, userLng, p.lat, p.lng) * 10) / 10,
      })).sort((a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99));
    }

    return result;
  }, [search, selectedRegion, selectedStyles, selectedCrowd, useLocation, userLat, userLng]);

  const mapCenter: [number, number] = userLat && userLng
    ? [userLat, userLng]
    : [22.5726, 88.3639];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 'var(--nav-height)' }}>

      {/* Page Header */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '40px 32px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='35' fill='none' stroke='%23C9A84C' stroke-width='0.4' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 13,
            color: 'var(--gold)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>পুজো অন্বেষণ</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            color: '#fff',
            fontWeight: 500,
            marginBottom: 8,
          }}>
            Explore Pandals
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
          }}>
            {filteredPandals.length} pandal{filteredPandals.length !== 1 ? 's' : ''} found
            {useLocation && userLat ? ' · sorted by distance from you' : ''}
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{
        maxWidth: '100%',
        display: viewMode === 'split' ? 'grid' : 'block',
        gridTemplateColumns: viewMode === 'split' ? '420px 1fr' : '1fr',
        height: 'calc(100vh - var(--nav-height) - 116px)',
        minHeight: 600,
      }}>

        {/* ====== LEFT PANEL ====== */}
        {viewMode !== 'map' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--warm-white)',
            borderRight: '1px solid var(--ivory-dark)',
            overflow: 'hidden',
          }}>

            {/* Search & Location */}
            <div style={{ padding: '20px 20px 0' }}>
              <div className="search-box" style={{ marginBottom: 12 }}>
                <span style={{ color: 'var(--charcoal-light)', fontSize: 16 }}>🔍</span>
                <input
                  id="pandal-search"
                  type="text"
                  placeholder="পুজো খুঁজুন... Search pandals"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal-light)' }}
                  >✕</button>
                )}
              </div>

              {/* Location button */}
              <button
                id="use-location-btn"
                onClick={handleUseLocation}
                style={{
                  width: '100%',
                  padding: '11px 16px',
                  background: useLocation ? 'rgba(74, 103, 65, 0.1)' : 'rgba(193, 57, 43, 0.08)',
                  border: `1.5px solid ${useLocation ? 'var(--muted-green)' : 'rgba(193, 57, 43, 0.2)'}`,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: useLocation ? 'var(--muted-green)' : 'var(--vermilion)',
                  transition: 'all 0.2s ease',
                  marginBottom: 8,
                }}
              >
                <span>📍</span>
                <span>{useLocation ? '✓ Using your location' : 'Use my location'}</span>
              </button>
              {locationError && (
                <div style={{ fontSize: 12, color: 'var(--vermilion)', marginBottom: 8 }}>
                  {locationError}
                </div>
              )}
            </div>

            {/* Filters */}
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--ivory-dark)' }}>
              {/* Region filter */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Region</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button
                    className={`filter-chip ${selectedRegion === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedRegion('all')}
                  >All</button>
                  {regions.map(r => (
                    <button
                      key={r.id}
                      className={`filter-chip ${selectedRegion === r.id ? 'active' : ''}`}
                      onClick={() => setSelectedRegion(r.id)}
                      style={{ fontFamily: 'var(--font-bengali)' }}
                    >
                      {r.bengaliName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style filter */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Style</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {STYLE_FILTERS.map(style => (
                    <button
                      key={style}
                      className={`filter-chip ${selectedStyles.includes(style) ? 'active' : ''}`}
                      onClick={() => toggleStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crowd filter */}
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--charcoal-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Crowd</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {CROWD_FILTERS.map(c => (
                    <button
                      key={c.value}
                      className={`filter-chip ${selectedCrowd === c.value ? 'active' : ''}`}
                      onClick={() => setSelectedCrowd(selectedCrowd === c.value ? null : c.value)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredPandals.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--charcoal-light)', fontFamily: 'var(--font-body)' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontFamily: 'var(--font-bengali)', fontSize: 16, marginBottom: 4 }}>কোনো ফলাফল পাওয়া যায়নি</div>
                  <div style={{ fontSize: 13 }}>No pandals match your filters.</div>
                </div>
              ) : (
                filteredPandals.map(pandal => (
                  <div
                    key={pandal.id}
                    onClick={() => setSelectedPandalId(pandal.id)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <PandalCard pandal={pandal} showDistance={useLocation} />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ====== MAP PANEL ====== */}
        {viewMode !== 'list' && (
          <div style={{ position: 'relative', flex: 1 }}>
            <MapView
              pandals={filteredPandals}
              center={mapCenter}
              zoom={13}
              selectedPandalId={selectedPandalId}
              onPandalClick={p => setSelectedPandalId(p.id)}
              height="100%"
            />
          </div>
        )}
      </div>

      {/* View toggle FAB */}
      <div style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        display: 'flex',
        gap: 8,
        zIndex: 50,
      }}>
        {[
          { mode: 'split' as const, label: '⧉ Split', id: 'view-split' },
          { mode: 'list' as const, label: '☰ List', id: 'view-list' },
          { mode: 'map' as const, label: '🗺 Map', id: 'view-map' },
        ].map(({ mode, label, id }) => (
          <button
            key={mode}
            id={id}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '10px 18px',
              background: viewMode === mode ? 'var(--vermilion)' : 'var(--charcoal)',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(42,36,32,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
