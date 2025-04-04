'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from './assets/Map Pin.png';

interface MapProps {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: MapProps) {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current).setView([latitude, longitude], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    } else {
      // Update view if map exists
      mapRef.current.setView([latitude, longitude], 13);
    }

    // Add custom marker
    const icon = L.icon({
      iconUrl: mapPin.src,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      className: 'custom-marker'
    });

    const marker = L.marker([latitude, longitude], { icon }).addTo(mapRef.current);

    return () => {
      marker.remove();
    };
  }, [latitude, longitude]);

  return <div ref={containerRef} className="w-full h-full" />;
} 