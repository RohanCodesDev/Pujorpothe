'use client';

import React, { useState } from 'react';
import { pandals } from '@/lib/data';

export const blueLineStops = [
  { stop: "Dakshineswar", pandals: ["Adyapith", "Dakshineswar"] },
  { stop: "Baranagar", pandals: ["Baranagar Netaji Colony", "Alambazar Sarbojanin"] },
  { stop: "Noapara", pandals: ["Noapara Sarbojanin"] },
  { stop: "Dum Dum", pandals: ["Chowwddar Pally Sarbojanin", "Sinthi Sarbojanin"] },
  { stop: "Belgachia", pandals: ["Tala Pratyay", "Tala Park", "Natun Palli Pradeep Sangha", "Netaji Sporting", "Laketown Association", "Bharatchakra", "Dum Dum Park", "Sreebhumi"] },
  { stop: "Shyambazar", pandals: ["Baghbazaar", "Shyam Square", "Friend's Union", "Jagat Mukherjee Park"] },
  { stop: "Sovabazar Sutanuti", pandals: ["Ahiritola", "Beniatola", "Kumartuli Park", "Sovabazar Rajbari", "Hatibagan Sarbojanin", "Telenga Bagan", "Chaltabagan"] },
  { stop: "Girish Park", pandals: ["Bedon Square", "Shimla Bayam Samity", "37 Pally", "Vivekananda Sporting", "Rabindra Kanan", "Pathuriaghata Pather Panchali"] },
  { stop: "Mahatma Gandhi Road", pandals: ["Md. Ali Park", "College Square", "Sealdah Railway Square Athletic Club"] },
  { stop: "Central", pandals: ["Santosh Mitra Square", "Subodh Mullick Square", "Kapalitola"] },
  { stop: "Chandni Chowk", pandals: ["Janbazar", "Taltola Sarbojanin"] },
  { stop: "Esplanade", pandals: ["Santosh Mitra Square (via walk)", "Muhammad Ali Park"] },
  { stop: "Park Street", pandals: ["Park Circus Sarbojanin (via auto)"] },
  { stop: "Maidan", pandals: ["Khidirpur 25 Pally (via auto)"] },
  { stop: "Rabindra Sadan", pandals: ["Ghorkel Sporting", "Chakraberja Sarbojanin"] },
  { stop: "Netaji Bhawan", pandals: ["Harish Park", "22 Pally", "Padmapukur Youth Association", "Paddapukur Barwari Samiti", "Bhawanipur Durgotsav", "75 Pally", "Maddox Square", "76 Pally", "Ray Street Park", "Bhawanipur Swadhin Sangha"] },
  { stop: "Jatin Das Park", pandals: ["Badamtala", "23 Pally", "Forward Club", "Matri Mandir", "Bakul Bagan Sarbojanin Durgotsav"] },
  { stop: "Kalighat", pandals: ["Deshapriya Park", "Badamtala Ashar Sangha", "Samajsebi", "Ballygunge Cultural", "Ekdalia Evergreen", "Singhi Park", "Adi Lake Pally"] },
  { stop: "Rabindra Sarobar", pandals: ["Mudiali Club", "Shib Mandir", "Tridhara Sammilani", "Suruchi Sangha (via auto)"] },
  { stop: "Mahanayak Uttam Kumar", pandals: ["Chetla Agrani", "Babu Bagan", "Jodhpur Park"] },
  { stop: "Netaji", pandals: ["Kudghat Pratirodh Sangha"] },
  { stop: "Masterda Surya Sen", pandals: ["Maitree Park Sarbojanin", "Roynagar Unnayan Samity"] },
  { stop: "Gitanjali", pandals: ["Udayan Sangha"] },
  { stop: "Kavi Nazrul", pandals: ["Pancha Durga Sarbojanin Durgotsav", "Naba Durga Sarbojanin Durgotsav"] },
  { stop: "Shahid Khudiram", pandals: ["Briji Sarbojanin"] },
  { stop: "Kavi Subhash", pandals: ["Naktala Udayan Sangha", "Baisakhi Sangha"] }
];

export const greenLineStops = [
  { stop: "Howrah Maidan", pandals: ["Howrah Maidan Sarbojanin"] },
  { stop: "Howrah", pandals: ["Howrah Railway Club"] },
  { stop: "Mahakaran", pandals: ["Lalbazar Police Line"] },
  { stop: "Esplanade", pandals: ["Janbazar (walking distance)"] },
  { stop: "Sealdah", pandals: ["Sealdah Athletic Club", "Santosh Mitra Square", "Chaltabagan (via walk)"] },
  { stop: "Phoolbagan", pandals: ["Phoolbagan Sarbojanin", "Beleghata Sandhani", "Beleghata 33 Pally", "Mitali Kankurgachi"] },
  { stop: "Salt Lake Stadium", pandals: ["FD Block", "FC Block"] },
  { stop: "Bengal Chemical", pandals: ["CG Block", "BC Block"] },
  { stop: "City Centre", pandals: ["DC Block", "CA Block"] },
  { stop: "Central Park", pandals: ["Central Park Sarbojanin", "AE Block Part 1"] },
  { stop: "Karunamoyee", pandals: ["BJ Block", "AK Block", "AG Block"] },
  { stop: "Salt Lake Sector V", pandals: ["Mahisbathan Sarbojanin"] }
];

export const orangeLineStops = [
  { stop: "Hemanta Mukhopadhyay (Ruby)", pandals: ["Rajdanga Naba Uday Sangha", "Bosepukur Sitala Mandir", "Bosepukur Talbagan", "Kasba Shakti Sangha"] },
  { stop: "Kavi Sukanta (Kalikapur)", pandals: ["Kalikapur Sarbojanin", "Purbachal"] },
  { stop: "Jyotirindra Nandi (Metro Cash & Carry)", pandals: ["Mukundapur Sarbojanin"] },
  { stop: "Satyajit Ray (Hiland Park)", pandals: ["Survey Park", "Santoshpur Lake Pally"] },
  { stop: "Kavi Subhash", pandals: ["Naktala Udayan Sangha", "Baisakhi Sangha"] }
];

export const purpleLineStops = [
  { stop: "Joka", pandals: ["Joka Sarbojanin"] },
  { stop: "Thakurpukur", pandals: ["Thakurpukur State Bank Park"] },
  { stop: "Sakher Bazar", pandals: ["Behala Friends", "Barisha Youth Club"] },
  { stop: "Behala Chowrasta", pandals: ["Behala Nutan Dal", "Barisha Sarbojanin", "Barisha Club"] },
  { stop: "Behala Bazar", pandals: ["Behala Club", "Srishti", "Behala 29 Pally"] },
  { stop: "Taratala", pandals: ["Ajeya Sangha"] },
  { stop: "Majerhat", pandals: ["Suruchi Sangha", "Alipore Sarbojanin"] }
];

function generateDirections(pandalName: string, stationName: string): string[] {
  const nameLow = pandalName.toLowerCase();
  
  if (nameLow.includes('walk')) return [`Exit ${stationName} Metro Station`, `Walk directly towards ${pandalName.replace(/\(.*\)/, '').trim()}`, `Approximate walking time: 5-10 mins`];
  if (nameLow.includes('auto')) return [`Exit ${stationName} Metro Station`, `Take a shared auto or toto`, `Tell the driver you're heading to ${pandalName.replace(/\(.*\)/, '').trim()}`];
  
  if (nameLow.includes('sreebhumi') || nameLow.includes('sree bhumi')) return [`Exit ${stationName} Metro`, `Take an auto or bus to Lake Town clock tower`, `Follow the crowd walking towards the pandal`];
  if (nameLow.includes('baghbazaar')) return [`Exit ${stationName} Metro`, `Walk 10 mins towards Baghbazar Ghat`, `The pandal is located near the riverbank`];
  if (nameLow.includes('college square')) return [`Exit ${stationName} Metro`, `Walk 5-10 mins towards Calcutta University`, `The pandal is located inside the square`];
  if (nameLow.includes('singhi park') || nameLow.includes('ekdalia') || nameLow.includes('ballygunge')) return [`Exit ${stationName} Metro`, `Take an auto towards Gariahat crossing`, `Walk 2-3 mins to the respective pandal`];
  if (nameLow.includes('suruchi')) return [`Exit ${stationName} Metro`, `Take an auto towards New Alipore petrol pump`, `Walk 2 mins to the pandal`];
  if (nameLow.includes('mudiali') || nameLow.includes('shib mandir')) return [`Exit ${stationName} Metro`, `Walk 5-7 mins towards mudiali crossing`, `Both pandals are adjacent to each other`];
  if (nameLow.includes('chetla')) return [`Exit ${stationName} Metro`, `Take an auto towards Chetla bridge`, `Walk 5 mins into the neighborhood`];

  return [
    `Exit ${stationName} Metro Station`,
    `Take a local auto-rickshaw or toto to ${pandalName.replace(/\(.*\)/, '').trim()}`,
    `Travel time is usually 10-15 minutes depending on crowd`
  ];
}

export default function MetroGuidePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedPandal, setSelectedPandal] = useState<{name: string, description: string, station: string, instructions: string[]} | null>(null);

  const openModal = (pandalName: string, stationName: string) => {
    const found = pandals.find(p => p.name === pandalName);
    setSelectedPandal({
      name: pandalName.replace(/\s*\(.*\)/, '').trim(),
      description: found?.description || 'A vibrant Durga Puja celebration known for its deep community roots and festive spirit.',
      station: stationName,
      instructions: generateDirections(pandalName, stationName)
    });
  };

  const metroData = {
    blue: { 
      id: 'blue', name: 'Blue Line', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)', 
      description: "The historic backbone of Kolkata. Connects the legendary, traditional North Kolkata pujas all the way down to the extravagant crowd-pullers of the South.",
      stops: blueLineStops 
    },
    green: { 
      id: 'green', name: 'Green Line', color: '#22c55e', glow: 'rgba(34, 197, 94, 0.4)', 
      description: "The East-West corridor. Your fastest route to the spectacular thematic pandals of Salt Lake, Phoolbagan, and Howrah.",
      stops: greenLineStops 
    },
    orange: { 
      id: 'orange', name: 'Orange Line', color: '#f97316', glow: 'rgba(249, 115, 22, 0.4)', 
      description: "The modern bypass route. Discover the rapidly growing, artistic powerhouse pujas sprawling across Kasba, Mukundapur, and Santoshpur.",
      stops: orangeLineStops 
    },
    purple: { 
      id: 'purple', name: 'Purple Line', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', 
      description: "The gateway to the deep South. Explore the intricate, community-driven marvels of Behala, Barisha, and Taratala.",
      stops: purpleLineStops 
    },
  };

  const lineKeys = Object.keys(metroData) as (keyof typeof metroData)[];
  const activeLine = lineKeys[activeIndex];
  const current = metroData[activeLine];

  const prevIndex = (activeIndex - 1 + lineKeys.length) % lineKeys.length;
  const nextIndex = (activeIndex + 1) % lineKeys.length;
  
  const prevLine = metroData[lineKeys[prevIndex]];
  const nextLine = metroData[lineKeys[nextIndex]];

  const handlePrev = () => { setDirection(-1); setActiveIndex(prevIndex); };
  const handleNext = () => { setDirection(1); setActiveIndex(nextIndex); };

  // Swipe handlers for mobile immersion
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) handleNext(); // Swiped left -> next
    if (distance < -50) handlePrev(); // Swiped right -> prev
  };

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + 60px)',
        paddingBottom: '6rem',
        overflowX: 'hidden'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 24px', zIndex: 10, position: 'relative' }}>
        
        {/* Interactive Carousel Header */}
        <div 
          className="metro-header"
          style={{ marginBottom: '60px', textAlign: 'center', userSelect: 'none', touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '0.5rem',
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
          }}>
            
            {/* Left Faded Name */}
            <div 
              className="metro-prev-name"
              key={`prev-${current.id}`}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.3,
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: prevLine.color,
                whiteSpace: 'nowrap',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                maskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
                pointerEvents: 'none',
                paddingLeft: '1rem',
                animation: `${direction > 0 ? 'slide-right-in' : 'slide-left-in'} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`
              }}
            >
              {prevLine.name}
            </div>

            {/* Left Arrow */}
            <button 
               onClick={handlePrev} 
               style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '3rem', cursor: 'pointer', transition: 'color 0.3s ease, transform 0.2s ease', padding: '0 10px', zIndex: 10 }}
               onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
               onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
               &#8249;
            </button>

            {/* Active Line Name */}
            <h1 
              key={current.id}
              style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4.5rem',
              color: current.color,
              lineHeight: 1.1,
              margin: 0,
              textShadow: `0 2px 20px ${current.glow}`,
              minWidth: '300px',
              zIndex: 10,
              animation: `${direction > 0 ? 'slide-right-in' : 'slide-left-in'} 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`
            }}>
              {current.name}
            </h1>

            {/* Right Arrow */}
            <button 
               onClick={handleNext} 
               style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '3rem', cursor: 'pointer', transition: 'color 0.3s ease, transform 0.2s ease', padding: '0 10px', zIndex: 10 }}
               onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
               onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
               &#8250;
            </button>

            {/* Right Faded Name */}
            <div 
              className="metro-next-name"
              key={`next-${current.id}`}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.3,
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: nextLine.color,
                whiteSpace: 'nowrap',
                WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
                maskImage: 'linear-gradient(to left, transparent 0%, black 100%)',
                pointerEvents: 'none',
                paddingRight: '1rem',
                animation: `${direction > 0 ? 'slide-right-in' : 'slide-left-in'} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`
              }}
            >
              {nextLine.name}
            </div>
            
          </div>

          <p 
            key={`desc-${current.id}`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
              animation: 'fade-slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}>
            {current.description}
          </p>
        </div>

        {/* Timeline */}
        <div key={`timeline-${current.id}`} className="metro-gap" style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fade-slide-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}>
          {current.stops.map((station, index) => (
            <div key={station.stop} style={{ display: 'flex', gap: '32px' }}>
              
              {/* Stop Indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#060001',
                  border: `5px solid ${current.color}`,
                  zIndex: 2,
                  boxShadow: `0 0 15px ${current.glow}`,
                  transition: 'all 0.3s ease'
                }} />
                {index !== current.stops.length - 1 && (
                  <div style={{
                    width: '4px',
                    flex: 1,
                    background: current.color,
                    marginTop: '8px',
                    marginBottom: '-16px', // pull into gap
                    opacity: 0.8,
                    borderRadius: '4px',
                    transition: 'background 0.3s ease'
                  }} />
                )}
              </div>

              {/* Station Content */}
              <div style={{ flex: 1, paddingBottom: '32px' }}>
                <h3 className="metro-station-name" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  color: '#fff',
                  marginBottom: '20px',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {station.stop}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {station.pandals.map((pandal, pIdx) => (
                    <div key={pandal} 
                    onClick={() => openModal(pandal, station.stop)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = current.color;
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    >
                      <span style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.3rem', 
                        color: 'rgba(255,255,255,0.2)', 
                        fontWeight: 600,
                        userSelect: 'none',
                        width: '24px' // Ensures consistent alignment
                      }}>
                        {(pIdx + 1).toString().padStart(2, '0')}
                      </span>
                      {pandal}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Pandal Modal */}
      {selectedPandal && (
        <div className="modal-center" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px',
          animation: 'fade-in 0.2s ease-out'
        }}
        onClick={() => setSelectedPandal(null)}
        >
          <div className="metro-modal-inner" style={{
            background: '#0a0a0a',
            border: `1px solid ${current.color}`,
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '450px',
            width: '100%',
            position: 'relative',
            boxShadow: `0 10px 40px ${current.glow}`,
            animation: 'slide-up-modal 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
             <button 
               onClick={() => setSelectedPandal(null)}
               style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '1.5rem', cursor: 'pointer', transition: 'color 0.2s' }}
               onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
               onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
             >
               ✕
             </button>
             
             <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1, paddingRight: '20px' }}>
               {selectedPandal.name}
             </h2>

             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                <span style={{ color: current.color, fontSize: '1.2rem' }}>🚇</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: current.color, fontWeight: 600 }}>
                  Nearest Metro: {selectedPandal.station}
                </span>
             </div>
             
             <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedPandal.description}
             </p>

             {/* How to get there */}
             <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff', marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>How to get there</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedPandal.instructions.map((step, idx) => (
                    <li key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                      {step}
                    </li>
                  ))}
                </ul>
             </div>
             
             <div style={{ display: 'flex', gap: '12px' }}>
               <a 
                 href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPandal.name + ' durga puja kolkata')}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                   display: 'flex',
                   flex: 1,
                   alignItems: 'center',
                   justifyContent: 'center',
                   gap: '8px',
                   background: '#fff',
                   color: '#000',
                   padding: '14px',
                   borderRadius: '100px',
                   fontFamily: 'var(--font-body)',
                   fontWeight: 600,
                   fontSize: '1rem',
                   textDecoration: 'none',
                   transition: 'opacity 0.2s',
                 }}
                 onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                 onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
               >
                 Get Directions ↗
               </a>
               
               <button 
                 onClick={() => setSelectedPandal(null)}
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   background: 'transparent',
                   border: '1px solid rgba(255,255,255,0.2)',
                   color: '#fff',
                   padding: '0 24px',
                   borderRadius: '100px',
                   fontFamily: 'var(--font-body)',
                   fontWeight: 600,
                   fontSize: '1rem',
                   cursor: 'pointer',
                   transition: 'border-color 0.2s'
                 }}
                 onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
                 onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
               >
                 Close
               </button>
             </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-right-in {
          0% { transform: translateX(50px); opacity: 0; filter: blur(5px); }
          100% { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        @keyframes slide-left-in {
          0% { transform: translateX(-50px); opacity: 0; filter: blur(5px); }
          100% { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        @keyframes fade-slide-up {
          0% { transform: translateY(20px); opacity: 0; filter: blur(3px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slide-up-modal {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
