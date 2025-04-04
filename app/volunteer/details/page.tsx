'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import locationIcon from './assets/location.png';
import DesktopWrapper from '@/app/components/shared/DesktopWrapper';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from '@/app/components/LanguageSelector';

interface VolunteerDetails {
  fullName: string;
  phoneNumber: string;
  occupation: string;
  address: string;
  pinCode: string;
  aadharId: string;
}

export default function VolunteerDetailsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<VolunteerDetails>({
    fullName: '',
    phoneNumber: '',
    occupation: '',
    address: '',
    pinCode: '',
    aadharId: '',
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

  const validateBasicFields = () => {
    const requiredFields: (keyof VolunteerDetails)[] = [
      'fullName',
      'phoneNumber',
      'aadharId',
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
      {/* Form Fields */}
      <div className="space-y-8 lg:max-w-3xl lg:mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">{t('personal_info')}</h2>
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-6 lg:space-y-0 space-y-6">
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('full_name')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                required
                placeholder={t('enter_full_name')}
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
                {t('occupation')}
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                placeholder={t('enter_occupation')}
              />
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 mb-2 font-medium">
                {t('aadhar_id')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="aadharId"
                value={formData.aadharId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#FF7058] focus:outline-none focus:ring-2 focus:ring-[#FF7058]/20 transition-all"
                required
                placeholder={t('enter_aadhar')}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('volunteer_details')}</h1>
          {content}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-16 px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('volunteer_details')}</h1>
          {content}
        </div>
      </div>
    </>
  );
}
