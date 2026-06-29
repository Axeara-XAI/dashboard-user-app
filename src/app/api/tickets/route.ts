import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { tickets } from '../../../db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allTickets = await db.select().from(tickets).orderBy(desc(tickets.createdAt));
    return NextResponse.json({ success: true, data: allTickets });
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, message, submittedBy = 'Guest' } = body;

    if (!subject || !message) {
      return NextResponse.json({ success: false, error: 'Subject dan message harus diisi' }, { status: 400 });
    }

    // Generate kode tiket format: TKT-XXXXXX (6 digit acak)
    const ticketCode = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTicket = await db.insert(tickets).values({
      ticketCode,
      subject,
      message,
      submittedBy,
      status: 'open'
    }).returning();

    return NextResponse.json({ success: true, data: newTicket[0] });
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
