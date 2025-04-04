'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoCheckmarkCircle } from 'react-icons/io5';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import ImageUpload from '@/app/components/donor/ImageUpload';

interface FoodQuantity {
  veg: number;
  nonVeg: number;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000002c] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center">
        <div className="flex justify-center mb-4">
          <IoCheckmarkCircle className="text-[#FF7058] text-6xl" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          Awesome! your donation request posted Successfully
        </h2>
        <button
          onClick={onClose}
          className="w-full bg-[#FF7058] text-white py-3 rounded-xl mt-4"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default function CreateDonation() {
  const router = useRouter();
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
      alert('Please fill in all required fields');
      return;
    }
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/donor/home');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-4 focus:outline-none focus:ring-2 focus:ring-[#FF7058] rounded-lg">
          <IoChevronBack className="text-2xl" />
        </button>
        <h1 className="text-xl font-semibold">Listing Type : Donation</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">ADD TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Food title"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
            required
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">IS IT READY TO PICK UP?</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAvailabilityDropdown(!showAvailabilityDropdown)}
              className={`w-full p-3 border border-gray-300 rounded-xl text-left bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent ${
                availability === 'Available' ? 'bg-[#FFF1F0]' : ''
              }`}
            >
              {availability || 'Select Availability'}
            </button>
            {showAvailabilityDropdown && (
              <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-xl overflow-hidden z-10 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setAvailability('Available');
                    setShowAvailabilityDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-[#FFF1F0] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:bg-[#FFF1F0]"
                >
                  Ready to Pick Up
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAvailability('Not Available');
                    setShowAvailabilityDropdown(false);
                  }}
                  className="w-full p-3 text-left hover:bg-[#FFF1F0] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:bg-[#FFF1F0]"
                >
                  Not Ready to Pick Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Food Quantity */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">FOOD QUANTITY</label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Veg</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('veg', 'subtract')}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                >
                  <IoMdRemove />
                </button>
                <span className="w-8 text-center">{quantity.veg}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange('veg', 'add')}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Non Veg</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('nonVeg', 'subtract')}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                >
                  <IoMdRemove />
                </button>
                <span className="w-8 text-center">{quantity.nonVeg}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange('nonVeg', 'add')}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">PHOTOS</label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={3}
          />
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">PREPARATION DATE</label>
            <div className="relative">
              <input
                type="date"
                value={prepDate}
                onChange={(e) => setPrepDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                required
                min={new Date().toISOString().split('T')[0]}
                style={{ colorScheme: 'normal' }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">EXPIRY DATE</label>
            <div className="relative">
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
                required
                min={prepDate || new Date().toISOString().split('T')[0]}
                style={{ colorScheme: 'normal' }}
              />
            </div>
          </div>
        </div>

        {/* Assurance Checkbox */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={isAssured}
            onChange={(e) => setIsAssured(e.target.checked)}
            className="mt-1 focus:ring-[#FF7058] focus:ring-offset-0 focus:ring-2 text-[#FF7058] rounded border-gray-300"
            required
          />
          <label className="text-sm">
            I assure that the food quality and hygiene has not been compromised
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#FF7058] text-white py-3 rounded-xl font-medium hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
        >
          SUBMIT
        </button>
      </form>

      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
    </div>
  );
}
