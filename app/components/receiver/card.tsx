import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface RequestCardProps {
  name: string;
  distance: string;
  image: string | StaticImageData;
  status: 'Processing' | 'Completed';
}

export default function RequestCard({ name, distance, image, status }: RequestCardProps) {
  return (
    <div className="bg-[#FFF1F0] rounded-2xl p-4 mb-3 relative min-h-[120px]">
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-grow pt-1">
          <h3 className="text-xl font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-gray-500">{distance}</p>
        </div>

        {/* Status Badge - Absolute positioned */}
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
            status === 'Processing' 
              ? 'bg-[#FF7058] text-white' 
              : 'border border-[#FF7058] text-[#FF7058]'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
