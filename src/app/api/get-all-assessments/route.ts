import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { patients, assessments, assessmentResults } from '../../../db/schema';
import { sql, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allAssessments = await db.select({
      id: assessments.id,
      patientId: patients.id,
      patientName: patients.patientName,
      medicalRecordNumber: patients.medicalRecordNumber,
      date: assessments.createdAt,
      riskLabel: assessmentResults.riskLabel,
      probability: assessmentResults.probability,
    })
    .from(assessments)
    .innerJoin(patients, sql`${assessments.patientId} = ${patients.id}`)
    .innerJoin(assessmentResults, sql`${assessments.id} = ${assessmentResults.assessmentId}`)
    .orderBy(desc(assessments.createdAt));

    return NextResponse.json({
      success: true,
      data: allAssessments
    });
  } catch (error: any) {
    console.error('Error fetching all assessments:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
