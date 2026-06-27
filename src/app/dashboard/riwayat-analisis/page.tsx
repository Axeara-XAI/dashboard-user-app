'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Button, Title3, Body1, Card, Text, Spinner, Badge } from '@fluentui/react-components';
import { ArrowLeft24Regular, HistoryRegular, DocumentCatchUp24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  tableCard: {
    padding: '0',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
    padding: '16px 24px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    fontWeight: 'bold'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
    padding: '16px 24px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    alignItems: 'center',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  badgeFGR: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center',
    display: 'inline-block'
  },
  badgeNormal: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    textAlign: 'center',
    display: 'inline-block'
  },
  mobileView: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px'
    }
  },
  desktopView: {
    display: 'block',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  }
});

export default function RiwayatAnalisisPage() {
  const styles = useStyles();
  const router = useRouter();

  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-all-assessments')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAssessments(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>

        <div className={styles.breadcrumb}>
          <Link href="/dashboard" className={styles.breadcrumbLink}>
            Beranda
          </Link>
          <span>&gt;</span>
          <span>Riwayat Semua Analisis</span>
        </div>

        <div className={styles.header} style={{ marginTop: '16px' }}>
          <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={() => router.back()} />
          <div>
            <Title3>Riwayat Semua Analisis</Title3>
            <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Log lengkap seluruh prediksi FGR yang pernah dilakukan di sistem</Body1>
          </div>
        </div>

        <div className={styles.innerContent} style={{ padding: '0 24px 24px 24px' }}>
          <Card className={styles.tableCard} appearance="outline">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
            <Spinner size="huge" label="Memuat data..." />
          </div>
        ) : assessments.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: tokens.colorNeutralForeground3 }}>
            <DocumentCatchUp24Regular style={{ fontSize: '48px', marginBottom: '16px' }} />
            <Text style={{ display: 'block' }}>Belum ada data analisis klinis yang tersimpan di sistem.</Text>
          </div>
        ) : (
          <>
            <div style={{ padding: '16px 24px', borderBottom: `1px solid ${tokens.colorNeutralStroke1}` }}>
              <Text weight="semibold">Total Data: {assessments.length} Analisis</Text>
            </div>

            {/* Desktop Table View */}
            <div className={styles.desktopView}>
              <div className={styles.tableHeader}>
                <Text>Tanggal</Text>
                <Text>Pasien (No. RM)</Text>
                <Text>Hasil Deteksi</Text>
                <Text>Probabilitas</Text>
                <Text style={{ textAlign: 'right' }}>Aksi</Text>
              </div>
              
              {assessments.map((item) => (
                <div key={item.id} className={styles.tableRow}>
                  <Text size={300}>{new Date(item.date).toLocaleDateString('id-ID')}</Text>
                  <div>
                    <Text weight="bold" style={{ display: 'block' }}>{item.patientName}</Text>
                    <Text size={300} color="secondary">{item.medicalRecordNumber}</Text>
                  </div>
                  <div>
                    <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal}>
                      {item.riskLabel === 'FGR' ? 'RISIKO TINGGI' : 'RISIKO RENDAH'}
                    </span>
                  </div>
                  <Text>{(item.probability * 100).toFixed(1)}%</Text>
                  <div style={{ textAlign: 'right' }}>
                    <Button 
                      appearance="outline" 
                      size="small" 
                      icon={<HistoryRegular />}
                      onClick={() => router.push('/dashboard/clinical-history')}
                    >
                      Riwayat Klinis
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile List View */}
            <div className={styles.mobileView}>
              {assessments.map((item) => (
                <div key={item.id} style={{ padding: '16px', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Text size={300} color="secondary">{new Date(item.date).toLocaleDateString('id-ID')}</Text>
                    <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal} style={{ padding: '2px 6px', fontSize: '10px' }}>
                      {item.riskLabel}
                    </span>
                  </div>
                  <Text weight="bold" style={{ display: 'block' }}>{item.patientName}</Text>
                  <Text size={300} color="secondary" style={{ display: 'block', marginBottom: '12px' }}>RM: {item.medicalRecordNumber}</Text>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: `1px dashed ${tokens.colorNeutralStroke2}`, paddingTop: '12px' }}>
                    <Text>Prob: {(item.probability * 100).toFixed(1)}%</Text>
                    <Button 
                      appearance="transparent" 
                      size="small"
                      onClick={() => router.push('/dashboard/clinical-history')}
                    >
                      Riwayat Klinis
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
        </div>
      </div>
    </div>
  );
}

