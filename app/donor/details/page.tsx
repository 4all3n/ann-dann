'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';
import DesktopWrapper from '@/app/components/shared/DesktopWrapper';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from '@/app/components/LanguageSelector';

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
  const { t } = useLanguage();
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
      alert(t('fill_required_fields'));
      return false;
    }

    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      alert(t('valid_phone_number'));
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      alert(t('valid_email'));
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
      alert(t('fill_address_pincode'));
      return;
    }

    router.push('/donor/home');
  };

  const content = (
    <div className="w-full">
      {/* Type Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">{t('donor_type')} <span className="text-red-500">*</span></h2>
        <div className="flex gap-4 mb-8 lg:gap-6 lg:justify-center">
          <button
            onClick={() => handleTypeSelect('RESTAURANT')}
            className={`w-[110px] h-[110px] lg:w-[150px] lg:h-[150px] p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
              formData.type === 'RESTAURANT' 
                ? 'bg-[#FF7058] shadow-md shadow-[#FF7058]/20' 
                : 'border-2 border-[#FF7058] hover:bg-[#FFF1F0] hover:shadow-sm'
            }`}
          >
            <svg 
              className={`w-7 h-7 lg:w-10 lg:h-10 ${formData.type === 'RESTAURANT' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m0-12V4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className={`text-sm lg:text-base font-medium ${formData.type === 'RESTAURANT' ? 'text-white' : 'text-[#FF7058]'}`}>
              {t('restaurant')}
            </span>
          </button>
          <button
            onClick={() => handleTypeSelect('EVENTS')}
            className={`w-[110px] h-[110px] lg:w-[150px] lg:h-[150px] p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
              formData.type === 'EVENTS' 
                ? 'bg-[#FF7058] shadow-md shadow-[#FF7058]/20' 
                : 'border-2 border-[#FF7058] hover:bg-[#FFF1F0] hover:shadow-sm'
            }`}
          >
            <svg 
              className={`w-7 h-7 lg:w-10 lg:h-10 ${formData.type === 'EVENTS' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
            <span className={`text-sm lg:text-base font-medium ${formData.type === 'EVENTS' ? 'text-white' : 'text-[#FF7058]'}`}>
              {t('events')}
            </span>
          </button>
          <button
            onClick={() => handleTypeSelect('INDIVIDUAL')}
            className={`w-[110px] h-[110px] lg:w-[150px] lg:h-[150px] p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
              formData.type === 'INDIVIDUAL' 
                ? 'bg-[#FF7058] shadow-md shadow-[#FF7058]/20' 
                : 'border-2 border-[#FF7058] hover:bg-[#FFF1F0] hover:shadow-sm'
            }`}
          >
            <svg 
              className={`w-7 h-7 lg:w-10 lg:h-10 ${formData.type === 'INDIVIDUAL' ? 'text-white' : 'text-[#FF7058]'}`} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
            </svg>
            <span className={`text-sm lg:text-base font-medium ${formData.type === 'INDIVIDUAL' ? 'text-white' : 'text-[#FF7058]'}`}>
              {t('individual')}
            </span>
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-8 lg:max-w-3xl lg:mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">{t('organization_info')}</h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 lg:space-y-0 space-y-6">
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('organization_name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                required
                placeholder={t('enter_org_name')}
              />
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('delivery_provision')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="deliveryProvision"
                value={formData.deliveryProvision}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                required
                placeholder={t('enter_delivery_provision')}
              />
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('phone_number')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                  placeholder={t('enter_phone')}
                  maxLength={10}
                  pattern="\d{10}"
                />
              </div>
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('email_address')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                required
                placeholder={t('enter_email')}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">{t('address_info')}</h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 lg:space-y-0 space-y-6">
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('address')}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                placeholder={t('enter_address')}
              />
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('pin_code')}
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                placeholder={t('enter_pincode')}
              />
            </div>

            <div className="lg:col-span-2 lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('location')}
              </label>
              <button
                onClick={handleLocationClick}
                className="w-full px-4 py-3.5 text-[#FF7058] border border-[#FF7058] rounded-lg flex items-center justify-center gap-2 hover:bg-[#FFF1F0] transition-all shadow-sm"
              >
                <Image
                  src={locationIcon}
                  alt="Location"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                <span className="font-medium">{t('use_current_location')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="lg:mt-8">
          <button
            onClick={handleNext}
            className="w-full lg:w-auto lg:min-w-[200px] lg:mx-auto py-3.5 px-8 bg-[#FF7058] text-white rounded-lg font-medium hover:bg-[#ff8068] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 block"
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('donor_details')}</h1>
          {content}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-16 px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('donor_details')}</h1>
          {content}
        </div>
      </div>
    </>
  );
}
