'use client';

import { useState, useEffect } from 'react';
import RequestCard from '@/app/components/volunteer/card';
import CommunityArticle from '@/app/components/volunteer/community';
import LanguageSelector from '@/app/components/LanguageSelector';
import { useLanguage } from '@/app/context/LanguageContext';
import c1 from './assets/c1.png';
import c2 from './assets/c2.png';
import food1 from './assets/1.png';
import food2 from './assets/2.png';
import food3 from './assets/3.png';

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

const VolunteerHome = () => {
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [donations, setDonations] = useState<DonationInfo[]>([]);
  const { t } = useLanguage();

  const stats = [
    { label: t('orders_delivered'), value: '12' },
    { label: t('feedback_received'), value: '4' },
    { label: t('points_earned'), value: '200' },
  ];

  useEffect(() => {
    // Here you would fetch the donations from your API/database
    // For now, we'll use mock data
    setDonations([
      {
        id: '1',
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
      },
      {
        id: '2',
        title: 'Catering Surplus',
        description: 'Extra food from a corporate event. Well packaged and fresh.',
        location: 'Indiranagar, Bangalore',
        quantity: {
          veg: 10,
          nonVeg: 0
        },
        availability: 'Available',
        images: [food3.src],
        prepDate: '2024-03-15',
        expiryDate: '2024-03-16'
      },
      // Add more mock donations as needed
    ]);
  }, []);

  const visibleDonations = showAllRequests ? donations : donations.slice(0, 3);

  const communityArticles = [
    {
      image: c1,
      title: t('discussion'),
      description: t('discussion_description'),
    },
    {
      image: c2,
      title: t('announcement'),
      description: t('announcement_description'),
    },
    {
      image: c1,
      title: t('discussion'),
      description: t('discussion_description'),
    },
  ];

  const content = (
    <>
      {/* Welcome Section */}
      <div className="mb-12 lg:text-center">
        <h1 className="text-[#FF7058] text-sm lg:text-base mb-2 tracking-wider font-semibold">{t('welcome_volunteer')}</h1>
        <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900">Azonix Ken</h2>
      </div>

      {/* Language Selector */}
      <div className="mb-6 flex justify-end">
        <LanguageSelector />
      </div>

      {/* Stats Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-[#FF7058] to-[#ff8068] text-white rounded-2xl p-4 lg:p-8 flex justify-between shadow-lg shadow-[#FF7058]/10 hover:shadow-xl hover:shadow-[#FF7058]/20 transition-all">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="text-2xl lg:text-5xl font-semibold mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base font-medium text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests and Community Section */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Requests Section */}
        <div className="mb-12 lg:mb-0 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{t('available_donations')}</h2>
            {donations.length > 3 && (
              <button
                onClick={() => setShowAllRequests(!showAllRequests)}
                className="text-[#FF7058] text-sm lg:text-base hover:underline font-medium flex items-center gap-2 hover:text-[#ff8068] transition-colors"
              >
                {showAllRequests ? t('show_less') : t('view_more')}
              </button>
            )}
          </div>
          <div className="space-y-4">
            {visibleDonations.map((donation) => (
              <div key={donation.id} className="transform transition-all hover:scale-[1.01]">
                <RequestCard donation={donation} />
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="lg:bg-white lg:p-8 lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-100">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">{t('community')}</h2>
          <div className="grid grid-cols-1 gap-6">
            {communityArticles.map((article, index) => (
              <div 
                key={index} 
                className="transform transition-all hover:scale-[1.02] bg-gray-50 rounded-xl p-4 hover:shadow-md"
              >
                <CommunityArticle
                  image={article.image}
                  title={article.title}
                  description={article.description}
                />
              </div>
            ))}
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
    </>
  );
};

export default VolunteerHome;
