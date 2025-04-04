'use client';

import { useState } from 'react';
import RequestCard from '@/app/components/volunteer/card';
import CommunityArticle from '@/app/components/volunteer/community';
import c1 from './assets/c1.png';
import c2 from './assets/c2.png';

const VolunteerHome = () => {
  const [showAllRequests, setShowAllRequests] = useState(false);

  const stats = [
    { label: 'No of orders delivered', value: '12' },
    { label: 'Feedback received', value: '4' },
    { label: 'Points earned', value: '200' },
  ];

  const requests = [
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
    { name: 'Aditya', quantity: 12, location: 'Kothanur' },
  ];

  const visibleRequests = showAllRequests ? requests : requests.slice(0, 3);

  const toggleRequests = () => {
    setShowAllRequests(!showAllRequests);
  };

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
    {
      image: c1,
      title: 'DISCUSSION',
      description: 'Hey everyone, I run a restaurant and often have leftover food at closing time. What are the best practices to ensure food is stored safely before donation',
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <p className="text-[#FF7058] text-sm mb-1 font-semibold">WELCOME VOLUNTEER</p>
          <h1 className="text-2xl font-bold text-gray-900">Azonix Ken</h1>
        </div>

        {/* Stats Section */}
        <div className="bg-[#FF7058] rounded-lg p-4 mb-8">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-white text-xl font-semibold">{stat.value}</p>
                <p className="text-white text-sm font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requests Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">REQUESTS</h2>
          {visibleRequests.map((request, index) => (
            <RequestCard
              key={index}
              name={request.name}
              quantity={request.quantity}
              location={request.location}
            />
          ))}
           {requests.length > 3 && (
            <button
              onClick={() => setShowAllRequests(!showAllRequests)}
              className="text-white font-semibold bg-[#FF7058] px-4 py-2 rounded-xl text-sm justify-center mx-auto  hover:underline flex items-center gap-1"
            >
              {showAllRequests ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        {/* Community Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">COMMUNITY</h2>
          <div className="grid grid-cols-1 gap-4">
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
    </div>
  );
};

export default VolunteerHome;
