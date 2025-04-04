import { ReactNode } from 'react';
import Image from 'next/image';
import logo from '@/app/logo.png';

interface DesktopWrapperProps {
  children: ReactNode;
  showSidebar?: boolean;
  heading?: string;
}

export default function DesktopWrapper({ children, showSidebar = true, heading }: DesktopWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Image
          src={logo}
          alt="Ann Daan Logo"
          width={120}
          height={40}
          className="w-auto h-8"
        />
        <div className="flex items-center gap-6">
          <a href="/about" className="text-gray-600 hover:text-[#FF7058]">About</a>
          <a href="/contact" className="text-gray-600 hover:text-[#FF7058]">Contact</a>
          <a href="/help" className="text-gray-600 hover:text-[#FF7058]">Help</a>
        </div>
      </nav>

      <div className="lg:flex min-h-[calc(100vh-72px)]">
        {/* Sidebar for desktop */}
        {showSidebar && (
          <div className="hidden lg:block w-80 bg-white border-r border-gray-200 p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
              <div className="space-y-2">
                <a href="/dashboard" className="block text-gray-600 hover:text-[#FF7058] py-2">Dashboard</a>
                <a href="/profile" className="block text-gray-600 hover:text-[#FF7058] py-2">Profile</a>
                <a href="/settings" className="block text-gray-600 hover:text-[#FF7058] py-2">Settings</a>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 lg:p-8">
          {heading && (
            <h1 className="text-2xl font-bold text-gray-900 mb-6 hidden lg:block">{heading}</h1>
          )}
          
          {/* Mobile view remains unchanged */}
          <div className="lg:hidden">
            {children}
          </div>

          {/* Desktop view gets additional styling */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-4xl mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 