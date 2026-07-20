'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Button, Title3, Body1, Link, Text } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/utils/api-helpers';

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
    '@media (max-width: 768px)': {
      padding: '16px',
    }
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    // KUNCI PERBAIKAN: border, borderRadius, backgroundColor, dan boxShadow dihapus agar tidak berbentuk kotak
  },
  innerContent: {
    paddingTop: '24px', // Padding kiri-kanan dihapus agar rata dengan pinggir layar
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '16px',
    marginBottom: '16px',
  },
  breadcrumb: {
    color: tokens.colorNeutralForeground3,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '4px',
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground3,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
  },
  backButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-12px', 
  },
  pageTitle: {
    marginTop: '4px', 
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

  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ isOpen: false, title: '', message: '' });

  const { data: ticketsRes, error, mutate, isLoading } = useSWR('/api/tickets', fetcher);

  const tickets = ticketsRes?.success ? ticketsRes.data : [];
  const loading = isLoading;

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
        mutate();  
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

        <div className={styles.headerSection}>
          <div className={styles.breadcrumb}>
            <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>Beranda</Link> <span>&gt;</span> <Text>Tiket Bantuan</Text>
          </div>
          
          <div className={styles.backButtonWrapper}>
            <Button
              appearance="subtle"
              icon={<ArrowLeft24Regular />}
              onClick={() => router.back()}
              aria-label="Kembali"
            >
              Kembali ke halaman utama
            </Button>
          </div>

          <Text 
            size={900} 
            weight="semibold" 
            className={styles.pageTitle} 
            style={{ color: tokens.colorNeutralForeground1 }}
          >
            Tiket Bantuan
          </Text>
        </div>

        <div className={styles.innerContent}>
          <div className={styles.layout}>
            <TicketForm onSubmit={handleTicketSubmit} isSubmitting={submitting} />
            <TicketHistory tickets={tickets} isLoading={loading} />
          </div>
        </div>
        
      </div>

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