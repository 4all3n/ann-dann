'use client';

import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import donor from './assets/donor.png'
import volunteer from './assets/Volunteer.png'
import receiver from './assets/receiver.png'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const { t } = useLanguage()

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate based on role
      if (selectedRole === 'RECEIVER') {
        router.push('/receiver/home')
      } else {
        router.push(`/${selectedRole.toLowerCase()}/details`)
      }
    }
  }

  const roles = [
    {
      id: 'DONOR',
      icon: donor,
      title: t('donor'),
      description: t('donor_description'),
    },
    {
      id: 'RECEIVER',
      icon: receiver,
      title: t('receiver'),
      description: t('receiver_description'),
    },
    {
      id: 'VOLUNTEER',
      icon: volunteer,
      title: t('volunteer'),
      description: t('volunteer_description'),
    },
  ]

  const content = (
    <>
      <div className="mb-8 lg:mb-12 lg:text-center">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">
          {t('select_role')}
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mt-2 lg:mt-3">
          {t('select_role_description')}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 lg:p-6 mb-6 lg:mb-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex lg:flex-col lg:items-center p-4 lg:p-6 cursor-pointer rounded-xl transition-all hover:scale-[1.02] mb-4 lg:mb-0 ${
                selectedRole === role.id
                  ? 'bg-[#FFF5F5] border-2 border-[#FF7058] shadow-lg shadow-[#FF7058]/5'
                  : 'hover:bg-gray-50 border-2 border-transparent hover:shadow-md'
              }`}
            >
              <div className="mr-4 lg:mr-0 lg:mb-6">
                <Image
                  src={role.icon}
                  alt={role.title}
                  className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
                />
              </div>
              <div className="lg:text-center">
                <h2 className={`font-semibold text-lg lg:text-xl mb-2 ${
                  selectedRole === role.id ? 'text-[#FF7058]' : 'text-gray-900'
                }`}>{role.title}</h2>
                <p className="text-sm lg:text-base text-gray-600 lg:leading-relaxed">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:max-w-md lg:mx-auto w-full">
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full py-4 rounded-xl text-lg font-medium transition-all transform hover:scale-[1.02] focus:scale-[0.98] ${
            selectedRole
              ? 'bg-[#FF7058] text-white hover:bg-[#ff8068] shadow-md shadow-[#FF7058]/10'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('continue')}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-white p-6 flex flex-col">
        <div className="max-w-md mx-auto mt-24 flex-1">
          {content}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto w-full py-24 px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
            {content}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page