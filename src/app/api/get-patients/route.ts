import { NextResponse } from 'next/server';
import { db } from '../../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allPatients = await db.patients.findMany({
      select: {
        id: true,
        patient_name: true,
        date_of_birth: true,
        medical_record_number: true,
        created_at: true,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const formattedPatients = allPatients.map((p) => ({
      id: p.id,
      patientName: p.patient_name,
      dateOfBirth: p.date_of_birth,
      medicalRecordNumber: p.medical_record_number,
      createdAt: p.created_at,
    }));

    return NextResponse.json({ success: true, data: formattedPatients });
  } catch (error: any) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}