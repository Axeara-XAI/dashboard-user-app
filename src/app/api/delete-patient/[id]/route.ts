import { NextResponse } from 'next/server';
import { db } from '../../../../db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
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
      return NextResponse.json({ success: false, message: 'ID pasien tidak valid.' }, { status: 400 });
    }

    await db.patients.deleteMany({
      where: {
        id: patientId
      }
    });

    return NextResponse.json({ success: true, message: 'Data pasien berhasil dihapus.' });
  } catch (error: any) {
    console.error('Error deleting patient:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}