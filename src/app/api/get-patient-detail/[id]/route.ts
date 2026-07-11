import { NextResponse } from 'next/server';
import { db } from '../../../../db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const patientId = parseInt(params.id, 10);
    
    if (isNaN(patientId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' });
    }

    const patient = await db.patients.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json({ success: false, message: 'Patient not found' });
    }

    const latestAssessment = await db.assessments.findFirst({
      where: { patient_id: patientId },
      orderBy: { id: 'desc' },
    });

    return NextResponse.json({ 
      success: true, 
      data: { 
        patient, 
        assessment: latestAssessment || null 
      } 
    });
  } catch (error: any) {
    console.error('Error fetching patient detail:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}