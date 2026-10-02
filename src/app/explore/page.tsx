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
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setUseLocation(true);
        setLocationLoading(false);
        // Reset visibility to top 5 when location changes
        setVisibleCount(5);
      },
      () => {
        alert('Location access denied or unavailable.');
        setLocationLoading(false);
      }
    );
  };

  const processedPandals = useMemo(() => {
    let result = [...pandals];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.bengaliName.includes(q));
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
    }}>
      <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '0 24px', zIndex: 10 }}>
        
        {/* Header & Immersive Search */}
        <div style={{ marginBottom: '60px' }}>
          <input 
            type="text" 
            placeholder="Search pandals..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              outline: 'none',
              padding: '0',
              marginBottom: '24px',
              lineHeight: 1
            }}
          />
          
          {/* Controls (Filters & Actions) - purely text based, no borders */}
          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.6)'
          }}>
            
            {/* Filter Dropdowns styled as inline text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Show</span>
              <select 
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value as 'region' | 'metro');
                  setSelectedFilterValue('all');
                }}
                style={{
                  appearance: 'none', WebkitAppearance: 'none',
                  background: 'transparent', border: 'none', color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', cursor: 'pointer',
                  paddingRight: '16px',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='rgba(255,255,255,0.5)' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right center'
                }}
              >
                <option value="region" style={{ background: '#111' }}>regions</option>
                <option value="metro" style={{ background: '#111' }}>metro lines</option>
              </select>
              
              <span>:</span>
              <select 
                value={selectedFilterValue}
                onChange={(e) => setSelectedFilterValue(e.target.value)}
                style={{
                  appearance: 'none', WebkitAppearance: 'none',
                  background: 'transparent', border: 'none', color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', cursor: 'pointer',
                  paddingRight: '16px',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='rgba(255,255,255,0.5)' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'right center'
                }}
              >
                <option value="all" style={{ background: '#111' }}>All</option>
                {filterType === 'region' 
                  ? regions.map(r => <option key={r.id} value={r.id} style={{ background: '#111' }}>{r.name}</option>)
                  : metroLines.map(m => <option key={m} value={m} style={{ background: '#111' }}>{m}</option>)
                }
              </select>
            </div>

            {/* Action Links */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <span 
                onClick={handleLocate}
                style={{
                  color: useLocation ? '#fef08a' : 'inherit',
                  cursor: locationLoading ? 'wait' : 'pointer',
                  transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
                onMouseOver={(e) => { if(!useLocation) e.currentTarget.style.color = '#fff'; }}
                onMouseOut={(e) => { if(!useLocation) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                <span style={{ fontSize: '1.2rem' }}>⌖</span>
                {locationLoading ? 'Locating...' : useLocation ? 'Sorted by Nearby' : 'Near Me'}
              </span>

              <span 
                onClick={() => setShowMap(!showMap)}
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', gap: '6px'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >
                <span style={{ fontSize: '1.2rem' }}>◖</span>
                {showMap ? 'Hide Map' : 'Map View'}
              </span>
            </div>
            
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div style={{ height: '400px', marginBottom: '60px', borderRadius: '8px', overflow: 'hidden' }}>
             <MapView
              pandals={processedPandals}
              center={userLat && userLng ? [userLat, userLng] : [22.5726, 88.3639]}
              zoom={13}
              height="100%"
            />
          </div>
        )}

        {/* List View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {displayedPandals.map((pandal, i) => (
              <div key={pandal.id} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '32px'
              }}>
                <div style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '1.2rem', 
                  color: 'rgba(255,255,255,0.2)', 
                  paddingTop: '8px',
                  userSelect: 'none' 
                }}>
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', marginBottom: '4px', lineHeight: 1.1 }}>
                    {pandal.name} 
                    <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)', marginLeft: '12px', fontWeight: 'normal' }}>{pandal.bengaliName}</span>
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#fef08a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {pandal.region.replace('-', ' ')}
                    </span>
                    {pandal.distanceKm !== undefined && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                        • {pandal.distanceKm.toFixed(1)} km away
                      </span>
                    )}
                  </div>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '650px', marginBottom: '24px', lineHeight: 1.6 }}>
                    {pandal.description}
                  </p>
                  
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: '#fff',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'opacity 0.2s',
                      opacity: 0.8
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}
                  >
                    Directions ↗
                  </a>
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
