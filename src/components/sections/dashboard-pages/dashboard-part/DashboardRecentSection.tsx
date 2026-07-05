'use client';

import React from 'react';
import { makeStyles, tokens, Text, Link } from '@fluentui/react-components';
import { CheckmarkCircle16Regular, AlertUrgent16Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles({
  container: {
    marginTop: '24px',
    backgroundColor: 'transparent', 
    padding: '8px 0',
  },
  // KUNCI PERBAIKAN: Gaya khusus untuk meniru 'Tab' yang aktif ala Azure
  staticTabTitle: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    paddingBottom: '8px',
    marginBottom: '16px',
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`, // Garis bawah biru
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr',
    padding: '8px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: '600',
    fontSize: '13px',
    color: tokens.colorNeutralForeground1,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 2fr 1fr',
    padding: '12px 0',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    alignItems: 'center',
    fontSize: '13px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    }
  },
  nameColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  patientLink: {
    fontWeight: '500',
    textDecoration: 'none',
    color: tokens.colorBrandForeground1,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    }
  },
  typeText: {
    color: tokens.colorNeutralForeground1,
  },
  timeText: {
    color: tokens.colorNeutralForeground2,
  },
  emptyState: {
    padding: '24px 0',
    color: tokens.colorNeutralForeground3,
    fontSize: '13px',
  },
  footerLink: {
    display: 'inline-block',
    marginTop: '16px',
    fontSize: '13px',
    color: tokens.colorBrandForeground1,
  }
});

interface AssessmentItem {
  id: string | number;
  patientName: string;
  medicalRecordNumber: string;
  date: string;
  riskLabel: string;
  probability: number;
}

interface DashboardRecentSectionProps {
  assessments: AssessmentItem[];
}

// Fungsi untuk membuat format waktu ala Azure (Contoh: "5 jam yang lalu")
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} hari yang lalu`;
  
  return date.toLocaleDateString('id-ID');
}

export default function DashboardRecentSection({ assessments }: DashboardRecentSectionProps) {
  const styles = useStyles();
  const router = useRouter();

  return (
    <div className={styles.container}>
      
      {/* Judul Statis dengan Garis Bawah Biru (Menggantikan TabList) */}
      <div className={styles.staticTabTitle}>
        Analisis Terbaru
      </div>

      <div className={styles.tableContainer}>
        {/* Header Tabel */}
        <div className={styles.tableHeader}>
          <Text>Nama</Text>
          <Text>Tipe</Text>
          <Text>Terakhir Dianalisis</Text>
        </div>

        {/* State Kosong */}
        {assessments.length === 0 ? (
          <div className={styles.emptyState}>
            Tidak ada analisis klinis untuk ditampilkan
          </div>
        ) : (
          /* Render Data */
          assessments.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              
              {/* Kolom 1: Ikon & Nama (Berupa Link) */}
              <div className={styles.nameColumn}>
                {item.riskLabel === 'FGR' ? (
                  <AlertUrgent16Regular color={tokens.colorPaletteRedForeground1} />
                ) : (
                  <CheckmarkCircle16Regular color={tokens.colorPaletteGreenForeground1} />
                )}
                <Link 
                  className={styles.patientLink} 
                  onClick={() => router.push('/dashboard/clinical-history')}
                >
                  {item.patientName}
                </Link>
              </div>

              {/* Kolom 2: Tipe Layanan / Keterangan */}
              <Text className={styles.typeText} truncate>
                Analisis Risiko FGR (RM: {item.medicalRecordNumber})
              </Text>

              {/* Kolom 3: Waktu Relatif */}
              <Text className={styles.timeText}>
                {timeAgo(item.date)}
              </Text>

            </div>
          ))
        )}
      </div>

      {/* Link Footer */}
      <Link 
        className={styles.footerLink} 
        onClick={() => router.push('/dashboard/analysis-history')}
      >
        Lihat semua
      </Link>

    </div>
  );
}