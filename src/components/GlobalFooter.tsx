'use client';

import { usePathname } from 'next/navigation';

export default function GlobalFooter() {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }

  return (
    <footer style={{
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'var(--font-display)',
      fontSize: '1.2rem',
      color: '#fef08a',
      background: 'transparent',
      position: 'relative',
      zIndex: 10,
      opacity: 0.8
    }}>
      Made with love by Rohan
    </footer>
  );
}
