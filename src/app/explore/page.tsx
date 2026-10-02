'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { pandals, regions, type Pandal } from '@/lib/data';
import { blueLineStops, greenLineStops, orangeLineStops, purpleLineStops } from '@/app/metro/page';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

// Haversine distance
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'region' | 'metro'>('region');
  const [selectedFilterValue, setSelectedFilterValue] = useState('all');

  const [useLocation, setUseLocation] = useState(false);
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(5);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [selectedMapPandal, setSelectedMapPandal] = useState<Pandal | null>(null);

  const metroLines = ['Blue Line', 'Green Line', 'Orange Line', 'Purple Line'];

  const metroMapping: Record<string, string[]> = useMemo(() => {
    const toId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      'Blue Line': blueLineStops.flatMap(s => s.pandals.map(toId)),
      'Green Line': greenLineStops.flatMap(s => s.pandals.map(toId)),
      'Orange Line': orangeLineStops.flatMap(s => s.pandals.map(toId)),
      'Purple Line': purpleLineStops.flatMap(s => s.pandals.map(toId))
    };
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) return;

    if (useLocation) {
      setUseLocation(false);
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setUseLocation(true);
        setSelectedFilterValue('all'); // Force clear filters to show global closest
        setSearch(''); // Clear search
        setLocationLoading(false);
        // Reset visibility to top 5 when location changes
        setVisibleCount(5);
      },
      () => {
        alert('Location access denied or unavailable.');
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const processedPandals = useMemo(() => {
    let result = [...pandals];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.bengaliName && p.bengaliName.includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.theme && p.theme.toLowerCase().includes(q)) ||
          (p.history && p.history.toLowerCase().includes(q)) ||
          (p.region && p.region.replace(/-/g, ' ').includes(q)) ||
          (p.style && p.style.some(s => s.toLowerCase().includes(q))) ||
          (p.crowd && p.crowd.toLowerCase().includes(q)) ||
          (p.experience && p.experience.some(e => e.toLowerCase().includes(q))) ||
          (p.committee && p.committee.toLowerCase().includes(q)) ||
          (p.established && p.established.includes(q)) ||
          (p.timings && p.timings.toLowerCase().includes(q)) ||
          (p.crowdInfo && p.crowdInfo.toLowerCase().includes(q))
        );
      });
    }

    if (selectedFilterValue !== 'all') {
      if (filterType === 'region') {
        result = result.filter(p => p.region === selectedFilterValue);
      } else {
        result = result.filter(p => metroMapping[selectedFilterValue]?.includes(p.id));
      }
    }

    if (useLocation && userLat !== null && userLng !== null) {
      result = result.map(p => ({
        ...p,
        distanceKm: Math.round(getDistanceKm(userLat, userLng, p.lat, p.lng) * 10) / 10
      })).sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
    }

    return result;
  }, [search, filterType, selectedFilterValue, useLocation, userLat, userLng]);

  const displayedPandals = processedPandals.slice(0, visibleCount);

  return (
    <main style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 'calc(var(--nav-height) + 40px)',
      paddingBottom: '6rem',
      overflowX: 'hidden'
    }}>
      {/* Background Elements */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(136, 19, 19, 0.02) 50%, transparent 100%)', animation: 'pulse 8s infinite alternate ease-in-out', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)', width: '700px', height: '800px', opacity: 0.07, zIndex: 0, pointerEvents: 'none', animation: 'spin-slow 175s linear infinite', backgroundImage: 'url(/mandalabg.svg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />

      <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 24px', zIndex: 10 }}>

        {/* Header & Immersive Search */}
        <div style={{ marginBottom: '60px' }}>
          <input
            type="text"
            placeholder="Search pandals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input"
            style={{
              width: '100%',
              marginBottom: '32px',
              padding: '16px 24px',
              fontSize: '1.2rem',
              borderRadius: '24px'
            }}
          />

          {/* Controls (Filters & Actions) */}
          <div style={{
            display: 'flex',
            gap: '40px 32px',
            alignItems: 'center',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.6)'
          }}>

            {/* Filter Dropdowns */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>Show:</span>
                <select
                  value={filterType}
                  className="minimal-dropdown"
                  onChange={(e) => {
                    setFilterType(e.target.value as 'region' | 'metro');
                    setSelectedFilterValue('all');
                  }}
                >
                  <option value="region">Regions</option>
                  <option value="metro">Metro Lines</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={selectedFilterValue}
                  className="minimal-dropdown"
                  onChange={(e) => setSelectedFilterValue(e.target.value)}
                >
                  <option value="all">All</option>
                  {filterType === 'region'
                    ? regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)
                    : metroLines.map(m => <option key={m} value={m}>{m}</option>)
                  }
                </select>
              </div>
            </div>

            {/* Action Links */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <button
                onClick={handleLocate}
                style={{
                  background: useLocation ? 'rgba(254, 240, 138, 0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${useLocation ? '#fef08a' : 'rgba(255,255,255,0.2)'}`,
                  color: useLocation ? '#fef08a' : '#fff',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  cursor: locationLoading ? 'wait' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: useLocation ? '0 0 15px rgba(254, 240, 138, 0.1)' : 'none'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>⌖</span>
                {locationLoading ? 'Locating...' : useLocation ? 'Sorted by Nearest' : 'Sort by Nearest'}
              </button>

              <button
                onClick={() => setShowMap(!showMap)}
                style={{
                  background: showMap ? 'rgba(254, 240, 138, 0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${showMap ? '#fef08a' : 'rgba(255,255,255,0.2)'}`,
                  color: showMap ? '#fef08a' : '#fff',
                  padding: '8px 20px',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: showMap ? '0 0 15px rgba(254, 240, 138, 0.1)' : 'none'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>◖</span>
                {showMap ? 'Hide Map' : 'Map View'}
              </button>
            </div>

          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div style={{ position: 'relative', height: '400px', marginBottom: '60px', borderRadius: '8px', overflow: 'hidden' }}>
            <MapView
              pandals={processedPandals}
              center={mapCenter || (userLat && userLng ? [userLat, userLng] : [22.5726, 88.3639])}
              zoom={mapCenter ? 15 : 13}
              height="100%"
              onPandalClick={(p) => setSelectedMapPandal(p)}
            />

            {/* Premium Map Modal Overlay */}
            {selectedMapPandal && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(26, 8, 4, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.2s ease-out'
              }}>
                <div style={{
                  background: '#2C1210',
                  border: '1px solid rgba(254, 240, 138, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  width: '100%',
                  maxWidth: '340px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}>
                  <button 
                    onClick={() => setSelectedMapPandal(null)}
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none', color: '#fff',
                      width: '28px', height: '28px', borderRadius: '50%',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: '#fef08a', fontSize: '1.4rem', marginBottom: '4px', paddingRight: '20px' }}>
                    {selectedMapPandal.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-bengali)', color: '#fbbf24', fontSize: '1.1rem', marginBottom: '12px' }}>
                    {selectedMapPandal.bengaliName}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
                    {selectedMapPandal.description.length > 100 ? selectedMapPandal.description.substring(0, 100) + '...' : selectedMapPandal.description}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {selectedMapPandal.distanceKm !== undefined ? (
                      <span style={{ background: 'rgba(254, 240, 138, 0.1)', color: '#fef08a', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {selectedMapPandal.distanceKm.toFixed(1)} km away
                      </span>
                    ) : <span></span>}
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMapPandal.lat},${selectedMapPandal.lng}`}
                      target="_blank" rel="noreferrer"
                      style={{
                        background: '#D90429', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none'
                      }}
                    >
                      Directions ↗
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* List View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {displayedPandals.map((pandal, i) => (
            <div key={pandal.id} className="stagger-fade-in-up" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '32px',
              borderBottom: i < displayedPandals.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              paddingBottom: i < displayedPandals.length - 1 ? '32px' : '0',
              animationDelay: `${i * 0.05}s`
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: '#fef08a',
                fontWeight: 700,
                paddingTop: '4px',
                userSelect: 'none'
              }}>
                {(i + 1).toString().padStart(2, '0')}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', marginBottom: '12px', lineHeight: 1.1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pandal.name}</span>
                  <span style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'normal', marginTop: '2px' }}>{pandal.bengaliName}</span>
                </h3>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fef08a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {pandal.region.replace('-', ' ')}
                  </span>
                  {pandal.distanceKm !== undefined && (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                      • {pandal.distanceKm.toFixed(1)} km away
                    </span>
                  )}
                </div>

                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', marginBottom: '32px', lineHeight: 1.65 }}>
                  {pandal.description}
                </p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#000',
                      background: '#fef08a',
                      padding: '8px 20px',
                      borderRadius: '24px',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    ↗ Directions
                  </a>
                  <button
                    onClick={() => {
                      setMapCenter([pandal.lat, pandal.lng]);
                      setShowMap(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: '#fff',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      padding: '8px 20px',
                      borderRadius: '24px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    <span style={{ fontSize: '1.1rem' }}>◖</span> View in Map
                  </button>
                </div>
              </div>
            </div>
          ))}

          {displayedPandals.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontSize: '1.2rem' }}>
              No pandals found.
            </div>
          )}
        </div>

        {/* View More */}
        {visibleCount < processedPandals.length && (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <button
              onClick={() => setVisibleCount(prev => prev + 5)}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.5)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              Load More ↓
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
