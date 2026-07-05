'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Button, Title3, Body1, Link } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

// Import sub-components & UI
import AlertModal from '../../ui/AlertModal';
import TicketForm from './components/TicketForm';
import TicketHistory from './components/TicketHistory';

const useStyles = makeStyles({
  pageWrapper: {
    padding: '24px 32px 32px 32px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px)',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    boxShadow: tokens.shadow4,
  },
  innerContent: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  breadcrumb: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '24px 24px 0 24px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground2,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 24px 16px 24px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
});

export default function SupportTicketsPage() {
  const styles = useStyles();
  const router = useRouter();

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, title: '', message: '' });

  const fetchTickets = () => {
    setLoading(true);
    fetch('/api/tickets')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTickets(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketSubmit = async (subject: string, message: string): Promise<boolean> => {
    if (!subject.trim() || !message.trim()) {
      setAlert({ isOpen: true, title: 'Validasi Gagal', message: 'Harap isi subjek dan pesan tiket.' });
      return false;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message })
      });
      const data = await res.json();
      
      if (data.success) {
        fetchTickets(); 
        setAlert({ isOpen: true, title: 'Berhasil', message: `Tiket bantuan berhasil dikirim dengan kode ${data.data.ticketCode}. Tim kami akan segera merespons.` });
        return true;
      } else {
        setAlert({ isOpen: true, title: 'Gagal', message: data.error || 'Terjadi kesalahan saat mengirim tiket.' });
        return false;
      }
    } catch (e) {
      setAlert({ isOpen: true, title: 'Error', message: 'Koneksi jaringan bermasalah.' });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>

        <div className={styles.breadcrumb}>
          <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>
            Beranda
          </Link>
          <span>&gt;</span>
          <span>Tiket Bantuan</span>
        </div>

        <div className={styles.header} style={{ marginTop: '16px' }}>
          <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={() => router.back()} />
          <div>
            <Title3>Tiket Bantuan</Title3>
            <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Sistem pelaporan masalah dan dukungan teknis</Body1>
          </div>
        </div>

        <div className={styles.innerContent}>
          <div className={styles.layout}>
            <TicketForm onSubmit={handleTicketSubmit} isSubmitting={submitting} />
            <TicketHistory tickets={tickets} isLoading={loading} />
          </div>
        </div>
        
      </div>

      {/* Alert Modal untuk Form[cite: 9] */}
      <AlertModal 
        isOpen={alert.isOpen}
        title={alert.title}
        content={alert.message}
        confirmText="Tutup"
        onConfirm={() => setAlert({ ...alert, isOpen: false })}
      />
    </div>
  );
}