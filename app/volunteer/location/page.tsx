'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';
import mapPin from './assets/Map Pin.png';
import pinRadar from './assets/Pin Radar.png';
import mapsBackground from './assets/maps.png';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(
  () => import('./MapComponent'),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={pinRadar}
          alt="Location Radar"
          width={200}
          height={200}
          className="absolute"
        />
      </div>
    )
  }
);

interface LocationDetails {
  address: string;
  latitude: number;
  longitude: number;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

export default function SelectLocationPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Click outside handler to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search function
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`,
            {
              headers: {
                'Accept-Language': 'en',
                'User-Agent': 'AnnDann/1.0'
              }
            }
          );
          const data = await response.json();
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching locations:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If the input is cleared, reset the search state
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
    } else {
      // Show results again if there are any
      if (searchResults.length > 0) {
        setShowResults(true);
      }
    }
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    setSelectedLocation({
      address: result.display_name,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon)
    });
    setSearchQuery(result.display_name);
    setShowResults(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      setSelectedLocation(null);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: {
                  'Accept-Language': 'en',
                  'User-Agent': 'AnnDann/1.0'
                }
              }
            );
            
            const data = await response.json();
            
            if (data && data.display_name) {
              setSelectedLocation({
                address: data.display_name,
                latitude: latitude,
                longitude: longitude,
              });
              setSearchQuery(data.display_name);
            } else {
              setSelectedLocation({
                address: "Current Location",
                latitude: latitude,
                longitude: longitude,
              });
              console.error("Geocoding failed:", data);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            setSelectedLocation({
              address: "Current Location",
              latitude: latitude,
              longitude: longitude,
            });
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          let errorMessage = "Unable to retrieve your location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission was denied. Please enable location services in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get your location timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          
          alert(errorMessage);
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const handleContinue = () => {
    if (selectedLocation) {
      router.push('/volunteer/availbility');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Select your location
        </h1>

        {/* Search Bar */}
        <div className="relative mb-4 z-[1000]" ref={searchContainerRef}>
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
            placeholder="Search for a location"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => {
              if (searchResults.length > 0) {
                setShowResults(true);
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent text-gray-600"
          />
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-[1000] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSearchResult(result)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-start gap-2"
                >
                  <Image
                    src={mapPin}
                    alt="Location"
                    width={16}
                    height={16}
                    className="mt-1 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">{result.display_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg mb-6 overflow-hidden z-0">
          {/* Background Map Image */}
          <div className="absolute inset-0">
            <Image
              src={mapsBackground}
              alt="Map Background"
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
          </div>
          
          {selectedLocation ? (
            <Map 
              latitude={selectedLocation.latitude} 
              longitude={selectedLocation.longitude} 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={pinRadar}
                alt="Location Radar"
                width={200}
                height={200}
                className="absolute"
              />
            </div>
          )}

          {/* Current Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
            className="absolute w-[60%] bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2.5 bg-white border border-[#FF7058] text-[#FF7058] rounded-lg flex items-center gap-2 hover:bg-[#FFF5F5] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={locationIcon}
              alt="Location"
              width={18}
              height={18}
            />
            <span>{isLoading ? "Getting location..." : "Use Current Location"}</span>
          </button>
        </div>

        {/* Selected Location */}
        <div className="bg-white rounded-lg p-4 flex flex-col gap-2 shadow-sm mb-4">
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
