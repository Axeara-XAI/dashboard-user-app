import { NextResponse } from 'next/server';
import { db } from '../../../../db';

export const dynamic = 'force-dynamic';

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

    const records = await db.assessments.findMany({
      where: { patient_id: patientId },
      orderBy: { id: 'desc' },
      include: {
        assessment_results: true,
      },
    });

    const formattedRecords = records.map((a) => ({
      assessmentId: a.id,
      createdAt: a.created_at,
      riskLabel: a.assessment_results?.risk_label || 'N/A',
      probability: a.assessment_results?.probability || 0,
      narrativeExplanation: a.assessment_results?.narrative_explanation || null,
      narrativeRecommendation: a.assessment_results?.narrative_recommendation || null,
    }));

    return NextResponse.json({ success: true, data: formattedRecords });
  } catch (error: any) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}