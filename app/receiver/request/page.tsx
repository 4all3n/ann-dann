'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoCheckmarkCircle } from 'react-icons/io5';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import LanguageSelector from '@/app/components/LanguageSelector';
import { useLanguage } from '@/app/context/LanguageContext';

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
    <div className="fixed inset-0 bg-[#0000002c] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center">
        <div className="flex justify-center mb-4">
          <IoCheckmarkCircle className="text-[#FF7058] text-6xl" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {t('request_success')}
        </h2>
        <button
          onClick={onClose}
          className="w-full bg-[#FF7058] text-white py-3 rounded-xl mt-4"
        >
          {t('back_to_home')}
        </button>
      </div>
    </div>
  );
};

export default function FoodRequestDetails() {
  const router = useRouter();
  const { t } = useLanguage();
  const [beneficiaries, setBeneficiaries] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<FoodQuantity>({ veg: 0, nonVeg: 0 });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // These would come from database/user profile later
  const userPhone = '+91-9748420276';
  const userAddress = 'Plot 11, Milenium park, Sec-25, Navi Mumbai, Maharashtra, 40076';

  const handleQuantityChange = (type: 'veg' | 'nonVeg', operation: 'add' | 'subtract') => {
    setQuantity(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beneficiaries || !description) {
      alert(t('fill_required_fields'));
      return;
    }
    // Here we would save to database
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/receiver/home');
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="mr-4">
              <IoChevronBack className="text-2xl" />
            </button>
            <h1 className="text-xl font-semibold">{t('food_request_details')}</h1>
          </div>
          <LanguageSelector />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Number of Beneficiaries */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">{t('no_of_beneficiaries')}</label>
            <input
              type="number"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
              placeholder={t('enter_beneficiaries')}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
              required
            />
          </div>

          {/* Beneficiary Details */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">{t('beneficiary_details')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('name')}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">{t('description')}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('need_food_example')}
              className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
              required
            />
          </div>

          {/* Food Quantity */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">{t('food_quantity')}</label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>{t('veg')}</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange('veg', 'subtract')}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <IoMdRemove />
                  </button>
                  <span className="w-8 text-center">{quantity.veg}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange('veg', 'add')}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <IoMdAdd />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>{t('non_veg')}</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange('nonVeg', 'subtract')}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <IoMdRemove />
                  </button>
                  <span className="w-8 text-center">{quantity.nonVeg}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange('nonVeg', 'add')}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <IoMdAdd />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-medium mb-4">{t('contact_details')}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiPhone className="text-[#FF7058] text-xl flex-shrink-0" />
                <p className="text-gray-600">{userPhone}</p>
              </div>
              <div className="flex gap-3">
                <HiOutlineLocationMarker className="text-[#FF7058] text-xl flex-shrink-0" />
                <p className="text-gray-600">{userAddress}</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF7058] text-white py-3 rounded-xl font-medium hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
          >
            {t('submit')}
          </button>
        </form>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto py-12 px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <button 
                  onClick={() => router.back()} 
                  className="mr-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoChevronBack className="text-3xl" />
                </button>
                <h1 className="text-3xl font-semibold text-gray-900">{t('food_request_details')}</h1>
              </div>
              <LanguageSelector />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Number of Beneficiaries */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('no_of_beneficiaries')}
                  </label>
                  <input
                    type="number"
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(e.target.value)}
                    placeholder={t('enter_beneficiaries')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Beneficiary Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('beneficiary_details')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent transition-all"
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('description')}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('need_food_example')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Food Quantity */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    {t('food_quantity')}
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">{t('veg')}</span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange('veg', 'subtract')}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <IoMdRemove className="text-xl" />
                          </button>
                          <span className="w-12 text-center text-xl font-medium">{quantity.veg}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange('veg', 'add')}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <IoMdAdd className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">{t('non_veg')}</span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange('nonVeg', 'subtract')}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <IoMdRemove className="text-xl" />
                          </button>
                          <span className="w-12 text-center text-xl font-medium">{quantity.nonVeg}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange('nonVeg', 'add')}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <IoMdAdd className="text-xl" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="col-span-2">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-medium mb-6">{t('contact_details')}</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <FiPhone className="text-[#FF7058] text-2xl flex-shrink-0" />
                        <p className="text-gray-600 text-lg">{userPhone}</p>
                      </div>
                      <div className="flex gap-4">
                        <HiOutlineLocationMarker className="text-[#FF7058] text-2xl flex-shrink-0" />
                        <p className="text-gray-600 text-lg">{userAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full max-w-md bg-[#FF7058] text-white py-4 rounded-xl font-medium hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2 transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
    </>
  );
}
