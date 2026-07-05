import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { patients, assessments, assessmentResults } from '../../../db/schema';
import { sql, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Total Patients
    const totalPatientsResult = await db.select({ count: sql<number>`count(*)` }).from(patients);
    const totalPatients = totalPatientsResult[0]?.count || 0;

    // 2. Total Assessments
    const totalAssessmentsResult = await db.select({ count: sql<number>`count(*)` }).from(assessments);
    const totalAssessments = totalAssessmentsResult[0]?.count || 0;

    // 3. FGR Detected (Risk Label == 'FGR')
    const totalFGRResult = await db.select({ count: sql<number>`count(*)` })
      .from(assessmentResults)
      .where(sql`${assessmentResults.riskLabel} = 'FGR'`);
    const totalFGR = totalFGRResult[0]?.count || 0;
    const fgrPercentage = totalAssessments > 0 ? Math.round((totalFGR / totalAssessments) * 100) : 0;

    // 4. Latest 5 Patients/Assessments
    const latestAssessments = await db.select({
      id: assessments.id,
      patientName: patients.patientName,
      medicalRecordNumber: patients.medicalRecordNumber,
      date: assessments.createdAt,
      riskLabel: assessmentResults.riskLabel,
      probability: assessmentResults.probability,
    })
    .from(assessments)
    .innerJoin(patients, sql`${assessments.patientId} = ${patients.id}`)
    .innerJoin(assessmentResults, sql`${assessments.id} = ${assessmentResults.assessmentId}`)
    .orderBy(desc(assessments.createdAt))
    .limit(5);

    return NextResponse.json({
      success: true,
      data: {
        totalPatients,
        totalAssessments,
        fgrPercentage,
        totalFGR,
        totalNonFGR: totalAssessments - totalFGR,
        latestAssessments
      }
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}