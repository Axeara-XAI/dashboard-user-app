import { NextResponse } from 'next/server';
import { db } from '../../../../db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const assessmentId = parseInt(params.id, 10);
    
    if (isNaN(assessmentId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' });
    }

    const assessment = await db.assessments.findUnique({
      where: { id: assessmentId },
      include: {
        patients: {
          select: {
            id: true,
            patient_name: true,
            medical_record_number: true,
            date_of_birth: true,
            father_name: true,
          }
        },
        assessment_results: true,
        shap_explanations: {
          orderBy: { rank_order: 'asc' }
        },
        dice_scenarios: {
          orderBy: { scenario_number: 'asc' },
          include: {
            dice_changes: true
          }
        }
      }
    });

    if (!assessment) {
      return NextResponse.json({ success: false, message: 'Assessment not found' });
    }

    return NextResponse.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    console.error('Error fetching assessment report:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
