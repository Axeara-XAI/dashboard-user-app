import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { patients } from '../../../db/schema';
import { desc } from 'drizzle-orm';

/**
 * GET /api/get-patients
 * Mengambil semua data pasien dari database, diurutkan dari yang terbaru.
 */
export async function GET() {
  try {
    const allPatients = await db
      .select({
        id: patients.id,
        patientName: patients.patientName,
        dateOfBirth: patients.dateOfBirth,
        medicalRecordNumber: patients.medicalRecordNumber,
        createdAt: patients.createdAt,
      })
      .from(patients)
      .orderBy(desc(patients.id));

    return NextResponse.json({ success: true, data: allPatients });
  } catch (error: any) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
