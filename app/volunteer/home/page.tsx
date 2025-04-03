'use client';

import { useState } from 'react';
import RequestCard from '@/app/components/volunteer/card';
import CommunityArticle from '@/app/components/volunteer/community';

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
      image: '/placeholder.jpg',
      title: 'NAME OF ARTICLE',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      image: '/placeholder.jpg',
      title: 'NAME OF ARTICLE',
      description: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      image: '/placeholder.jpg',
      title: 'NAME OF ARTICLE',
      description: 'Lorem ipsum dolor sit amet consectetur.',
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
              onClick={toggleRequests}
              className="text-[#FF7058] text-sm font-medium w-full hover:text-[#ff5252] transition-colors flex items-center justify-center gap-1"
            >
              {showAllRequests ? (
                <>
                  <span className='bg-[#FF7058] text-white px-2 py-2 font-semibold rounded-full'>SHOW LESS</span>
                </>
              ) : (
                <>
                  <span className='bg-[#FF7058] text-white px-2 py-2 font-semibold rounded-full'>SHOW MORE</span>
                </>
              )}
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
