'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

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

interface RequestCardProps {
  donation: DonationInfo;
}

const RequestCard = ({ donation }: RequestCardProps) => {
  const router = useRouter();
  const { t } = useLanguage();

  const handleViewDonations = () => {
    router.push(`/volunteer/donation?id=${donation.id}`);
  };

  return (
    <div className="bg-[#FFF5F5] rounded-xl p-6 mb-4 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-800">
              {donation.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              donation.availability === 'Available' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {donation.availability}
            </span>
          </div>
          
          <div className="space-y-1">
            <p className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF7058] mr-2"></span>
              {t('location')}: {donation.location}
            </p>
            <p className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF7058] mr-2"></span>
              {t('veg_quantity')}: {donation.quantity.veg} & {t('non_veg_quantity')}: {donation.quantity.nonVeg}
            </p>
            <p className="text-gray-600 flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#FF7058] mr-2"></span>
              {t('expiry_date')}: {new Date(donation.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {donation.images && donation.images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {donation.images.slice(0, 2).map((image, index) => (
              <div key={index} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={image}
                  alt={`Food ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-food.jpg'; // Fallback image
                  }}
                />
              </div>
            ))}
            {donation.images.length > 2 && (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                +{donation.images.length - 2}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button 
            onClick={handleViewDonations}
            className="text-[#FF7058] font-medium hover:text-[#ff5252] transition-colors flex items-center gap-1"
          >
            {t('view_more')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
