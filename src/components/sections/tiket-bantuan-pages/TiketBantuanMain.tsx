'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Button, Title3, Body1, Card, Text, Input, Textarea, Spinner, Badge, Link } from '@fluentui/react-components';
import { ArrowLeft24Regular, Send24Regular, Receipt24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import AlertModal from '../../../components/ui/AlertModal';

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
  formCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
});

export default function TiketBantuanMain() {
  const styles = useStyles();
  const router = useRouter();

  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

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

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) {
      setAlert({ isOpen: true, title: 'Validasi Gagal', message: 'Harap isi subjek dan pesan tiket.' });
      return;
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
        setSubject('');
        setMessage('');
        fetchTickets(); // Refresh data
        setAlert({ isOpen: true, title: 'Berhasil', message: `Tiket bantuan berhasil dikirim dengan kode ${data.data.ticketCode}. Tim kami akan segera merespons.` });
      } else {
        setAlert({ isOpen: true, title: 'Gagal', message: data.error || 'Terjadi kesalahan saat mengirim tiket.' });
      }
    } catch (e) {
      setAlert({ isOpen: true, title: 'Error', message: 'Koneksi jaringan bermasalah.' });
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
        {/* KIRI: Form Submit */}
        <Card className={styles.formCard}>
          <Title3>Kirim Tiket Baru</Title3>
          <Text size={300} color="secondary">Jika Anda menemukan kendala teknis atau memiliki pertanyaan terkait aplikasi, kirimkan pesan ke admin.</Text>

          <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
            <Text weight="semibold">Subjek</Text>
            <Input 
              placeholder="Contoh: Model gagal memprediksi data pasien A" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={submitting}
            />
          </div>

          <div className={styles.inputGroup}>
            <Text weight="semibold">Pesan / Keluhan</Text>
            <Textarea 
              placeholder="Deskripsikan masalah Anda secara detail..." 
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
            />
          </div>

          <Button 
            appearance="primary" 
            icon={submitting ? <Spinner size="tiny" /> : <Send24Regular />} 
            onClick={handleSubmit}
            disabled={submitting}
            style={{ marginTop: '8px' }}
          >
            Kirim Tiket
          </Button>
        </Card>

        {/* KANAN: Daftar Tiket */}
        <Card className={styles.ticketListCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt24Regular color={tokens.colorBrandForeground1} />
            <Title3>Riwayat Tiket Saya</Title3>
          </div>

          {loading ? (
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
                  <Text size={300} color="secondary" style={{ fontStyle: 'italic' }}>
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

