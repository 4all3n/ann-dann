'use client';

import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import donor from './assets/donor.png'
import volunteer from './assets/Volunteer.png'
import receiver from './assets/receiver.png'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate based on role
      router.push(`/${selectedRole.toLowerCase()}_details`)
    }
  }

  const roles = [
    {
      id: 'DONOR',
      icon: donor,
      title: 'DONOR',
      description: 'Donate some food to the needful.',
    },
    {
      id: 'RECEIVER',
      icon: receiver,
      title: 'RECEIVER',
      description: 'Get the food.',
    },
    {
      id: 'VOLUNTEER',
      icon: volunteer,
      title: 'VOLUNTEER',
      description: 'Pickup and deliver food to the needful',
    },
  ]

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="max-w-md mx-auto mt-24 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 capitalize">
            Select your role
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            ibcjwdbcvbwdoivhsolvhisdhvishvihslov hoishvoishvhio
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center p-4 cursor-pointer rounded-lg transition-colors ${
                selectedRole === role.id
                  ? 'bg-[#FFF5F5] border-2 border-[#FF7058]'
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="mr-4">
                <Image
                  src={role.icon}
                  alt={role.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h2 className={`font-medium text-lg ${
                  selectedRole === role.id ? 'text-[#FF7058]' : 'text-gray-900'
                }`}>{role.title}</h2>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-md mx-auto w-full">
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`w-full py-3 rounded-md transition-colors ${
            selectedRole
              ? 'bg-[#FF7058] text-white hover:bg-[#FF5252]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}

export default Page