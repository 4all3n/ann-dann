'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./logo.png";
import { useLanguage } from "./context/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col items-center justify-center p-6 min-h-screen">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <Image
              src={logo}
              alt="Ann Daan Logo"
              width={200}
              height={100}
              className="w-auto h-auto"
            />
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {t('welcome')}
            </h1>
            <p className="text-gray-600">
              {t('welcome_subtitle')}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={() => router.push('/select_role')}
            className="w-full bg-[#FF7058] text-white py-4 rounded-xl font-medium mt-12 hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
          >
            {t('next')}
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Section with Image */}
        <div className="w-1/2 bg-[#FFF1F0] flex items-center justify-center p-12">
          <Image
            src={logo}
            alt="Ann Daan Logo"
            width={400}
            height={200}
            className="w-auto h-auto max-w-xl"
          />
        </div>

        {/* Right Section with Content */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              {t('welcome')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('welcome_subtitle')}
            </p>
            <button
              onClick={() => router.push('/select_role')}
              className="w-full bg-[#FF7058] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
            >
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
