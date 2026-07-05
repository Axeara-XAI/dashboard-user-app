import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { patients, assessments } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

// KUNCI PERBAIKAN: Paksa Next.js untuk berjalan secara dinamis saat runtime di Azure
export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const patientId = parseInt(params.id);
    if (isNaN(patientId)) {
      return NextResponse.json({ success: false, message: 'ID pasien tidak valid.' }, { status: 400 });
    }

    // Hapus manual assessments terlebih dahulu
    await db.delete(assessments).where(eq(assessments.patientId, patientId));
    
    // Hapus pasien utama
    await db.delete(patients).where(eq(patients.id, patientId));

    return NextResponse.json({ success: true, message: 'Data pasien berhasil dihapus.' });
  } catch (error: any) {
    console.error('Error deleting patient:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}