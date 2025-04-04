'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from './assets/Logo.png';
import RequestCard from '@/app/components/receiver/card';
import CommunityArticle from '@/app/components/donor/community';
import LanguageSelector from '@/app/components/LanguageSelector';
import { useLanguage } from '@/app/context/LanguageContext';
import food1 from './assets/1.png';
import food2 from './assets/2.png';
import food3 from './assets/3.png';
import food4 from './assets/4.png';
import food5 from './assets/5.png';
import c1 from './assets/c1.png';
import c2 from './assets/c2.png';

export default function ReceiverHomePage() {
  const router = useRouter();
  const [showAllRequests, setShowAllRequests] = useState(false);
  const { t } = useLanguage();

  const stats = [
    { label: t('requests_made'), value: '12' },
    { label: t('requests_fulfilled'), value: '8' },
    { label: t('people_helped'), value: '32' },
  ];

  const requestHistory = [
    {
      name: 'Hotel Azonix',
      distance: '2.5 km',
      image: food1,
      status: 'Processing' as const,
    },
    {
      name: 'Hotel Taj',
      distance: '2.5 km',
      image: food2,
      status: 'Completed' as const,
    },
    {
      name: 'Azonix Ken',
      distance: '2.5 km',
      image: food3,
      status: 'Completed' as const,
    },
    {
      name: 'Kake da dhaba',
      distance: '5 km',
      image: food4,
      status: 'Completed' as const,
    },
    {
      name: 'Hotel kaj',
      distance: '1.5 km',
      image: food5,
      status: 'Completed' as const,
    }
  ];

  const communityPosts = [
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
  ];

  const visibleRequests = showAllRequests ? requestHistory : requestHistory.slice(0, 3);

  const content = (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8 lg:mb-12">
        <Image
          src={logo}
          alt="Ann Dann Logo"
          width={100}
          height={40}
          className="h-10 w-auto lg:h-12"
        />
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <button
            onClick={() => router.push('/select_role')}
            className="text-white bg-[#FF7058] px-4 py-2 lg:px-6 lg:py-3 rounded-xl font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
          >
            {t('user_login')}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <div className="lg:text-center mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
            {t('hero_title')}
          </h1>
          <p className="text-gray-600 lg:text-lg">
            {t('hero_subtitle')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-[#FF7058] to-[#ff8068] text-white rounded-2xl p-4 lg:p-8 mb-8 flex justify-between shadow-lg shadow-[#FF7058]/10 hover:shadow-xl hover:shadow-[#FF7058]/20 transition-all">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
              <div className="text-2xl lg:text-5xl font-semibold mb-2">{stat.value}</div>
              <div className="text-sm lg:text-base font-medium text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Create Request Button */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 lg:max-w-full lg:mx-auto shadow-lg hover:shadow-xl transition-all border border-gray-100">
          <p className="text-gray-600 mb-4 lg:text-lg text-center">{t('need_meal_prompt')}</p>
          <div className="flex justify-center">
            <button 
              onClick={() => router.push('/receiver/request')}
              className="w-full max-w-md bg-[#FF7058] text-white py-3 lg:py-4 rounded-xl font-medium hover:bg-[#ff8068] transition-all transform hover:scale-[1.02] focus:scale-[0.98] shadow-md shadow-[#FF7058]/10"
            >
              {t('create_food_request')}
            </button>
          </div>
        </div>
      </div>

      {/* Request History and Community Section */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        {/* Request History */}
        <div className="mb-12 lg:mb-0 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{t('request_history')}</h2>
            {requestHistory.length > 3 && (
              <button
                onClick={() => setShowAllRequests(!showAllRequests)}
                className="text-[#FF7058] text-sm lg:text-base hover:underline font-medium flex items-center gap-2 hover:text-[#ff8068] transition-colors"
              >
                {showAllRequests ? t('show_less') : t('view_more')}
              </button>
            )}
          </div>
          <div className="space-y-4">
            {visibleRequests.map((request, index) => (
              <div 
                key={index} 
                className="transform transition-all hover:scale-[1.01]"
              >
                <RequestCard
                  name={request.name}
                  distance={request.distance}
                  image={request.image}
                  status={request.status}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="lg:bg-white lg:p-8 lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-100">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">{t('community')}</h2>
          <div className="grid grid-cols-1 gap-6">
            {communityPosts.map((post, index) => (
              <div 
                key={index} 
                className="transform transition-all hover:scale-[1.02] bg-gray-50 rounded-xl p-4 hover:shadow-md"
              >
                <CommunityArticle
                  image={post.image}
                  title={post.title}
                  description={post.description}
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
}
