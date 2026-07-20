import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await db.users.findUnique({
      where: { email: session.user.email }
    });

    if (!dbUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
    }

    const resolvedParams = await params;
    const patientId = parseInt(resolvedParams.patientId, 10);

    if (isNaN(patientId)) {
      return NextResponse.json(
        { success: false, message: 'patientId tidak valid.' },
        { status: 400 }
      );
    }

    // Pastikan patient yang diminta adalah milik user yang sedang login
    const patientCheck = await db.patients.findFirst({
      where: { id: patientId }
    });

    if (!patientCheck) {
      return NextResponse.json({ success: false, message: 'Patient not found or unauthorized' }, { status: 403 });
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