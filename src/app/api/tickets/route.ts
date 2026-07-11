import { NextResponse } from 'next/server';
import { db } from '../../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allTickets = await db.tickets.findMany({
      orderBy: { created_at: 'desc' },
      include: {
        ticket_messages: {
          orderBy: { created_at: 'asc' },
        },
        users: true,
      },
    });

    const formattedTickets = allTickets.map((t) => ({
      id: t.id,
      ticketCode: `TKT-${t.id.toString().padStart(6, '0')}`,
      subject: t.subject,
      status: t.status,
      submittedBy: t.users?.name || 'Guest',
      message: t.ticket_messages[0]?.message || '',
      adminReply: t.ticket_messages.length > 1 ? t.ticket_messages[t.ticket_messages.length - 1].message : null,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    }));

    return NextResponse.json({ success: true, data: formattedTickets });
  } catch (error: any) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { subject, message } = body;

    if (!subject || !message) {
      return NextResponse.json({ success: false, error: 'Subject dan message harus diisi' }, { status: 400 });
    }

    let guestUser = await db.users.findUnique({ where: { email: 'guest@axara.com' } });
    if (!guestUser) {
      guestUser = await db.users.create({
        data: {
          email: 'guest@axara.com',
          name: 'Guest User',
        },
      });
    }

    const newTicket = await db.tickets.create({
      data: {
        subject,
        users: { connect: { id: guestUser.id } },
        status: 'open',
        updated_at: new Date(),
        ticket_messages: {
          create: {
            message: message,
            users: { connect: { id: guestUser.id } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: newTicket });
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
