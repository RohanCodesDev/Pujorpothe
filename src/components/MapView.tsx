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

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (mapInstanceRef.current) return; // Already initialised

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

      // Custom tile layer with warm sepia-like look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        subdomains: 'abcd',
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
        .addTo(map)
        .bindPopup(`
          <div style="font-family: 'Inter', sans-serif; min-width: 200px;">
            <div style="font-weight: 600; font-size: 14px; color: #2A2420; margin-bottom: 4px;">
              ${pandal.name}
            </div>
            <div style="font-family: 'Hind Siliguri', sans-serif; font-size: 13px; color: #8B1A1A; margin-bottom: 8px;">
              ${pandal.bengaliName}
            </div>
            <div style="font-size: 12px; color: #5C5047; margin-bottom: 10px; line-height: 1.5;">
              ${pandal.description.slice(0, 100)}...
            </div>
            <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between;">
              <span style="
                padding: 3px 10px;
                background: rgba(193,57,43,0.1);
                color: #C1392B;
                border-radius: 100px;
                font-size: 11px;
                font-weight: 500;
              ">
                ${pandal.style[0]}
              </span>
              <a href="/pandal/${pandal.id}" style="
                color: #C1392B;
                text-decoration: none;
                font-size: 12px;
                font-weight: 600;
              ">View details →</a>
            </div>
          </div>
        `, {
          maxWidth: 260,
          className: 'custom-popup',
        });

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
