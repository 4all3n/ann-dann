'use client';

import { useRouter } from 'next/navigation';

interface RequestCardProps {
  name: string;
  quantity: number;
  location: string;
}

const RequestCard = ({ name, quantity, location }: RequestCardProps) => {
  const router = useRouter();

  const handleViewDonations = () => {
    router.push('/volunteer/donation');
  };

  return (
    <div className="bg-[#FFF5F5] rounded-lg p-4 mb-4">
      <div className="flex flex-col gap-2">
        <p className="text-gray-800 font-medium">
          {name} is requesting food for {quantity}
          <br />
          {location}
        </p>
        <div className="flex justify-end">
          <button 
            onClick={handleViewDonations}
            className="text-[#FF7058] text-sm whitespace-nowrap font-semibold hover:text-[#ff5252] transition-colors"
          >
            View Available Donations
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
