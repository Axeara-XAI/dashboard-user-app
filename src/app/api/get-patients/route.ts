import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let dbUser = await db.users.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) {
      dbUser = await db.users.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'Doctor',
        }
      });
    }

    const allPatients = await db.patients.findMany({
      select: {
        id: true,
        patient_name: true,
        date_of_birth: true,
        medical_record_number: true,
        blood_type: true,
        patient_status: true,
        health_insurance: true,
        primary_risk_factor: true,
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
      bloodType: p.blood_type,
      patientStatus: p.patient_status,
      healthInsurance: p.health_insurance,
      primaryRiskFactor: p.primary_risk_factor,
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