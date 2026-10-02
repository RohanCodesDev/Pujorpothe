'use client';

import Image from 'next/image';

export default function IntroSection() {
  return (
    <section
      id="intro"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Uniform smooth black-red gradient (mostly black)
        background: 'linear-gradient(175deg, #2a0508 0%, #1c0305 22%, #100102 48%, #060001 72%, #000000 100%)',
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
      {/* Background Mandala */}
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
        <Image
          src="/mandaka.svg"
          alt="Decorative Mandala"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Durga Silhouette Image with Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.2,
        mixBlendMode: 'screen'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '800px',
          maxHeight: '800px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
        }}>
          <Image
            src="/images/durga_full_silhouette.jpg"
            alt="Maa Durga Full Silhouette"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Hero Text Logo */}
      <div style={{
        position: 'absolute',
        top: '-20vh', // Explicitly placed right at the top
        zIndex: 10,
        width: '100%',
        maxWidth: '750px',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeInUp 1.2s ease 0.2s both',
      }}>
        <Image
          src="/pujorpothe.svg"
          alt="পুজোর পথে"
          width={750}
          height={225}
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.15)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.6))'
          }}
          priority
        />
      </div>

      {/* Wish Text & Credit */}
      <div style={{
        position: 'absolute',
        top: '45vh', // Pushed further down to avoid overlap
        zIndex: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 24px',
        animation: 'fadeInUp 1.2s ease 0.4s both',
      }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(254, 240, 138, 0.9)', // Light yellow color
            fontSize: '1.05rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            May Maa Durga's arrival fill your days with light, strength, and joy.<br />
            As the dhak echoes and the city comes alive,<br />
            may this Puja bring you closer to the people and moments you cherish.
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            color: 'rgba(255, 255, 255, 0.95)', // White color
            fontSize: '1.8rem',
            letterSpacing: '0.04em',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            fontStyle: 'italic',
            marginTop: '0.75rem',
            textAlign: 'center'
          }}>
            Shubho Sharodiya.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <button className="glass-btn">
              Start hopping
            </button>
          </div>
        </div>
      </div>

      {/* Credit Footer */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        width: '100%',
        textAlign: 'center',
        zIndex: 10,
        animation: 'fadeInUp 1s ease 0.6s both',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          color: '#fef08a', // Light yellow color
          fontSize: '0.85rem',
          letterSpacing: '0.05em',
        }}>
          Made with love by RohanCodesDev
        </p>
      </div>

      {/* Flower Illustration */}
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '-200px',
        width: '650px',
        height: '650px',
        opacity: 0.09,
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <Image
          src="/flowerillustration.svg"
          alt="Decorative Flower"
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom left' }}
        />
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
        .glass-btn {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          padding: 12px 32px;
          border-radius: 30px;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          color: #fff;
        }
        .glass-btn:active {
          transform: translateY(1px);
        }
      `}</style>
    </section>
  );
}
