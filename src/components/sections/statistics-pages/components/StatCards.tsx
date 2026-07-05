'use client';

import React from 'react';
import { makeStyles, tokens, Card, Text } from '@fluentui/react-components';
import { ArrowTrendingLines24Regular, CheckmarkCircle24Regular, AlertUrgent24Regular, People24Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
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
});

interface StatCardsProps {
  totalPatients: number;
  totalAssessments: number;
  totalFGR: number;
  totalNonFGR: number;
  fgrPercentage: number;
}

export default function StatCards({
  totalPatients,
  totalAssessments,
  totalFGR,
  totalNonFGR,
  fgrPercentage
}: StatCardsProps) {
  const styles = useStyles();

  return (
    <div className={styles.grid}>
      <Card className={styles.statCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorNeutralForeground2 }}>
          <People24Regular />
          <Text weight="semibold">Total Pasien Terdaftar</Text>
        </div>
        <div className={styles.statValue}>{totalPatients}</div>
      </Card>
      
      <Card className={styles.statCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorNeutralForeground2 }}>
          <ArrowTrendingLines24Regular />
          <Text weight="semibold">Total Analisis Klinis</Text>
        </div>
        <div className={styles.statValue}>{totalAssessments}</div>
      </Card>

      <Card className={styles.statCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorPaletteRedForeground1 }}>
          <AlertUrgent24Regular />
          <Text weight="semibold">Kasus Risiko Tinggi (FGR)</Text>
        </div>
        <div className={styles.statValue} style={{ color: tokens.colorPaletteRedForeground1 }}>
          {totalFGR} <span style={{ fontSize: '18px', fontWeight: 'normal' }}>({fgrPercentage}%)</span>
        </div>
      </Card>

      <Card className={styles.statCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: tokens.colorPaletteGreenForeground1 }}>
          <CheckmarkCircle24Regular />
          <Text weight="semibold">Kasus Risiko Rendah (Non-FGR)</Text>
        </div>
        <div className={styles.statValue} style={{ color: tokens.colorPaletteGreenForeground1 }}>
          {totalNonFGR} <span style={{ fontSize: '18px', fontWeight: 'normal' }}>({100 - fgrPercentage}%)</span>
        </div>
      </Card>
    </div>
  );
}