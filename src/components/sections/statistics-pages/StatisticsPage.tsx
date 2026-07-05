'use client';

import React, { useEffect, useState } from 'react';
import { makeStyles, tokens, Spinner, Button, Title3, Body1, Link, Text } from '@fluentui/react-components';
import { ArrowLeft24Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

// Import sub-components
import StatCards from './components/StatCards';
import RecentAssessments from './components/RecentAssessments';

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
});

export default function StatisticsPage() {
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
              <StatCards 
                totalPatients={stats.totalPatients}
                totalAssessments={stats.totalAssessments}
                totalFGR={stats.totalFGR}
                totalNonFGR={stats.totalNonFGR}
                fgrPercentage={stats.fgrPercentage}
              />
              <RecentAssessments assessments={stats.latestAssessments} />
            </>
          ) : (
            <Text>Gagal memuat data.</Text>
          )}
        </div>

      </div>
    </div>
  );
}