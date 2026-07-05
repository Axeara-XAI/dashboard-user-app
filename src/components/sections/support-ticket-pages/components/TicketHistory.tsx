'use client';

import React from 'react';
import { makeStyles, tokens, Card, Title3, Text, Spinner, Badge } from '@fluentui/react-components';
import { Receipt24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  ticketListCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: tokens.colorNeutralBackground2
  },
  ticketItem: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});

interface TicketItem {
  id: string | number;
  ticketCode: string;
  status: 'open' | 'in_progress' | 'closed';
  subject: string;
  message: string;
  createdAt: string;
  adminReply?: string;
}

interface TicketHistoryProps {
  tickets: TicketItem[];
  isLoading: boolean;
}

export default function TicketHistory({ tickets, isLoading }: TicketHistoryProps) {
  const styles = useStyles();

  return (
    <Card className={styles.ticketListCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Receipt24Regular style={{ color: tokens.colorBrandForeground1 }} />
        <Title3>Riwayat Tiket Saya</Title3>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}><Spinner /></div>
      ) : tickets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px', color: tokens.colorNeutralForeground3 }}>
          Belum ada tiket bantuan yang diajukan.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tickets.map(ticket => (
            <div key={ticket.id} className={styles.ticketItem}>
              
              <div className={styles.ticketHeader}>
                <Text weight="bold">{ticket.ticketCode}</Text>
                <Badge appearance="filled" color={
                  ticket.status === 'open' ? 'danger' : 
                  ticket.status === 'in_progress' ? 'warning' : 'success'
                }>
                  {ticket.status === 'open' ? 'Menunggu' : 
                   ticket.status === 'in_progress' ? 'Diproses' : 'Selesai'}
                </Badge>
              </div>

              <Text weight="semibold" size={400}>{ticket.subject}</Text>
              
              <Text size={300} style={{ color: tokens.colorNeutralForeground2, fontStyle: 'italic' }}>
                {new Date(ticket.createdAt).toLocaleString('id-ID')}
              </Text>
              
              <Text size={300} style={{ marginTop: '8px', padding: '8px', backgroundColor: tokens.colorNeutralBackground2, borderRadius: '4px' }}>
                {ticket.message}
              </Text>
              
              {ticket.adminReply && (
                <div style={{ marginTop: '8px', padding: '12px', backgroundColor: tokens.colorBrandBackground2, borderRadius: '4px', borderLeft: `3px solid ${tokens.colorBrandForeground1}` }}>
                  <Text weight="bold" size={300} style={{ display: 'block', color: tokens.colorBrandForeground1, marginBottom: '4px' }}>Balasan Admin:</Text>
                  <Text size={300}>{ticket.adminReply}</Text>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </Card>
  );
}