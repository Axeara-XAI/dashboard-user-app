import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { patients, assessments } from '../../../../db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const patientId = parseInt(params.id);
    if (isNaN(patientId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' });
    }

    const patientRes = await db.select().from(patients).where(eq(patients.id, patientId)).limit(1);
    if (patientRes.length === 0) {
      return NextResponse.json({ success: false, message: 'Patient not found' });
    }

    const assessmentRes = await db.select().from(assessments)
      .where(eq(assessments.patientId, patientId))
      .orderBy(desc(assessments.id))
      .limit(1);

    return NextResponse.json({ 
      success: true, 
      data: { 
        patient: patientRes[0], 
        assessment: assessmentRes[0] || null 
      } 
    });
  } catch (error: any) {
    console.error('Error fetching patient detail:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
