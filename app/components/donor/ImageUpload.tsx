import { useState, useRef } from 'react';
import { IoImageOutline } from 'react-icons/io5';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 3 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = maxImages - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImagesChange([...images, result]);
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = '';
  };

  return (
    <div className="flex gap-4 items-center">
      {images.map((image, index) => (
        <div
          key={index}
          className="w-24 h-24 border border-gray-300 rounded-xl overflow-hidden"
        >
          <img
            src={image}
            alt={`Upload ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {images.length < maxImages && (
        <>
          <button
            type="button"
            onClick={handleImageClick}
            className="w-24 h-24 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:border-transparent"
          >
            <IoImageOutline className="text-2xl text-gray-400" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
} 