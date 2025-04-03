'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SuccessModal = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="fixed inset-0 bg-[#0000002c] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FF7058] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <p className="text-center text-gray-800 font-medium mb-6">
          Your details successfully<br />Enrolled !
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-3 bg-[#FF7058] text-white rounded-md font-medium"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};

const ErrorModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-[#0000002c] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center">
        {/* Error Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FF7058] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Message */}
        <p className="text-center text-gray-800 font-medium mb-6">
          Please select at least<br />one day!
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#FF7058] text-white rounded-md font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const AvailabilityPage = () => {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const weekdays = ['M', 'T', 'W', 'Th', 'F'];
  const weekendDays = ['S', 'S'];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleGroupSelect = (group: 'Weekdays' | 'Weekends') => {
    if (group === 'Weekdays') {
      setSelectedDays(prev => {
        const hasAllWeekdays = weekdays.every(day => prev.includes(day));
        return hasAllWeekdays
          ? prev.filter(day => !weekdays.includes(day))
          : [...new Set([...prev, ...weekdays])];
      });
    } else if (group === 'Weekends') {
      setSelectedDays(prev => {
        const hasAllWeekends = weekendDays.every(day => prev.includes(day));
        return hasAllWeekends
          ? prev.filter(day => !weekendDays.includes(day))
          : [...new Set([...prev, ...weekendDays])];
      });
    }
  };

  const handleNext = () => {
    if (selectedDays.length === 0) {
      setShowErrorModal(true);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleContinue = () => {
    router.push('/volunteer/location');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="max-w-md mx-auto mt-16 flex-1">
        <h1 className="text-3xl font-bold mb-6">Volunteer Availability</h1>

        {/* Time Slots */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
          {['Morning', 'Afternoon', 'Night'].map((time) => (
            <div key={time} className="mb-4 last:mb-0">
              <label className="flex items-center cursor-pointer">
                <div 
                  onClick={() => handleTimeSelect(time)}
                  className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                    ${selectedTime === time ? 'border-[#FF7058]' : 'border-gray-300'}`}
                >
                  {selectedTime === time && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF7058]"></div>
                  )}
                </div>
                <span className="text-gray-700">{time}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Day & Date */}
        <h2 className="text-2xl font-semibold mb-6">DAY</h2>
        
        {/* Weekday indicators */}
        <div className="p-2 mb-6">
          <div className="flex gap-2 font-semibold">
            {['M', 'T', 'W', 'Th', 'F', 'S', 'S'].map((day, index) => (
              <div
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#F7FAFC]
                  ${selectedDays.includes(day) 
                    ? 'border-2 border-[#FF7058] text-[#FF7058]' 
                    : 'text-gray-600'}
                  ${index === 6 ? 'text-red-500' : ''}
                  ${day === 'Th' ? 'text-sm' : 'text-base'}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Day Preferences */}
        <div className="space-y-6 mb-8">
          {['Weekdays', 'Weekends'].map((preference) => (
            <div key={preference} className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div 
                  onClick={() => handleGroupSelect(preference as 'Weekdays' | 'Weekends')}
                  className={`w-6 h-6 rounded-lg mr-3 flex items-center justify-center
                    ${(preference === 'Weekdays' && weekdays.every(day => selectedDays.includes(day))) ||
                      (preference === 'Weekends' && weekendDays.every(day => selectedDays.includes(day)))
                        ? 'bg-[#FF7058]' 
                        : 'border-2 border-gray-300'}`}
                >
                  {((preference === 'Weekdays' && weekdays.every(day => selectedDays.includes(day))) ||
                    (preference === 'Weekends' && weekendDays.every(day => selectedDays.includes(day)))) && (
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xl text-gray-800">{preference}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full py-3 bg-[#FF7058] text-white rounded-md font-medium"
      >
        NEXT
      </button>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal onContinue={handleContinue} />}
      
      {/* Error Modal */}
      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}
    </div>
  );
};

export default AvailabilityPage;
