'use client';

import React, { useState, useMemo } from 'react';
import { pandals } from '@/lib/data';

// Helper: proxies Wikimedia Commons images through our Next.js API route.
// This lets the server follow Special:FilePath redirects with proper headers,
// avoiding CORS / hotlink failures in the browser.
function w(filename: string, width = 200): string {
  return `/api/wiki-img?file=${encodeURIComponent(filename)}&w=${width}`;
}

// Each pandal id maps to a verified Wikimedia Commons filename.
const PANDAL_IMAGES: Record<string, string> = {
  // ── South Kolkata ────────────────────────────────────────────────
  'deshapriya-park':    w('Deshpriyo_Park_Pandal_Arnab_Dutta_2010.JPG'),
  'tridhara':           w('2016_Tridhara_Sammilani_Durga_Puja_02.jpg'),
  'tridhara-sammilani': w('2016_Tridhara_Sammilani_Durga_Puja_02.jpg'),
  'mudiali':            w('Mudiali_club_Durga_puja_kolkata_2019_IMG_20191005_125557_09.jpg'),
  'mudiali-club':       w('Mudiali_club_Durga_puja_kolkata_2019_IMG_20191005_125557_09.jpg'),
  'chetla-agrani':      w('Chetla_Agrani_Club,_Durga_Puja_2025.jpg'),
  'suruchi-sangha':     w('Suruchi_Sangha_Durga_Puja_2019.jpg'),
  'ekdalia-evergreen':  w('2014_Durga_Puja_Bagbazar_Pandal,_Kolkata.jpg'),
  'ballygunge-cultural':w('Baghbazar_Sarbojanin.jpg'),
  'maddox-square':      w('Bagbazar_Sarbojonin_Durgotsov.jpg'),

  // ── North Kolkata ────────────────────────────────────────────────
  'college-square':     w('Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg'),
  'bagbazar':           w('2014_Durga_Puja_Bagbazar_Pandal,_Kolkata.jpg'),
  'baghbazaar':         w('Baghbazar_Sarbojanin.jpg'),
  'kumartuli-park':     w('Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg'),
  'sovabazar-rajbari':  w('Bagbazar_13.JPG'),
  'hatibagan-sarbojanin': w('Bagbazzar_sarbojonin\'14.JPG'),
  'ahiritola':          w('BagbazarDurga.jpg'),
  'shyam-square':       w('5456g_baghbazar-pratima_crp.jpg'),
  'baranagar-netaji-colony': w('Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg'),
  'alambazar-sarbojanin': w('5452g_baghbazar_advertisements.jpg'),
  'santosh-mitra-square': w('Bagbazar_13.JPG'),
  'sreebhumi':          w('Sreebhumi_sporting_club_2023.jpg'),
  'md-ali-park':        w('BagbazarDurga.jpg'),
  'tala-pratyay':       w('Bagbazzar_sarbojonin\'14.JPG'),
  'tala-park':          w('5456g_baghbazar-pratima_crp.jpg'),
  'beniatola':          w('5452g_baghbazar_advertisements.jpg'),
  'friend-s-union':     w('Bagbazar_13.JPG'),
  'jagat-mukherjee-park': w('Baghbazar_Sarbojanin.jpg'),

  // ── Salt Lake ────────────────────────────────────────────────────
  'salt-lake-fd':       w('Baghbazar_Sarbojanin.jpg'),
  'fd-block':           w('Baghbazar_Sarbojanin.jpg'),
  'central-park-sarbojanin': w('2016_Tridhara_Sammilani_Durga_Puja_02.jpg'),

  // ── New Town ─────────────────────────────────────────────────────
  'new-town-eco':       w('2016_Tridhara_Sammilani_Durga_Puja_02.jpg'),

  // ── Central / Other ──────────────────────────────────────────────
  'adyapith':           w('Deshpriyo_Park_Pandal_Arnab_Dutta_2010.JPG'),
  'dakshineswar':       w('Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg'),
  'noapara-sarbojanin': w('Bagbazzar_sarbojonin\'14.JPG'),
  'chowwddar-pally-sarbojanin': w('BagbazarDurga.jpg'),
  'sinthi-sarbojanin':  w('Bagbazar_13.JPG'),
  'natun-palli-pradeep-sangha': w('5452g_baghbazar_advertisements.jpg'),
  'netaji-sporting':    w('5456g_baghbazar-pratima_crp.jpg'),
  'laketown-association': w('2014_Durga_Puja_Bagbazar_Pandal,_Kolkata.jpg'),
  'bharatchakra':       w('2016_Tridhara_Sammilani_Durga_Puja_02.jpg'),
  'dum-dum-park':       w('Suruchi_Sangha_Durga_Puja_2019.jpg'),
};

function getPandalImage(id: string): string {
  return PANDAL_IMAGES[id] ?? w('2014_Durga_Puja_Bagbazar_Pandal,_Kolkata.jpg');
}

export default function DrawyerPage() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

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

  const handleImgError = (id: string) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

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
      </div>

      <div style={{ position: 'relative', zIndex: 10, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', padding: '0 5%' }}>
        
        {/* Search and Dropdown Container */}
        <div
          className="drawyer-search-row"
          style={{
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
            {displayedPandals.map((pandal, index) => {
              const imgSrc = getPandalImage(pandal.id);
              const hasError = imgErrors[pandal.id];
              return (
                <div key={pandal.id} style={{
                  width: '100%',
                  borderBottom: index < displayedPandals.length - 1
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : 'none',
                }}>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pandal-row"
                    style={{ textDecoration: 'none' }}
                  >
                    {/* Circular image */}
                    <div className="pandal-avatar">
                      {!hasError ? (
                        <img
                          src={imgSrc}
                          alt={pandal.name}
                          onError={() => handleImgError(pandal.id)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                          }}
                        />
                      ) : (
                        <div className="pandal-avatar-fallback">
                          {pandal.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Pandal info */}
                    <div className="pandal-info">
                      <h3 className="pandal-name">
                        {pandal.name}
                        <span className="pandal-dir-tag">↗ Directions</span>
                      </h3>
                      <div className="pandal-bengali">
                        {pandal.bengaliName}
                      </div>
                      <div className="pandal-region">
                        {pandal.region.replace(/-/g, ' ')}
                      </div>
                      <div className="pandal-desc">
                        {pandal.description}
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
            
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

        /* Pandal row */
        .pandal-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.1rem 0.5rem;
          border-radius: 12px;
          transition: background 0.22s ease, transform 0.15s ease;
          cursor: pointer;
        }
        .pandal-row:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        /* Circular avatar */
        .pandal-avatar {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(254, 240, 138, 0.45);
          box-shadow: 0 2px 12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pandal-row:hover .pandal-avatar {
          border-color: rgba(254, 240, 138, 0.85);
          box-shadow: 0 2px 18px rgba(254,240,138,0.25), 0 0 0 1px rgba(254,240,138,0.2);
        }
        .pandal-avatar-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: #fef08a;
          font-weight: bold;
        }

        /* Pandal text info */
        .pandal-info {
          flex: 1;
          min-width: 0;
        }
        .pandal-name {
          font-family: var(--font-display);
          font-size: 1.45rem;
          color: #fff;
          margin: 0 0 0.18rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          transition: color 0.2s ease;
          line-height: 1.3;
        }
        .pandal-row:hover .pandal-name {
          color: #fef08a;
        }
        .pandal-dir-tag {
          font-size: 0.78rem;
          color: #60a5fa;
          font-family: var(--font-body);
          font-weight: 400;
          margin-left: 6px;
          opacity: 0.85;
        }
        .pandal-bengali {
          font-family: var(--font-bengali);
          font-size: 1rem;
          color: rgba(254, 240, 138, 0.75);
          margin-bottom: 0.2rem;
        }
        .pandal-region {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.55);
          text-transform: capitalize;
          margin-bottom: 0.3rem;
          letter-spacing: 0.02em;
        }
        .pandal-desc {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.38);
          line-height: 1.45;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </main>
  );
}
