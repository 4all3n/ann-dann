'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  restaurantName: string;
  deliveryLocation: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({ restaurantName, deliveryLocation, onConfirm, onClose }: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#0000005d] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center">
        {/* Truck Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FF7058] flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zm-7.9-3H19v-4m0 0h-6.9M19 10l-3-3m3 3l3-3m-12 3h.01M3 15V9a2 2 0 012-2h6" />
          </svg>
        </div>

        {/* Confirmation Text */}
        <p className="text-center text-gray-800 mb-6">
          Are you sure you want to deliver food from {restaurantName}, to {deliveryLocation} ?
        </p>

        {/* Continue Button */}
        <div className='flex justify-between w-full gap-4'>
        <button
          onClick={onConfirm}
          className="w-full py-3 bg-[#FF7058] text-white rounded-md font-medium mb-3"
        >
          CONTINUE
        </button>
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#FF7058] text-white rounded-md font-medium mb-3"
        >
          CANCEL
        </button>
        </div>
      </div>
    </div>
  );
};

const AvailableDonationsPage = () => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const beneficiaryDetails = {
    beneficiaries: 5,
    location: 'Kothanur',
    contributorName: 'Yesh Prakesh',
  };

  const foodDetails = {
    name: 'Bla Bla Cafe',
    location: 'Kothanur',
    food: 'Briyani',
    quantity: '2 kgs',
    type: 'Non Veg',
    prepared: '12th march 2025',
  };

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
    // Navigate to next step or show success message
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={handleBack} className="mr-4">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Available Donations</h1>
        </div>

        {/* Beneficiary Details */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">DETAILS OF BENEFICIRY</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              No of Beneficiaries: <span className="font-medium">{beneficiaryDetails.beneficiaries}</span>
            </p>
            <p className="text-gray-700">
              Location: <span className="font-medium">{beneficiaryDetails.location}</span>
            </p>
            <p className="text-gray-700">
              Contributor Name: <span className="font-medium">{beneficiaryDetails.contributorName}</span>
            </p>
          </div>
        </div>

        {/* Food Card */}
        <FoodCard
          {...foodDetails}
          onDeliver={handleDeliver}
        />

        {/* Confirmation Modal */}
        {showConfirmation && (
          <ConfirmationModal
            restaurantName={foodDetails.name}
            deliveryLocation={beneficiaryDetails.location}
            onConfirm={handleConfirmDelivery}
            onClose={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableDonationsPage;
