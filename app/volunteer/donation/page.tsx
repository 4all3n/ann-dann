'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from '@/app/components/LanguageSelector';
import food1 from '../home/assets/1.png';
import food2 from '../home/assets/2.png';
import food3 from '../home/assets/3.png';

interface DonationInfo {
  id: string;
  title: string;
  description: string;
  location: string;
  quantity: {
    veg: number;
    nonVeg: number;
  };
  availability: string;
  images: string[];
  prepDate: string;
  expiryDate: string;
}

interface FoodCardProps {
  name: string;
  location: string;
  food: string;
  quantity: string;
  type: string;
  prepared: string;
  onDeliver: () => void;
}

const FoodCard = ({ name, location, food, quantity, type, prepared, onDeliver }: FoodCardProps) => {
  return (
    <div className="border border-[#FF7058] rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
      <div className="space-y-1 mb-4">
        <p className="text-sm text-gray-700">Food: {food}</p>
        <p className="text-sm text-gray-700">Quantity: {quantity}</p>
        <p className="text-sm text-gray-700">Type: {type}</p>
        <p className="text-sm text-gray-700">Prepared: {prepared}</p>
      </div>
      <button
        onClick={onDeliver}
        className="w-full bg-[#FF7058] text-white py-2 rounded-md font-medium hover:bg-[#ff5252] transition-colors"
      >
        Deliver Food
      </button>
    </div>
  );
};

interface ConfirmationModalProps {
  donationTitle: string;
  deliveryLocation: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({ donationTitle, deliveryLocation, onConfirm, onClose }: ConfirmationModalProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-xl">
        {/* Truck Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FF7058] flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-7.9-3H19v-4m0 0h-6.9M19 10l-3-3m3 3l3-3m-12 3h.01M3 15V9a2 2 0 012-2h6" />
          </svg>
        </div>

        {/* Confirmation Text */}
        <p className="text-center text-gray-800 text-lg mb-8">
          {t('are_you_sure')} <span className="font-semibold">{donationTitle}</span> {t('to')} <span className="font-semibold">{deliveryLocation}</span>?
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 border-2 border-[#FF7058] text-[#FF7058] rounded-xl font-medium hover:bg-[#FFF5F5] transition-all"
          >
            {t('cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-[#FF7058] text-white rounded-xl font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98]"
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

const AvailableDonationsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donation, setDonation] = useState<DonationInfo | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const donationId = searchParams.get('id');
    if (donationId) {
      // Here you would fetch the donation details from your API/database
      // For now, we'll use mock data
      setDonation({
        id: donationId,
        title: 'Fresh Restaurant Food',
        description: 'Freshly prepared meals including rice, curry, and vegetables.',
        location: 'Kothanur, Bangalore',
        quantity: {
          veg: 5,
          nonVeg: 3
        },
        availability: 'Available',
        images: [food1.src, food2.src],
        prepDate: '2024-03-15',
        expiryDate: '2024-03-16'
      });
    }
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  const handleDeliver = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelivery = () => {
    // Handle the delivery confirmation
    console.log('Delivery confirmed');
    setShowConfirmation(false);
    router.push('/volunteer/home');
  };

  if (!donation) {
    return null;
  }

  const content = (
    <>
      {/* Header */}
      <div className="flex items-center mb-8 lg:mb-12">
        <button 
          onClick={handleBack} 
          className="mr-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">{t('donation_details')}</h1>
      </div>

      {/* Language Selector */}
      <div className="mb-6 flex justify-end">
        <LanguageSelector />
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Donation Details */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 mb-8 lg:mb-0">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">{t('donation_information')}</h2>
          
          {/* Images */}
          {donation.images && donation.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {donation.images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={image}
                    alt={`Food ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-food.jpg'; // Fallback image
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-500 block mb-1">{t('title')}</span>
              <span className="font-medium text-gray-900">{donation.title}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-500 block mb-1">{t('description')}</span>
              <span className="font-medium text-gray-900">{donation.description}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <span className="text-sm text-gray-500 block mb-1">{t('location')}</span>
              <span className="font-medium text-gray-900">{donation.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500 block mb-1">{t('veg_quantity')}</span>
                <span className="font-medium text-gray-900">{donation.quantity.veg}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500 block mb-1">{t('non_veg_quantity')}</span>
                <span className="font-medium text-gray-900">{donation.quantity.nonVeg}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500 block mb-1">{t('preparation_date')}</span>
                <span className="font-medium text-gray-900">
                  {new Date(donation.prepDate).toLocaleDateString()}
                </span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-500 block mb-1">{t('expiry_date')}</span>
                <span className="font-medium text-gray-900">
                  {new Date(donation.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Action */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">{t('delivery_action')}</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-[#FFF5F5] rounded-xl border border-[#FF7058]">
              <h3 className="font-medium text-gray-900 mb-4">{t('important_notes')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#FF7058] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('verify_food_quality')}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#FF7058] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('check_expiry_date')}</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#FF7058] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('ensure_proper_handling')}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleDeliver}
              className="w-full py-4 bg-[#FF7058] text-white rounded-xl text-lg font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
            >
              {t('deliver_this_donation')}
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white p-6">
        <div className="max-w-md mx-auto">
          {content}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto py-12 px-8">
          {content}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <ConfirmationModal
          donationTitle={donation.title}
          deliveryLocation={donation.location}
          onConfirm={handleConfirmDelivery}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </>
  );
};

export default AvailableDonationsPage;
