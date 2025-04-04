'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./logo.png";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
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
            Get Ready to make a difference !
          </h1>
          <p className="text-gray-600">
            Get Ready to make a difference ! Get Ready to make a difference ! Get Ready to make a difference !
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => router.push('/select_role')}
          className="w-full bg-[#FF7058] text-white py-4 rounded-xl font-medium mt-12 hover:bg-[#ff8068] focus:outline-none focus:ring-2 focus:ring-[#FF7058] focus:ring-offset-2"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
