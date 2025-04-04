'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DonationCard from '@/app/components/donor/card';
import CommunityArticle from '@/app/components/donor/community';
import c1 from './assets/c1.png';
import c2 from './assets/c2.png';
import { useLanguage } from '@/app/context/LanguageContext';
import LanguageSelector from '@/app/components/LanguageSelector';

export default function DonorHomePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showAllDonations, setShowAllDonations] = useState(false);

  const donationHistory = [
    {
      location: 'Kothanur',
      items: [
        { name: 'Chapati', quantity: '20' },
        { name: 'Daal', quantity: '1 kg' },
        { name: 'Rice', quantity: '2kg' },
      ],
      status: 'Pending' as const,
    },
    {
      location: 'Kothanur',
      items: [
        { name: 'Chapati', quantity: '20' },
        { name: 'Daal', quantity: '1 kg' },
        { name: 'Rice', quantity: '2kg' },
      ],
      status: 'Pending' as const,
    },
    {
      location: 'Kothanur',
      items: [
        { name: 'Chapati', quantity: '20' },
        { name: 'Daal', quantity: '1 kg' },
        { name: 'Rice', quantity: '2kg' },
      ],
      status: 'Donated' as const,
    },
  ];

  const communityArticles = [
    {
      image: c1,
      title: 'DISCUSSION',
      description: 'Hey everyone, I run a restaurant and often have leftover food at closing time. What are the best practices to ensure food is stored safely before donation',
    },
    {
      image: c2,
      title: 'ANNOUNCEMENT',
      description: "We have seen an increase in food donations, but we need more volunteers for pickup and delivery in Bengaluru. If you're interested, please sign up on our portal",
    },
  ];

  const visibleDonations = showAllDonations ? donationHistory : donationHistory.slice(0, 3);

  const content = (
    <>
      {/* Welcome Section */}
      <div className="mb-12 lg:text-center">
        <h1 className="text-gray-600 text-sm lg:text-base mb-2 tracking-wider">{t('welcome_donor')}</h1>
        <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900">Azonix Ken</h2>
      </div>

      {/* Stats and Create Post Row */}
      <div className="lg:flex lg:gap-8 mb-12">
        {/* Stats */}
        <div className="bg-gradient-to-r from-[#FF7058] to-[#ff8068] text-white rounded-2xl p-4 lg:p-8 mb-8 lg:mb-0 flex justify-between lg:flex-1 shadow-lg shadow-[#FF7058]/10 hover:shadow-xl hover:shadow-[#FF7058]/20 transition-all">
          <div className="text-center px-4">
            <div className="text-2xl lg:text-5xl font-semibold mb-2">233</div>
            <div className="text-sm lg:text-base font-medium text-white/90">{t('total_donations')}</div>
          </div>
          <div className="text-center px-4 border-l border-r border-white/20">
            <div className="text-2xl lg:text-5xl font-semibold mb-2">167</div>
            <div className="text-sm lg:text-base font-medium text-white/90">{t('donations_received')}</div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl lg:text-5xl font-semibold mb-2">2000</div>
            <div className="text-sm lg:text-base font-medium text-white/90">{t('people_reached')}</div>
          </div>
        </div>

        {/* Create Donation Button */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center shadow-lg hover:shadow-xl transition-all border border-gray-100">
          <p className="text-gray-600 mb-4 lg:text-lg lg:text-center">{t('extra_food_message')}</p>
          <button 
            onClick={() => router.push('/donor/create')}
            className="w-full bg-[#FF7058] text-white py-4 lg:py-5 rounded-xl font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
          >
            {t('create_donation_post')}
          </button>
        </div>
      </div>

      {/* History and Community Section */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Donation History */}
        <div className="mb-12 lg:mb-0 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{t('donation_history')}</h2>
            {donationHistory.length > 3 && !showAllDonations && (
              <button
                onClick={() => setShowAllDonations(true)}
                className="text-[#FF7058] text-sm lg:text-base hover:underline font-medium flex items-center gap-2 hover:text-[#ff8068] transition-colors"
              >
                {t('view_more')}
              </button>
            )}
          </div>
          <div className="space-y-4">
            {visibleDonations.map((donation, index) => (
              <div key={index} className="transform transition-all hover:scale-[1.01]">
                <DonationCard
                  location={donation.location}
                  items={donation.items}
                  status={donation.status}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
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
                  title={t(article.title.toLowerCase())}
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
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white p-6">
        {content}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block min-h-screen bg-[#fafafa]">
        <div className="max-w-7xl mx-auto py-12 px-8">
          {content}
        </div>
      </div>
    </>
  );
}
