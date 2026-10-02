'use client';

import { useEffect, useRef } from 'react';
import type { Pandal } from '@/lib/data';

interface MapViewProps {
  pandals: Pandal[];
  center?: [number, number];
  zoom?: number;
  selectedPandalId?: string;
  onPandalClick?: (pandal: Pandal) => void;
  height?: string;
}

export default function MapView({
  pandals,
  center = [22.5726, 88.3639],
  zoom = 13,
  selectedPandalId,
  onPandalClick,
  height = '100%',
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (mapInstanceRef.current || isInitializingRef.current) return; // Already initialised
    isInitializingRef.current = true;

    // Dynamically import Leaflet
    import('leaflet').then(L => {
      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center,
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Standard free OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.control.attribution({ position: 'bottomleft', prefix: '© পুজোর পথে' }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers
      addMarkers(L, map, pandals, selectedPandalId, onPandalClick);
    });
  }, []);

  // Update markers when pandals change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then(L => {
      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      addMarkers(L, mapInstanceRef.current, pandals, selectedPandalId, onPandalClick);
    });
  }, [pandals, selectedPandalId]);

  function addMarkers(L: any, map: any, pandals: Pandal[], selectedId?: string, onClick?: (p: Pandal) => void) {
    pandals.forEach(pandal => {
      const isSelected = pandal.id === selectedId;

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            width: ${isSelected ? 20 : 14}px;
            height: ${isSelected ? 20 : 14}px;
            background: ${isSelected ? '#C1392B' : '#8B1A1A'};
            border: ${isSelected ? '3px' : '2px'} solid #fff;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(193,57,43,${isSelected ? '0.7' : '0.4'});
            transition: all 0.2s ease;
            cursor: pointer;
            position: relative;
          ">
            ${isSelected ? `<div style="
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%,-50%);
              width: 8px; height: 8px;
              background: #fff;
              border-radius: 50%;
            "></div>` : ''}
          </div>
        `,
        iconSize: [isSelected ? 20 : 14, isSelected ? 20 : 14],
        iconAnchor: [isSelected ? 10 : 7, isSelected ? 10 : 7],
      });

      const marker = L.marker([pandal.lat, pandal.lng], { icon })
        .addTo(map);

      if (onClick) {
        marker.on('click', () => onClick(pandal));
      }

      markersRef.current.push(marker);
    });
  }

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        
        /* CSS Trick to make standard OSM tiles dark mode */
        .leaflet-layer,
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out,
        .leaflet-control-attribution {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }

        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(42,36,32,0.18);
          border: 1px solid rgba(193,57,43,0.1);
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 12px rgba(42,36,32,0.12) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          color: #C1392B !important;
          font-size: 18px !important;
          line-height: 30px !important;
        }
      `}</style>
    </div>
  );
}
