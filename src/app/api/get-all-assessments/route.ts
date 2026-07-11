import { NextResponse } from 'next/server';
import { db } from '../../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rawAssessments = await db.assessments.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        patients: true,
        assessment_results: true,
      },
    });

    const allAssessments = rawAssessments.map((a) => ({
      id: a.id,
      patientId: a.patients?.id,
      patientName: a.patients?.patient_name || 'Anonim',
      medicalRecordNumber: a.patients?.medical_record_number || '',
      date: a.created_at,
      riskLabel: a.assessment_results?.risk_label || 'N/A',
      probability: a.assessment_results?.probability || 0,
    }));

    return NextResponse.json({
      success: true,
      data: allAssessments
    });
  } catch (error: any) {
    console.error('Error fetching all assessments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
