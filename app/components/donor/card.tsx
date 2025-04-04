interface DonationCardProps {
  location: string;
  items: {
    name: string;
    quantity: string;
  }[];
  status: 'Pending' | 'Donated';
}

const DonationCard = ({ location, items, status }: DonationCardProps) => {
  return (
    <div className="bg-[#FFF1F0] rounded-xl p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-gray-900">{location}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'Pending' 
            ? 'bg-[#FF7058] text-white' 
            : 'border border-[#FF7058] text-[#FF7058]'
        }`}>
          {status}
        </span>
      </div>

      <div className="space-y-1 mb-2">
        {items.map((item, index) => (
          <div key={index} className="text-gray-600">
            {item.name}: {item.quantity}
          </div>
        ))}
      </div>

    </div>
  );
};

export default DonationCard;
