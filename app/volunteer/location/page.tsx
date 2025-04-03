'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';
import mapPin from './assets/Map Pin.png';
import pinRadar from './assets/Pin Radar.png';

interface LocationDetails {
  address: string;
  latitude: number;
  longitude: number;
}

export default function SelectLocationPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationDetails | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search functionality
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedLocation({
          address: '109, Kothanur, K Narayanapura Cross, Bangalore.',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  const handleContinue = () => {
    if (selectedLocation) {
      // Save location and navigate
      router.push('/next-page');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Select your location
        </h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search dishes, restaurants"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent text-gray-600"
          />
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg mb-6">
          {/* Center Pin with Radar Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={pinRadar}
              alt="Location Radar"
              width={200}
              height={200}
              className="absolute"
            />
          
          </div>

          {/* Current Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2.5 bg-white border border-[#FF7058] text-[#FF7058] rounded-lg flex items-center gap-2 hover:bg-[#FFF5F5]"
          >
            <Image
              src={locationIcon}
              alt="Location"
              width={18}
              height={18}
            />
            <span>Use Current Location</span>
          </button>
        </div>

        {/* Selected Location */}
        <div className="bg-white rounded-lg p-4 flex flex-col gap-2  shadow-sm mb-4">
          <h2 className="text-sm font-normal text-gray-400 mb-3">Your Location</h2>
          {selectedLocation && (
            <div className="flex items-start gap-3">
              <Image
                src={mapPin}
                alt="Location Pin"
                width={24}
                height={24}
                className="mt-1"
              />
              <p className="text-gray-800 text-base">
                {selectedLocation.address}
              </p>
            </div>
          )}
        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedLocation}
          className={`w-full py-3.5 rounded-2xl transition-colors text-base font-medium ${
            selectedLocation
              ? 'bg-[#FF7058] text-white hover:bg-opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
        </div>

      </div>
    </div>
  );
}
