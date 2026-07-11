import { NextResponse } from 'next/server';
import { db } from '../../../../db';

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const patientId = parseInt(params.id, 10);
    
    if (isNaN(patientId)) {
      return NextResponse.json({ success: false, message: 'ID pasien tidak valid.' }, { status: 400 });
    }

    await db.assessments.deleteMany({
      where: { patient_id: patientId },
    });
    
    await db.patients.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ success: true, message: 'Data pasien berhasil dihapus.' });
  } catch (error: any) {
    console.error('Error deleting patient:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}