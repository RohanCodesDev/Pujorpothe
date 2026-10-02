'use client';

import React, { useState, useMemo } from 'react';
import { pandals } from '@/lib/data';
import Link from 'next/link';

export default function DrawyerPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const filteredPandals = useMemo(() => {
    let result = pandals;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.bengaliName.includes(q));
    }
    if (region) {
      result = result.filter(p => p.region === region);
    }
    return result;
  }, [search, region]);

  const displayedPandals = filteredPandals.slice(0, 20); // Show top 20 matches

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        overflowX: 'hidden'
      }}
    >
      {/* Subtle deep crimson ambient wash across the viewport */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.06) 0%, rgba(136, 19, 19, 0.02) 50%, transparent 100%)',
        animation: 'pulse 8s infinite alternate ease-in-out',
        pointerEvents: 'none',
      }} />
      
      {/* Background Mandala - similar to intro but low opacity */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translate(50%, -50%)',
        width: '700px',
        height: '800px',
        opacity: 0.07,
        zIndex: 2,
        pointerEvents: 'none',
        animation: 'spin-slow 175s linear infinite',
      }}>
        {/* We can omit the image here or use a plain div, the user requested "without maa dura sbg", so we kept the mandala but removed the Durga silhouette. */}
      </div>

      <div style={{ position: 'relative', zIndex: 10, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', padding: '0 5%' }}>
        
        {/* Search and Dropdown Container */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          marginBottom: '4rem'
        }}>
          <input 
            type="text" 
            placeholder="Search pandals..." 
            className="glass-input search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select 
            className="glass-input dropdown" 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="north-kolkata">North Kolkata</option>
            <option value="south-kolkata">South Kolkata</option>
            <option value="central-kolkata">Central Kolkata</option>
            <option value="salt-lake">Salt Lake</option>
            <option value="new-town">New Town</option>
          </select>
        </div>

        {/* Top Pandals List */}
        <div style={{ width: '100%' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            color: '#fef08a',
            marginBottom: '2rem',
            textAlign: 'left',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}>
            Top Pandals to Visit
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            {displayedPandals.map((pandal, index) => (
              <div key={pandal.id} style={{ 
                width: '100%',
                borderBottom: index < displayedPandals.length - 1 ? '1px solid rgba(255, 255, 255, 0.15)' : 'none',
                paddingBottom: index < displayedPandals.length - 1 ? '1.5rem' : '0'
              }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}`} 
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: '#fff',
                    marginBottom: '0.25rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fef08a'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {pandal.name} <span style={{ fontSize: '1rem', color: '#60a5fa', marginLeft: '10px' }}>↗ Directions</span>
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-bengali)',
                    fontSize: '1.1rem',
                    color: 'rgba(254, 240, 138, 0.8)',
                    marginBottom: '0.5rem'
                  }}>
                    {pandal.bengaliName}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'capitalize'
                  }}>
                    {pandal.region.replace('-', ' ')}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    marginTop: '0.5rem',
                    lineHeight: '1.5'
                  }}>
                    {pandal.description}
                  </div>
                </a>
              </div>
            ))}
            
            {displayedPandals.length === 0 && (
              <div style={{ padding: '2rem 0', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>
                No pandals found. Try adjusting your search or region.
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: translate(50%, -50%) rotate(0deg); }
          to { transform: translate(50%, -50%) rotate(360deg); }
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 14px 24px;
          color: white;
          font-family: var(--font-body);
          font-size: 1.05rem;
          outline: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .search-box {
          flex: 2 1 250px;
        }
        .dropdown {
          flex: 1 1 200px;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        .glass-input:focus {
          border-color: rgba(254, 240, 138, 0.6);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
        }
        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .glass-input option {
          background: #1c0305;
          color: white;
          padding: 10px;
        }
      `}</style>
    </main>
  );
}
