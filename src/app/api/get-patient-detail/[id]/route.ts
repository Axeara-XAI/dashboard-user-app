import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
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

    const params = await props.params;
    const patientId = parseInt(params.id, 10);
    
    if (isNaN(patientId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' });
    }

    const patient = await db.patients.findFirst({
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