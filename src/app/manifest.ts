import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pujor Pothe',
    short_name: 'PujorPothe',
    description: 'Discover the Puja, Follow the Path. A digital journey through Bengal during Durga Puja.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060001',
    theme_color: '#060001',
    icons: [
      {
        src: '/pujorpothelogo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/pujorpothelogo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      }
    ],
  }
}
