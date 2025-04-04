import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
}

const adminDb = getFirestore();

export interface VolunteerData {
  fullName: string;
  phoneNumber: string;
  occupation: string;
  address: string;
  pinCode: string;
  aadharId: string;
  timeSlot: string;
  days: string[];
  createdAt: Date;
}

export async function addVolunteer(volunteerData: Omit<VolunteerData, 'createdAt'>) {
  try {
    const docRef = await adminDb.collection('volunteers').add({
      ...volunteerData,
      createdAt: new Date()
    });

    return {
      success: true,
      id: docRef.id,
      data: volunteerData
    };
  } catch (error) {
    console.error('Error adding volunteer:', error);
    throw error;
  }
}

export { adminDb }; 