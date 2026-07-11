import React from 'react';
import { makeStyles, tokens, Text, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  coverContainer: {
    width: '100%',
    height: '270mm', // Menutupi ukuran A4
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    pageBreakAfter: 'always',
    boxSizing: 'border-box',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)', // Subtle premium gradient
  },
  sidebarGraphic: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '45%',
    backgroundColor: tokens.colorBrandBackground,
    clipPath: 'polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%)',
    zIndex: 1,
  },
  sidebarGraphicSecondary: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: tokens.colorBrandBackgroundHover,
    clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
    zIndex: 0,
    opacity: 0.6,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  topRightLogo: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    width: '140px',
  },
  titleArea: {
    position: 'absolute',
    top: '35%',
    left: '8%',
    maxWidth: '35%', // Batasi lebar agar tidak keluar dari area biru
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '20px',
    color: '#ffffff',
    fontWeight: 'semibold',
    marginTop: '8px',
  },
  patientInfoArea: {
    position: 'absolute',
    bottom: '60px',
    right: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '16px',
    alignItems: 'baseline',
  },
  label: {
    fontSize: '16px',
    color: tokens.colorBrandForeground1,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  value: {
    fontSize: '18px',
    color: tokens.colorNeutralForeground1,
    fontWeight: 'semibold',
  },
  footerText: {
    position: 'absolute',
    bottom: '30px',
    right: '40px',
    fontSize: '14px',
    color: tokens.colorBrandForeground1,
    fontWeight: 'bold',
  }
});

interface PrintCoverProps {
  patient: {
    patient_name: string;
    medical_record_number: string;
  };
}

export default function PrintCover({ patient }: PrintCoverProps) {
  const styles = useStyles();

  return (
    <div className={`${styles.coverContainer} print-only-flex`}>
      {/* Decorative Sidebar Shapes */}
      <div className={styles.sidebarGraphicSecondary} />
      <div className={styles.sidebarGraphic} />
      
      <div className={styles.contentWrapper}>
        <img src="/logo.svg" alt="Axara Logo" className={styles.topRightLogo} />
        
        <div className={styles.titleArea}>
          <Text className={styles.title}>Laporan Hasil Analisis Medis</Text>
          <Text className={styles.subtitle}>Fetal Growth Restriction (FGR)</Text>
        </div>

        <div className={styles.patientInfoArea}>
          <div className={styles.infoRow}>
            <Text className={styles.label}>Nama Pasien:</Text>
            <Text className={styles.value}>{patient.patient_name}</Text>
          </div>
          <div className={styles.infoRow}>
            <Text className={styles.label}>No. Rekam Medis:</Text>
            <Text className={styles.value}>{patient.medical_record_number}</Text>
          </div>
          <div className={styles.infoRow}>
            <Text className={styles.label}>Tanggal Laporan:</Text>
            <Text className={styles.value}>
              {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </Text>
          </div>
        </div>

        <Text className={styles.footerText}>
          Sistem AI Prediktif Axara
        </Text>
      </div>
    </div>
  );
}
