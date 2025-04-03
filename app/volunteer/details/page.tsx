'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';

interface VolunteerDetails {
  fullName: string;
  phoneNumber: string;
  occupation: string;
  address: string;
  pinCode: string;
  city: string;
  aadharId: string;
}

export default function VolunteerDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<VolunteerDetails>({
    fullName: '',
    phoneNumber: '',
    occupation: '',
    address: '',
    pinCode: '',
    city: '',
    aadharId: '',
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    const requiredFields = ['Full Name', 'Phone Number', 'Pin Code', 'City', 'Aadhar ID'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof VolunteerDetails]);
    
    if (emptyFields.length > 0) {
      setError(`Please fill in all required fields: ${emptyFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Navigate to next page
    // router.push('/next-page');
  };

  const handleLocation = () => {
    if (!validateForm()) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        // Navigate to location page
        router.push('/volunteer/location');
      });
    } else {
      // If geolocation is not supported, still navigate to location page
      router.push('/volunteer/location');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 ">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Volunteer Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Pin Code
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Aadhar ID
              </label>
              <input
                type="text"
                name="aadharId"
                value={formData.aadharId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7058]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Location
              </label>
              <button
                type="button"
                onClick={handleLocation}
                className="w-full px-3 py-2 border border-[#FF7058] text-[#FF7058] rounded-md flex items-center justify-center space-x-2 bg-white hover:bg-[#FFF5F5] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span>Use current location</span>
              </button>
            </div>

        
          </div>
        </form>
      </div>
    </div>
  );
}
