'use client';

import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useLanguage } from '@/app/context/LanguageContext';

interface CommunityArticleProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

const CommunityArticle = ({ image, title, description }: CommunityArticleProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video bg-gray-400">
        <Image 
          src={image} 
          alt={t(title.toLowerCase())}
          width={400}
          height={225}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase mb-2">{t(title.toLowerCase())}</p>
        <h3 className="text-xl font-medium text-gray-900">{description}</h3>
      </div>
    </div>
  );
};

export default CommunityArticle;
