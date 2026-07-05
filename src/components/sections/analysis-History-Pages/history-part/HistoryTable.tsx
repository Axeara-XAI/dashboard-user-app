'use client';

import React from 'react';
import { makeStyles, tokens, Text, Button, Spinner } from '@fluentui/react-components';
import { HistoryRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 2fr 1.5fr 1.5fr 1fr',
    padding: '16px 8px',
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`, 
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, 
    fontWeight: '400',
    color: tokens.colorNeutralForeground1,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 2fr 1.5fr 1.5fr 1fr',
    padding: '16px 8px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    alignItems: 'center',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover
    }
  },
  emptyStateRow: {
    padding: '40px 8px',
    textAlign: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground1,
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
      padding: '8px 0' // Sedikit penyesuaian padding luar
    }
  },
  desktopView: {
    display: 'block',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  }
});

interface AssessmentItem {
  id: string | number;
  date: string;
  patientName: string;
  medicalRecordNumber: string;
  riskLabel: string;
  probability: number;
}

interface HistoryTableProps {
  assessments: AssessmentItem[];
  isLoading: boolean;
}

export default function HistoryTable({ assessments, isLoading }: HistoryTableProps) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.tableContainer}>
      
      {/* --- DESKTOP VIEW --- */}
      <div className={styles.desktopView}>
        <div className={styles.tableHeader}>
          <Text>Tanggal</Text>
          <Text>Nama Pasien</Text>
          <Text>No. Rekam Medis</Text>
          <Text>Hasil Deteksi</Text>
          <Text style={{ textAlign: 'center' }}>Aksi</Text>
        </div>
        
        {isLoading && (
          <div className={styles.emptyStateRow}>
            <Spinner size="medium" />
          </div>
        )}

        {!isLoading && assessments.length === 0 && (
          <div className={styles.emptyStateRow}>
            <Text>Tidak ada data analisis yang ditemukan.</Text>
          </div>
        )}

        {!isLoading && assessments.length > 0 && assessments.map((item) => (
          <div key={item.id} className={styles.tableRow}>
            <Text size={300}>{new Date(item.date).toLocaleDateString('id-ID')}</Text>
            <Text weight="semibold">{item.patientName}</Text>
            <Text>{item.medicalRecordNumber}</Text>
            <div>
              <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal}>
                {item.riskLabel}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button 
                appearance="transparent" 
                size="small" 
                icon={<HistoryRegular />}
                onClick={() => router.push('/dashboard/clinical-history')}
              >
                Detail
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className={styles.mobileView}>
        {isLoading && (
          <div className={styles.emptyStateRow}>
            <Spinner size="medium" />
          </div>
        )}

        {!isLoading && assessments.length === 0 && (
          <div className={styles.emptyStateRow}>
            <Text>Tidak ada data analisis yang ditemukan.</Text>
          </div>
        )}

        {!isLoading && assessments.length > 0 && assessments.map((item) => (
          <div key={item.id} style={{ 
            padding: '16px 8px', 
            borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {/* Baris Atas: Tanggal & Badge Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                {new Date(item.date).toLocaleDateString('id-ID')}
              </Text>
              <span className={item.riskLabel === 'FGR' ? styles.badgeFGR : styles.badgeNormal} style={{ padding: '2px 8px', fontSize: '12px' }}>
                {item.riskLabel}
              </span>
            </div>
            
            {/* Baris Tengah: Nama & RM */}
            <div>
              <Text weight="semibold" size={400} style={{ display: 'block' }}>{item.patientName}</Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>RM: {item.medicalRecordNumber}</Text>
            </div>

            {/* Baris Bawah: Tombol Aksi */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button 
                appearance="transparent" 
                size="small"
                icon={<HistoryRegular />}
                onClick={() => router.push('/dashboard/clinical-history')}
              >
                Detail
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}