'use client';

import { useLanguage } from '@/app/context/LanguageContext';

interface DonationCardProps {
  location: string;
  items: {
    name: string;
    quantity: string;
  }[];
  status: 'Pending' | 'Donated';
}

const DonationCard = ({ location, items, status }: DonationCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-[#FFF1F0] rounded-xl p-4 mb-3 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-900">{location}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'Pending' 
            ? 'bg-[#FF7058] text-white' 
            : 'border border-[#FF7058] text-[#FF7058]'
        }`}>
          {t(status.toLowerCase())}
        </span>
      </div>

      <div className="space-y-2 mb-2">
        {items.map((item, index) => (
          <div key={index} className="text-gray-600 flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#FF7058] mr-2"></span>
            <span>{t(item.name.toLowerCase())}: {item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationCard;
