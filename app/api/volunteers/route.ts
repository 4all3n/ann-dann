import { NextResponse } from 'next/server';
import { addVolunteer } from '@/app/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Validate required fields
    const requiredFields = [
      'fullName',
      'phoneNumber',
      'occupation',
      'address',
      'pinCode',
      'aadharId',
      'timeSlot',
      'days'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate phone number format (10 digits)
    if (!/^\d{10}$/.test(data.phoneNumber)) {
      return NextResponse.json(
        { error: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    // Validate pin code format (6 digits)
    if (!/^\d{6}$/.test(data.pinCode)) {
      return NextResponse.json(
        { error: 'Pin code must be 6 digits' },
        { status: 400 }
      );
    }

    // Validate Aadhar ID format (xxxx-xxxx-xxxx)
    if (!/^\d{4}-\d{4}-\d{4}$/.test(data.aadharId)) {
      return NextResponse.json(
        { error: 'Invalid Aadhar ID format. Use: xxxx-xxxx-xxxx' },
        { status: 400 }
      );
    }

    // Validate time slot
    const validTimeSlots = ['Morning', 'Afternoon', 'Night'];
    if (!validTimeSlots.includes(data.timeSlot)) {
      return NextResponse.json(
        { error: 'Invalid time slot. Use: Morning, Afternoon, or Night' },
        { status: 400 }
      );
    }

    // Validate days
    const validDays = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'] as const;
    if (!Array.isArray(data.days) || !data.days.every((day: string) => validDays.includes(day as typeof validDays[number]))) {
      return NextResponse.json(
        { error: 'Invalid days format. Use: M, T, W, Th, F, Sa, Su' },
        { status: 400 }
      );
    }

    // Add volunteer to Firebase
    const result = await addVolunteer(data);
    console.log('Firebase result:', result);

    return NextResponse.json({
      status: 'success',
      volunteer: {
        id: result.id,
        ...result.data,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error in volunteer API route:', error);
    return NextResponse.json(
      { error: 'Failed to add volunteer. Please try again.' },
      { status: 500 }
    );
  }
} 