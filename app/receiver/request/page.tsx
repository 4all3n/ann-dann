'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoChevronBack, IoCheckmarkCircle } from 'react-icons/io5';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

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
          Great! Your food request has been submitted successfully
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

export default function FoodRequestDetails() {
  const router = useRouter();
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
      alert('Please fill in all required fields');
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
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-4">
          <IoChevronBack className="text-2xl" />
        </button>
        <h1 className="text-xl font-semibold">Food Request Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Number of Beneficiaries */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">NO OF BENEFICIARIES</label>
          <input
            type="number"
            value={beneficiaries}
            onChange={(e) => setBeneficiaries(e.target.value)}
            placeholder="Enter number of beneficiaries"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
            required
          />
        </div>

        {/* Beneficiary Details */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">BENEFICIARY DETAILS (OPTIONAL)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-500 mb-2">DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Eg: Need food for 50 people."
            className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
            required
          />
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
              <span>Non Veg</span>
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
          <h3 className="font-medium mb-4">Contact Details</h3>
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
          SUBMIT
        </button>
      </form>

      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessModalClose} />
    </div>
  );
}
