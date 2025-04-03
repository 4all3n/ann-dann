'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPin from './assets/Map Pin.png';

// Create a custom pin marker icon
const createCustomIcon = () => {
  return L.icon({
    iconUrl: mapPin.src,
    iconSize: [40, 40],
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    className: 'custom-marker'
  });
};

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

export default function MapComponent({ latitude, longitude }: MapComponentProps) {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView([latitude, longitude], 15);
    }

    // Add or update marker
    if (mapRef.current) {
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], {
          icon: createCustomIcon()
        }).addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
} 