'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from './assets/Logo.png';
import RequestCard from '@/app/components/receiver/card';
import CommunityArticle from '@/app/components/donor/community';
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
      title: 'DISCUSSION',
      description: 'Hey everyone, I run a restaurant and often have excess food. What are the best practices to ensure food is stored safely before donation',
    },
    {
      image: c2,
      title: 'ANNOUNCEMENT',
      description: 'We have seen an increase in food donations, but we need more volunteers for delivery in Bengaluru. If you\'re interested, please sign up on our portal',
    },
  ];

  const visibleRequests = showAllRequests ? requestHistory : requestHistory.slice(0, 3);

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Image
          src={logo}
          alt="Ann Dann Logo"
          width={100}
          height={40}
          className="h-10 w-auto"
        />
        <button
          onClick={() => router.push('/select_role')}
          className="text-white bg-[#FF7058] px-4 py-2 rounded-xl font-medium"
        >
          User Login
        </button>
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Rescue. Share. Nourish.
        </h1>
        <p className="text-gray-600 mb-6">
          Because No Meal Should Go to Waste!
        </p>

        {/* Create Request Button */}
        <div className="bg-[#FFF1F0] rounded-xl p-4 flex justify-center items-center flex-col gap-2">
          <p className="text-gray-600 mb-2 text-center">Know someone in need of a meal?</p>
          <button 
            onClick={() => router.push('/receiver/create')}
            className="w-full bg-[#FF7058] text-white py-3 rounded-xl font-medium hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
          >
            Create Food Request
          </button>
        </div>
      </div>

      {/* Request History */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">REQUEST HISTORY</h2>
        <div className="space-y-4">
          {visibleRequests.map((request, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 ease-in-out"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
              }}
            >
              <RequestCard
                name={request.name}
                distance={request.distance}
                image={request.image}
                status={request.status}
              />
            </div>
          ))}
          {requestHistory.length > 3 && (
            <button
              onClick={() => setShowAllRequests(!showAllRequests)}
              className="text-white font-semibold bg-[#FF7058] px-4 py-2 rounded-xl text-sm justify-center mx-auto  hover:underline flex items-center gap-1"
            >
              {showAllRequests ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>

      {/* Community */}
      <div>
        <h2 className="text-xl font-semibold mb-4">COMMUNITY</h2>
        <div className="space-y-4">
          {communityPosts.map((post, index) => (
            <CommunityArticle
              key={index}
              image={post.image}
              title={post.title}
              description={post.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
