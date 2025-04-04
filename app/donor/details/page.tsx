'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';

interface DonorDetails {
  type: 'RESTAURANT' | 'EVENTS' | 'INDIVIDUAL' | null;
  organizationName: string;
  deliveryProvision: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  pinCode: string;
}

export default function DonorDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<DonorDetails>({
    type: null,
    organizationName: '',
    deliveryProvision: '',
    phoneNumber: '',
    emailAddress: '',
    address: '',
    pinCode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          phoneNumber: digitsOnly
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTypeSelect = (type: DonorDetails['type']) => {
    setFormData(prev => ({
      ...prev,
      type
    }));
  };

  const validateBasicFields = () => {
    const requiredFields: (keyof DonorDetails)[] = [
      'type',
      'organizationName',
      'deliveryProvision',
      'phoneNumber',
      'emailAddress',
    ];

    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return false;
    }

    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleLocationClick = () => {
    if (validateBasicFields()) {
      router.push('/donor/location');
    }
  };

  const handleNext = () => {
    if (!validateBasicFields()) {
      return;
    }

    if (!formData.address || !formData.pinCode) {
      alert('Please fill in both address and pin code to proceed');
      return;
    }

    router.push('/donor/home');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Donor Details</h1>

        {/* Type Selection */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => handleTypeSelect('RESTAURANT')}
            className={`w-[110px] h-[110px] p-4 rounded-xl flex flex-col items-center justify-center gap-2 ${
              formData.type === 'RESTAURANT' ? 'bg-[#FF7058]' : 'border-2 border-[#FF7058]'
            }`}
          >
            <svg 
              className={`w-7 h-7 ${formData.type === 'RESTAURANT' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m0-12V4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-sm font-medium ${formData.type === 'RESTAURANT' ? 'text-white' : 'text-[#FF7058]'}`}>
              RESTAURANT
            </span>
          </button>
          <button
            onClick={() => handleTypeSelect('EVENTS')}
            className={`w-[110px] h-[110px] p-4 rounded-xl flex flex-col items-center justify-center gap-2 ${
              formData.type === 'EVENTS' ? 'bg-[#FF7058]' : 'border-2 border-[#FF7058]'
            }`}
          >
            <svg 
              className={`w-7 h-7 ${formData.type === 'EVENTS' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
            <span className={`text-sm font-medium ${formData.type === 'EVENTS' ? 'text-white' : 'text-[#FF7058]'}`}>
              EVENTS
            </span>
          </button>
          <button
            onClick={() => handleTypeSelect('INDIVIDUAL')}
            className={`w-[110px] h-[110px] p-4 rounded-xl flex flex-col items-center justify-center gap-2 ${
              formData.type === 'INDIVIDUAL' ? 'bg-[#FF7058]' : 'border-2 border-[#FF7058]'
            }`}
          >
            <svg 
              className={`w-7 h-7 ${formData.type === 'INDIVIDUAL' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
            </svg>
            <span className={`text-sm font-medium ${formData.type === 'INDIVIDUAL' ? 'text-white' : 'text-[#FF7058]'}`}>
              INDIVIDUAL
            </span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Organization/ Business Name
            </label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Delivery Provision
            </label>
            <input
              type="text"
              name="deliveryProvision"
              value={formData.deliveryProvision}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full pl-12 pr-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
                placeholder="Enter 10 digit number"
                maxLength={10}
                pattern="\d{10}"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Pin Code
            </label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#FF7058] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 uppercase mb-1">
              Location
            </label>
            <button
              onClick={handleLocationClick}
              className="w-full px-4 py-3 text-[#FF7058] border border-[#FF7058] rounded-lg flex items-center justify-center gap-2"
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

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-3.5 bg-[#FF7058] text-white rounded-lg font-medium"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
