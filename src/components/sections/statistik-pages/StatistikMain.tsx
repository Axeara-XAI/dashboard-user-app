'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Card, CardHeader, CardPreview, Text, Spinner, Button, Title3, Body1, Link } from '@fluentui/react-components';
import { ArrowLeft24Regular, ArrowTrendingLines24Regular, CheckmarkCircle24Regular, AlertUrgent24Regular, People24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  statCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  statValue: {
    fontSize: '36px',
    fontWeight: '700',
    color: tokens.colorBrandForeground1,
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '16px'
  },
  recentItem: {
    padding: '16px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  badgeFGR: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  badgeNormal: {
    padding: '4px 8px',
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px'
  }
});

export default function StatistikMain() {
  const styles = useStyles();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        
        <div className={styles.breadcrumb}>
          <Link className={styles.breadcrumbLink} onClick={() => router.push('/dashboard')}>
            Beranda
          </Link>
          <span>&gt;</span>
          <span>Statistik & Tren</span>
        </div>

        <div className={styles.header} style={{ marginTop: '16px' }}>
          <Button appearance="subtle" icon={<ArrowLeft24Regular />} onClick={() => router.back()} />
          <div>
            <Title3>Statistik & Tren</Title3>
            <Body1 style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>Agregat data analisis risiko FGR dari seluruh pasien</Body1>
          </div>
        </div>

        <div className={styles.innerContent}>
          {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <Spinner size="huge" label="Memuat data statistik..." />
        </div>
      ) : stats ? (
        <>
          <div className={styles.grid}>
            <Card className={styles.statCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorNeutralForeground2 }}>
                <People24Regular />
                <Text weight="semibold">Total Pasien Terdaftar</Text>
              </div>
              <div className={styles.statValue}>{stats.totalPatients}</div>
            </Card>
            
            <Card className={styles.statCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorNeutralForeground2 }}>
                <ArrowTrendingLines24Regular />
                <Text weight="semibold">Total Analisis Klinis</Text>
              </div>
              <div className={styles.statValue}>{stats.totalAssessments}</div>
            </Card>

            <Card className={styles.statCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorPaletteRedForeground1 }}>
                <AlertUrgent24Regular />
                <Text weight="semibold">Kasus Risiko Tinggi (FGR)</Text>
              </div>
              <div className={styles.statValue} style={{ color: tokens.colorPaletteRedForeground1 }}>
                {stats.totalFGR} <span style={{ fontSize: '18px', fontWeight: 'normal' }}>({stats.fgrPercentage}%)</span>
              </div>
            </Card>

            <Card className={styles.statCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorPaletteGreenForeground1 }}>
                <CheckmarkCircle24Regular />
                <Text weight="semibold">Kasus Risiko Rendah (Non-FGR)</Text>
              </div>
              <div className={styles.statValue} style={{ color: tokens.colorPaletteGreenForeground1 }}>
                {stats.totalNonFGR} <span style={{ fontSize: '18px', fontWeight: 'normal' }}>({100 - stats.fgrPercentage}%)</span>
              </div>
            </Card>
          </div>

          <Card style={{ marginTop: '16px', padding: '24px' }}>
            <Title3>5 Analisis Terbaru</Title3>
            <div className={styles.recentList}>
              {stats.latestAssessments.length === 0 ? (
                <Text>Belum ada data analisis.</Text>
              ) : (
                stats.latestAssessments.map((item: any) => (
                  <div key={item.id} className={styles.recentItem}>
                    <div>
                      <Text weight="bold" size={400} style={{ display: 'block' }}>{item.patientName}</Text>
                      <Text size={300} color="secondary">RM: {item.medicalRecordNumber} • {new Date(item.date).toLocaleString('id-ID')}</Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal}>
                        {item.riskLabel === 'FGR' ? 'RISIKO TINGGI (FGR)' : 'RISIKO RENDAH (Non-FGR)'}
                      </span>
                      <Text size={300} style={{ display: 'block', marginTop: '4px', color: tokens.colorNeutralForeground3 }}>
                        Probabilitas: {(item.probability * 100).toFixed(1)}%
                      </Text>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      ) : (
        <Text>Gagal memuat data.</Text>
      )}
        </div>
      </div>
    </div>
  );
}

