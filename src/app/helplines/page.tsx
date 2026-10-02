'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const helplines = [
  { category: 'Emergency Services', numbers: [
    { name: 'Police Assistance', num: '100 / 112' },
    { name: 'Fire Department', num: '101' },
    { name: 'Ambulance', num: '102' }
  ]},
  { category: 'Specialized Helplines', numbers: [
    { name: 'Women Helpline', num: '1091' },
    { name: 'Child Helpline', num: '1098' },
    { name: 'Senior Citizen Helpline', num: '1090' }
  ]},
  { category: 'Kolkata Specific & Puja Control', numbers: [
    { name: 'Kolkata Police Traffic Control', num: '1073' },
    { name: 'Bidhannagar Police Control Room', num: '033-2335-8788' },
    { name: 'KMC Control Room', num: '033-2286-1212' },
    { name: 'CESC (Electricity Emergency)', num: '1912' }
  ]}
];

// Mock data for major Kolkata police stations
const policeStations = [
  { name: 'Lalbazar Police Station (HQ)', lat: 22.5735, lng: 88.3512, num: '033-2214-3230' },
  { name: 'Park Street Police Station', lat: 22.5514, lng: 88.3524, num: '033-2229-3735' },
  { name: 'Jadavpur Police Station', lat: 22.4989, lng: 88.3714, num: '033-2412-9218' },
  { name: 'Bidhannagar North Police Station', lat: 22.5962, lng: 88.4116, num: '033-2334-0100' },
  { name: 'Behala Police Station', lat: 22.4950, lng: 88.3247, num: '033-2396-0177' },
  { name: 'Gariahat Police Station', lat: 22.5186, lng: 88.3664, num: '033-2464-1012' },
  { name: 'Shyampukur Police Station', lat: 22.6009, lng: 88.3661, num: '033-2555-5201' }
];

// Haversine distance formula
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HelplinesPage() {
  const [locating, setLocating] = useState(false);
  const [nearestStations, setNearestStations] = useState<Array<typeof policeStations[0] & { dist: number }> | null>(null);
  const [locationError, setLocationError] = useState('');

  const findNearestPoliceStation = () => {
    if (nearestStations) {
      // Toggle off
      setNearestStations(null);
      return;
    }

    setLocating(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Location not supported');
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Calculate distance for all stations
        const stationsWithDist = policeStations.map(ps => ({
          ...ps,
          dist: getDistanceFromLatLonInKm(latitude, longitude, ps.lat, ps.lng)
        }));

        // Sort by closest and pick top 3
        stationsWithDist.sort((a, b) => a.dist - b.dist);
        setNearestStations(stationsWithDist.slice(0, 3));
        setLocating(false);
      },
      (error) => {
        console.error(error);
        setLocationError('Please allow location access.');
        setLocating(false);
      }
    );
  };

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        padding: '120px 24px 80px',
        color: '#fff',
        fontFamily: 'var(--font-body)'
      }}>
        
        {/* Background Gradients */}
        <div style={{
          position: 'fixed',
          top: '-20%', left: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(193,57,43,0.15) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none', filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'fixed',
          bottom: '-20%', right: '-10%', width: '60vw', height: '60vw',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none', filter: 'blur(60px)'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            color: '#fef08a',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(254, 240, 138, 0.2)'
          }}>
            Important Helplines
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6
          }}>
            Stay safe during Durga Puja. Keep these essential emergency and assistance numbers handy while pandal hopping across the city.
          </p>

          {/* Location Toggle for Nearest Police Station */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4rem', gap: '16px' }}>
            <button 
              onClick={findNearestPoliceStation}
              style={{
                background: nearestStations ? 'rgba(254, 240, 138, 0.15)' : 'transparent',
                border: `1px solid ${nearestStations ? '#fef08a' : 'rgba(255,255,255,0.2)'}`,
                color: nearestStations ? '#fef08a' : 'rgba(255,255,255,0.6)',
                padding: '8px 24px',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>⌖</span>
              {locating ? 'Locating...' : nearestStations ? 'Location Active' : 'Locate Nearest Police Stations'}
            </button>
            
            {locationError && (
              <div style={{ color: '#ef4444', fontSize: '0.9rem' }}>{locationError}</div>
            )}

            {nearestStations && (
              <div style={{
                marginTop: '16px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fade-in 0.3s ease-out'
              }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '8px' }}>Your 3 nearest stations:</div>
                
                {nearestStations.map((station, i) => (
                  <div key={i} style={{
                    padding: '16px 0',
                    borderBottom: i < nearestStations.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <span style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 500 }}>
                        {station.name}
                      </span>
                      <span style={{ color: '#a3e635', fontSize: '0.95rem', fontWeight: 500 }}>
                        {station.dist.toFixed(1)} km away
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                      <a href={`tel:${station.num.replace(/[^0-9]/g, '')}`} style={{
                        color: '#fef08a',
                        textDecoration: 'none',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        transition: 'opacity 0.2s'
                      }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                        {station.num}
                      </a>
                      
                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`} target="_blank" rel="noreferrer" style={{
                        color: '#60a5fa',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'opacity 0.2s'
                      }} onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                        ↗ Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {helplines.map((section, idx) => (
              <div key={idx} style={{
                marginBottom: '1rem'
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--vermilion)',
                  marginBottom: '32px',
                  textAlign: 'center'
                }}>
                  {section.category}
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {section.numbers.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <span style={{
                        fontSize: '1.15rem',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500
                      }}>
                        {item.name}
                      </span>
                      <a href={`tel:${item.num.split(' / ')[0].replace(/[^0-9]/g, '')}`} style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        color: '#fef08a',
                        textDecoration: 'none',
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                      onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
                      >
                        {item.num}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '4rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '4rem auto 0'
          }}>
            <h3 style={{ color: 'var(--vermilion)', marginBottom: '12px', fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
              Important Tip
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
              During peak Puja days, mobile networks might be congested in crowded pandal areas. 
              Always establish a meeting point with your group beforehand in case someone gets lost.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
