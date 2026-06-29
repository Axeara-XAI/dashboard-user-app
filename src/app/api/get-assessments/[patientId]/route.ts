import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { assessments, assessmentResults } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * GET /api/get-assessments/[patientId]
 * Mengambil semua asesmen beserta hasil AI untuk satu pasien tertentu.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const resolvedParams = await params;
    const patientId = parseInt(resolvedParams.patientId, 10);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { success: false, message: 'patientId tidak valid.' },
        { status: 400 }
      );
    }

    // JOIN assessments + assessment_results
    const records = await db
      .select({
        assessmentId: assessments.id,
        createdAt: assessments.createdAt,
        riskLabel: assessmentResults.riskLabel,
        probability: assessmentResults.probability,
        narrativeExplanation: assessmentResults.narrativeExplanation,
        narrativeRecommendation: assessmentResults.narrativeRecommendation,
      })
      .from(assessments)
      .leftJoin(assessmentResults, eq(assessmentResults.assessmentId, assessments.id))
      .where(eq(assessments.patientId, patientId))
      .orderBy(desc(assessments.id));

    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
