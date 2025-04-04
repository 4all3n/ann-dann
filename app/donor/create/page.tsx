'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoCheckmarkCircle } from 'react-icons/io5';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import ImageUpload from '@/app/components/donor/ImageUpload';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from '@/app/components/LanguageSelector';

interface FoodQuantity {
  veg: number;
  nonVeg: number;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
        <div className="flex justify-center mb-6">
          <IoCheckmarkCircle className="text-[#FF7058] text-7xl" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {t('donation_success')}
        </h2>
        <button
          onClick={onClose}
          className="w-full bg-[#FF7058] text-white py-4 rounded-xl text-lg font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
        >
          {t('back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default function CreateDonation() {
  const router = useRouter();
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [quantity, setQuantity] = useState<FoodQuantity>({ veg: 0, nonVeg: 0 });
  const [images, setImages] = useState<string[]>([]);
  const [prepDate, setPrepDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isAssured, setIsAssured] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);

  const handleQuantityChange = (type: 'veg' | 'nonVeg', operation: 'add' | 'subtract') => {
    setQuantity(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !availability || !prepDate || !expiryDate || !isAssured) {
      alert(t('fill_required_fields'));
      return;
    }
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/donor/home');
  };

  const content = (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center mb-8 lg:mb-12">
        <button onClick={() => router.back()} className="mr-4 text-gray-600 hover:text-gray-900 focus:outline-none lg:hidden">
          <IoChevronBack className="text-2xl" />
        </button>
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 lg:text-center lg:w-full">{t('create_donation')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 lg:max-w-3xl lg:mx-auto">
        <div className="lg:bg-white lg:p-8 lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-100">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 lg:space-y-0 space-y-6">
            {/* Title */}
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('add_title')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('food_title')}
                className="w-full px-4 py-3 border-b lg:border lg:rounded-xl border-gray-300 focus:border-[#FF7058] focus:outline-none lg:bg-gray-50/50 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Availability */}
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('ready_to_pickup')}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAvailabilityDropdown(!showAvailabilityDropdown)}
                  className="w-full px-4 py-3 border-b lg:border lg:rounded-xl border-gray-300 text-left bg-transparent lg:bg-gray-50/50 focus:border-[#FF7058] focus:outline-none"
                >
                  {availability ? t(availability.toLowerCase()) : t('select_availability')}
                </button>
                {showAvailabilityDropdown && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden z-10 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setAvailability('Available');
                        setShowAvailabilityDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#FFF1F0] transition-colors"
                    >
                      {t('ready_to_pickup')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAvailability('Not Available');
                        setShowAvailabilityDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-[#FFF1F0] transition-colors"
                    >
                      {t('not_ready_to_pickup')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-2 lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('description')}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-b lg:border lg:rounded-xl border-gray-300 min-h-[120px] focus:border-[#FF7058] focus:outline-none lg:bg-gray-50/50 resize-none"
                required
                placeholder={t('describe_food_donation')}
              />
            </div>

            {/* Food Quantity */}
            <div className="lg:col-span-2 lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-4 lg:mb-6 lg:text-[13px] font-medium tracking-wider">
                {t('food_quantity')}
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{t('veg')}</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange('veg', 'subtract')}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <IoMdRemove className="text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity.veg}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange('veg', 'add')}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <IoMdAdd className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{t('non_veg')}</span>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange('nonVeg', 'subtract')}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <IoMdRemove className="text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-medium">{quantity.nonVeg}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange('nonVeg', 'add')}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <IoMdAdd className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="lg:col-span-2 lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('photos')}
              </label>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200">
                <ImageUpload
                  images={images}
                  onImagesChange={setImages}
                  maxImages={3}
                />
              </div>
            </div>

            {/* Dates */}
            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('preparation_date')}
              </label>
              <input
                type="date"
                value={prepDate}
                onChange={(e) => setPrepDate(e.target.value)}
                className="w-full px-4 py-3 border-b lg:border lg:rounded-xl border-gray-300 focus:border-[#FF7058] focus:outline-none lg:bg-gray-50/50"
                required
                min={new Date().toISOString().split('T')[0]}
                style={{ colorScheme: 'normal' }}
              />
            </div>

            <div className="lg:p-2">
              <label className="block text-sm text-gray-600 uppercase mb-2 lg:mb-3 lg:text-[13px] font-medium tracking-wider">
                {t('expiry_date')}
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-3 border-b lg:border lg:rounded-xl border-gray-300 focus:border-[#FF7058] focus:outline-none lg:bg-gray-50/50"
                required
                min={prepDate || new Date().toISOString().split('T')[0]}
                style={{ colorScheme: 'normal' }}
              />
            </div>

            {/* Assurance Checkbox */}
            <div className="lg:col-span-2 lg:p-2">
              <div className="flex items-start gap-3 bg-[#FFF1F0] p-4 rounded-xl">
                <input
                  type="checkbox"
                  checked={isAssured}
                  onChange={(e) => setIsAssured(e.target.checked)}
                  className="mt-1 w-4 h-4 focus:ring-[#FF7058] focus:ring-offset-0 focus:ring-2 text-[#FF7058] rounded border-gray-300"
                  required
                />
                <label className="text-sm text-gray-700 leading-relaxed">
                  {t('food_quality_assurance')}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="lg:mt-12">
          <button
            type="submit"
            className="w-full lg:max-w-md lg:mx-auto py-4 bg-[#FF7058] text-white rounded-xl text-lg font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10 block"
          >
            {t('submit')}
          </button>
        </div>
      </form>

      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
    </div>
  );

  return (
    <>
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white p-6">
        {content}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto py-12 px-8">
          {content}
        </div>
      </div>
    </>
  );
}
