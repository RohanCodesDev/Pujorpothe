import Image from 'next/image';
import Link from 'next/link';
import { imageMap } from '@/lib/data';

export const metadata = {
  title: 'About — পুজোর পথে',
  description: 'About the Pujor Pathe project — a digital journey through Bengal during Durga Puja.',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', paddingTop: 'var(--nav-height)' }}>

      {/* Hero */}
      <div style={{
        position: 'relative',
        height: 480,
        overflow: 'hidden',
      }}>
        <Image
          src={imageMap.hero}
          alt="Durga Puja"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(42,36,32,0.5) 0%, rgba(42,36,32,0.9) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 'clamp(36px, 7vw, 72px)',
            color: '#fff',
            marginBottom: 12,
          }}>
            পুজোর পথে
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--gold)',
            fontStyle: 'italic',
            marginBottom: 16,
          }}>
            A Digital Journey Through Bengal During Durga Puja
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 560,
            lineHeight: 1.7,
          }}>
            Culture · Exploration · Navigation
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="section" style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Mission */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            color: 'var(--charcoal)',
            marginBottom: 20,
          }}>
            Our Mission
          </h2>
          <div className="alpana-divider" style={{ maxWidth: 280, margin: '0 auto 24px' }}>
            <span className="alpana-divider-center">✦</span>
          </div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: 'var(--charcoal-light)',
            lineHeight: 1.9,
          }}>
            পুজোর পথে is not just a pandal-finder. It is a <strong>digital journey</strong> through Bengal 
            during Durga Puja — blending culture, exploration, and navigation into one experience.
            We want every person, wherever they are, to be able to discover the magic of Kolkata's 
            greatest festival.
          </p>
        </div>

        {/* Values grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
          marginBottom: 72,
        }}>
          {[
            {
              icon: '🌺',
              title: 'Culture First',
              bengali: 'সংস্কৃতি',
              body: 'Every pandal has a story. We tell those stories — the history, the artistry, the tradition behind each celebration.',
            },
            {
              icon: '🗺️',
              title: 'Exploration',
              bengali: 'অন্বেষণ',
              body: 'From heritage lanes of North Kolkata to modern installations of New Town, discover every corner of Puja.',
            },
            {
              icon: '🧭',
              title: 'Navigation',
              bengali: 'পথপ্রদর্শন',
              body: 'Plan your route, build your trail, and navigate between pandals — all within the website.',
            },
            {
              icon: '✨',
              title: 'Community',
              bengali: 'সমাজ',
              body: 'Puja is for everyone. We celebrate the collective joy of a city that transforms together, every autumn.',
            },
          ].map(item => (
            <div key={item.title} style={{
              background: 'var(--warm-white)',
              border: '1px solid var(--ivory-dark)',
              borderRadius: 16,
              padding: 28,
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-bengali)', fontSize: 13, color: 'var(--vermilion)', marginBottom: 4 }}>
                {item.bengali}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                color: 'var(--charcoal)',
                marginBottom: 10,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--charcoal-light)',
                lineHeight: 1.7,
              }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div style={{
          textAlign: 'center',
          padding: '48px 40px',
          background: 'var(--charcoal)',
          borderRadius: 20,
          marginBottom: 72,
        }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 'clamp(22px, 4vw, 36px)',
            color: '#fff',
            lineHeight: 1.5,
            marginBottom: 16,
          }}>
            এই শহর পুজোয় বদলে যায়।
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--gold)',
            fontStyle: 'italic',
          }}>
            This city transforms during Puja.
          </div>
        </div>

        {/* The Visual Language */}
        <div style={{ marginBottom: 72 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            color: 'var(--charcoal)',
            marginBottom: 20,
            textAlign: 'center',
          }}>
            Our Visual Language
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {[
              { element: 'Maa Durga\'s Eyes', description: 'Subtle motif in our logo and design system — the divine gaze', color: 'var(--vermilion)' },
              { element: 'Shiuli Flowers', description: 'The small white flowers that mark the arrival of Puja season', color: 'var(--gold)' },
              { element: 'Alpana Patterns', description: 'Traditional floor art patterns woven through our backgrounds', color: 'var(--muted-green)' },
              { element: 'Curved Paths', description: 'Representing পথে — the journey and navigation at our heart', color: 'var(--charcoal)' },
            ].map(item => (
              <div key={item.element} style={{
                padding: '20px',
                background: 'var(--warm-white)',
                border: `2px solid ${item.color}`,
                borderRadius: 12,
                borderTop: `4px solid ${item.color}`,
              }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  color: item.color,
                  marginBottom: 8,
                }}>
                  {item.element}
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--charcoal-light)',
                  lineHeight: 1.6,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--font-bengali)',
            fontSize: 28,
            color: 'var(--charcoal)',
            marginBottom: 16,
          }}>
            আসুন, পুজো দেখতে যাই।
          </div>
          <Link href="/explore" className="btn-primary" style={{ fontSize: 16, padding: '16px 40px' }}>
            Start Exploring →
          </Link>
        </div>
      </div>
    </div>
  );
}
