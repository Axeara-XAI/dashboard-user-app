'use client';

import React from 'react';
import { makeStyles, tokens, Card, Text, Button } from '@fluentui/react-components';
import { 
  CheckmarkCircle16Regular, 
  ErrorCircle16Regular, 
  Info16Regular 
} from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '16px',
    marginTop: '8px',
    marginBottom: '16px',
  },
  azureCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: 'none', // Menghilangkan bayangan agar terlihat 'flat' seperti Azure
    borderRadius: tokens.borderRadiusMedium,
    minHeight: '180px',
  },
  cardHeader: {
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '12px',
  },
  mainValue: {
    fontSize: '40px', // Angka raksasa khas Azure
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  subtextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
  },
  subtextNormal: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
  },
  subtextDanger: {
    fontSize: '12px',
    color: tokens.colorPaletteRedForeground1,
    fontWeight: '500',
  },
  subtextSuccess: {
    fontSize: '12px',
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: '500',
  },
  actionArea: {
    marginTop: 'auto', // Mendorong tombol ke bagian paling bawah kartu
    paddingTop: '20px',
  }
});

interface DashboardStatsSectionProps {
  totalPatients: number;
  totalAssessments: number;
  totalFGR: number;
  totalNonFGR: number;
  fgrPercentage: number;
}

export default function DashboardStatsSection({
  totalPatients,
  totalAssessments,
  totalFGR,
  totalNonFGR,
  fgrPercentage
}: DashboardStatsSectionProps) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.grid}>
      
      {/* KARTU 1: Total Pasien */}
      <Card className={styles.azureCard}>
        <Text className={styles.cardHeader}>Total Pasien Terdaftar</Text>
        <Text className={styles.mainValue}>{totalPatients}</Text>
        <div className={styles.subtextWrapper}>
          <Info16Regular color={tokens.colorNeutralForeground3} />
          <Text className={styles.subtextNormal}>Seluruh data rekam medis di sistem</Text>
        </div>
        <div className={styles.actionArea}>
          <Button appearance="outline" size="small" onClick={() => router.push('/dashboard/clinical-history')}>
            Lihat daftar
          </Button>
        </div>
      </Card>
      
      {/* KARTU 2: Total Analisis */}
      <Card className={styles.azureCard}>
        <Text className={styles.cardHeader}>Total Analisis Klinis</Text>
        <Text className={styles.mainValue}>{totalAssessments}</Text>
        <div className={styles.subtextWrapper}>
          <Info16Regular color={tokens.colorNeutralForeground3} />
          <Text className={styles.subtextNormal}>Riwayat prediksi AI yang tersimpan</Text>
        </div>
        <div className={styles.actionArea}>
          <Button appearance="outline" size="small" onClick={() => router.push('/dashboard/analysis-history')}>
            Lihat riwayat
          </Button>
        </div>
      </Card>

      {/* KARTU 3: Risiko Tinggi (FGR) */}
      <Card className={styles.azureCard}>
        <Text className={styles.cardHeader}>Kasus Risiko Tinggi (FGR)</Text>
        <Text className={styles.mainValue}>{totalFGR}</Text>
        <div className={styles.subtextWrapper}>
          <ErrorCircle16Regular color={tokens.colorPaletteRedForeground1} />
          <Text className={styles.subtextDanger}>
            Mewakili {fgrPercentage}% dari total analisis
          </Text>
        </div>
        <div className={styles.actionArea}>
          <Button appearance="outline" size="small" onClick={() => router.push('/dashboard/analysis-history')}>
            Lihat detail
          </Button>
        </div>
      </Card>

      {/* KARTU 4: Risiko Rendah (Non-FGR) */}
      <Card className={styles.azureCard}>
        <Text className={styles.cardHeader}>Risiko Rendah (Non-FGR)</Text>
        <Text className={styles.mainValue}>{totalNonFGR}</Text>
        <div className={styles.subtextWrapper}>
          <CheckmarkCircle16Regular color={tokens.colorPaletteGreenForeground1} />
          <Text className={styles.subtextSuccess}>
            Mewakili {100 - fgrPercentage}% dari total analisis
          </Text>
        </div>
        <div className={styles.actionArea}>
          <Button appearance="outline" size="small" onClick={() => router.push('/dashboard/analysis-history')}>
            Lihat detail
          </Button>
        </div>
      </Card>

    </div>
  );
}