'use client';

import { useState, useEffect } from 'react';
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

const ErrorModal = ({ message, onClose }: { message: string, onClose: () => void }) => {
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
          {message}
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
  const [errorMessage, setErrorMessage] = useState('');

  const weekdays = ['M', 'T', 'W', 'Th', 'F'];
  const weekendDays = ['Sa', 'Su'];

  useEffect(() => {
    const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
    if (volunteerData.timeSlot) {
      setSelectedTime(volunteerData.timeSlot);
    }
    if (volunteerData.days && Array.isArray(volunteerData.days)) {
      setSelectedDays(volunteerData.days);
    }
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
    volunteerData.timeSlot = time;
    sessionStorage.setItem('volunteerDetails', JSON.stringify(volunteerData));
  };

  const handleDaySelect = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(updatedDays);
    // Update sessionStorage
    const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
    volunteerData.days = updatedDays;
    sessionStorage.setItem('volunteerDetails', JSON.stringify(volunteerData));
  };

  const handleGroupSelect = (group: 'Weekdays' | 'Weekends') => {
    let updatedDays: string[];
    if (group === 'Weekdays') {
      const hasAllWeekdays = weekdays.every(day => selectedDays.includes(day));
      updatedDays = hasAllWeekdays
        ? selectedDays.filter(day => !weekdays.includes(day))
        : [...new Set([...selectedDays, ...weekdays])];
    } else {
      const hasAllWeekends = weekendDays.every(day => selectedDays.includes(day));
      updatedDays = hasAllWeekends
        ? selectedDays.filter(day => !weekendDays.includes(day))
        : [...new Set([...selectedDays, ...weekendDays])];
    }
    
    setSelectedDays(updatedDays);
    // Update sessionStorage
    const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
    volunteerData.days = updatedDays;
    sessionStorage.setItem('volunteerDetails', JSON.stringify(volunteerData));
  };

  const handleContinue = async () => {
    try {
      // Get the complete volunteer data from sessionStorage
      const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
      
      // Make sure we have the latest time slot and days
      volunteerData.timeSlot = selectedTime;
      volunteerData.days = selectedDays;

      // Log the data being sent
      console.log('Sending volunteer data:', volunteerData);

      // Send data to our Next.js API route
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit volunteer data');
      }

      // Clear the session storage after successful submission
      sessionStorage.removeItem('volunteerDetails');
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting volunteer data:', error);
      let errorMessage = 'Failed to submit your details.\nPlease try again.';
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Unable to connect to the server.\nPlease try again later.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
    }
  };

  const handleNext = () => {
    if (!selectedTime) {
      setErrorMessage('Please select a time slot\n(Morning/Afternoon/Night)');
      setShowErrorModal(true);
    } else if (selectedDays.length === 0) {
      setErrorMessage('Please select at least\none day!');
      setShowErrorModal(true);
    } else {
      // Get existing data
      const volunteerData = JSON.parse(sessionStorage.getItem('volunteerDetails') || '{}');
      
      // Update with latest selections
      volunteerData.timeSlot = selectedTime;
      volunteerData.days = selectedDays;
      
      // Save back to sessionStorage
      sessionStorage.setItem('volunteerDetails', JSON.stringify(volunteerData));
      
      // Proceed with submission
      handleContinue();
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <div className="max-w-md mx-auto mt-16 flex-1">
        <h1 className="text-3xl font-bold mb-6">Volunteer Availability</h1>

        {/* Time Slots */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Time Slot</h2>
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
            {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day, index) => (
              <div
                key={day}
                onClick={() => handleDaySelect(day)}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#F7FAFC]
                  ${selectedDays.includes(day) 
                    ? 'border-2 border-[#FF7058] text-[#FF7058]' 
                    : 'text-gray-600'}
                  ${index === 6 ? 'text-red-500' : ''}
                  ${day === 'Th' || day === 'Sa' || day === 'Su' ? 'text-sm' : 'text-base'}`}
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
      {showErrorModal && <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />}
    </div>
  );
};

export default AvailabilityPage;
