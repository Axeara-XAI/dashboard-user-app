import { NextResponse } from 'next/server';
import { db } from '../../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Total Patients
    const totalPatients = await db.patients.count();

    // 2. Total Assessments
    const totalAssessments = await db.assessments.count();

    // 3. FGR Detected (Risk Label == 'FGR')
    const totalFGR = await db.assessment_results.count({
      where: {
        risk_label: 'FGR',
      },
    });

    const fgrPercentage = totalAssessments > 0 ? Math.round((totalFGR / totalAssessments) * 100) : 0;

    // 4. Latest 5 Patients/Assessments
    const rawAssessments = await db.assessments.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 5,
      include: {
        patients: true,
        assessment_results: true,
      },
    });

    const latestAssessments = rawAssessments.map((a) => ({
      id: a.id,
      patientName: a.patients?.patient_name || 'Anonim',
      medicalRecordNumber: a.patients?.medical_record_number || '',
      date: a.created_at,
      riskLabel: a.assessment_results?.risk_label || 'N/A',
      probability: a.assessment_results?.probability || 0,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalPatients,
        totalAssessments,
        fgrPercentage,
        totalFGR,
        totalNonFGR: totalAssessments - totalFGR,
        latestAssessments,
      },
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}