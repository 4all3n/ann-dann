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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Navigate to next page
    // router.push('/next-page');
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        // Handle location data
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 ">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Volunteer Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                Location
              </label>
              <button
                type="button"
                onClick={handleLocation}
                className="w-full px-3 py-2 border border-[#FF7058] text-[#FF7058] rounded-md flex items-center justify-center space-x-2 bg-white hover:bg-[#FFF5F5]"
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

            <div>
              <label className="block text-xs uppercase text-gray-500 mb-1">
                Aadhar ID
              </label>
              <button
                type="button"
                onClick={() => {/* Handle file upload */}}
                className="w-full px-3 py-2 border border-[#FF7058] text-[#FF7058] rounded-md flex items-center justify-center space-x-2 bg-white hover:bg-[#FFF5F5]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m-8-8h16"
                  />
                </svg>
                <span> Upload</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF7058] text-white py-3 rounded-md hover:bg-[#FF5252] transition-colors"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
