'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DonationCard from '@/app/components/donor/card';
import CommunityArticle from '@/app/components/donor/community';

export default function DonorHomePage() {
  const router = useRouter();
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
      image: '/community1.jpg',
      title: 'ARTICLE',
      description: 'Top SEO Issues in Remember You Should Resolve',
    },
    {
      image: '/community2.jpg',
      title: 'ARTICLE',
      description: 'Top SEO Issues in Remember You Should Resolve',
    },
    {
      image: '/community3.jpg',
      title: 'ARTICLE',
      description: 'Top SEO Issues in Remember You Should Resolve',
    },
  ];

  const visibleDonations = showAllDonations ? donationHistory : donationHistory.slice(0, 3);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-600 text-sm mb-1">WELCOME DONOR</h1>
        <h2 className="text-2xl font-semibold text-gray-900">Azonix Ken</h2>
      </div>

      {/* Stats */}
      <div className="bg-[#FF7058] text-white rounded-xl p-4 mb-8 flex justify-between">
        <div className="text-center">
          <div className="text-2xl font-semibold">233</div>
          <div className="text-sm font-semibold">Total donations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold">167</div>
          <div className="text-sm font-semibold">Donations received</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold">2000</div>
          <div className="text-sm font-semibold">People reached</div>
        </div>
      </div>

      {/* Create Donation Button */}
      <div className="bg-[#FFF1F0] rounded-xl p-4 mb-8">
        <p className="text-gray-600 mb-2">Got extra food? Share it with those in need!</p>
        <button 
          onClick={() => router.push('/donor/create')}
          className="w-full bg-[#FF7058] text-white py-3 rounded-xl font-medium"
        >
          + Create Donation Post
        </button>
      </div>

      {/* Donation History */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">DONATION HISTORY</h2>
        <div className="space-y-4">
          {visibleDonations.map((donation, index) => (
            <DonationCard
              key={index}
              location={donation.location}
              items={donation.items}
              status={donation.status}
            />
          ))}
          {donationHistory.length > 3 && !showAllDonations && (
            <button
              onClick={() => setShowAllDonations(true)}
              className="text-[#FF7058] text-sm hover:underline"
            >
              + MORE
            </button>
          )}
        </div>
      </div>

      {/* Community */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">COMMUNITY</h2>
        <div className="space-y-4">
          {communityArticles.map((article, index) => (
            <CommunityArticle
              key={index}
              image={article.image}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
