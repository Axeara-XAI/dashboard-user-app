'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { makeStyles, tokens, Button, Text, Avatar, Divider, Card } from '@fluentui/react-components';
import { ArrowLeft24Regular, PrintRegular, PersonRegular } from '@fluentui/react-icons';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingBottom: '24px', // Memberikan jarak dengan ReportBody
  },
  
  patientSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  printLogoContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '16px',
  },
  printLogo: {
    height: '40px',
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  nameText: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    }
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  // --- INFO ROW STYLE ---
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  infoLabel: {
    width: '180px',
    color: tokens.colorNeutralForeground2,
    fontSize: '13px',
  },
  infoSeparator: {
    marginRight: '12px',
    color: tokens.colorNeutralForeground2,
  },
  infoValue: {
    flexGrow: 1,
    color: tokens.colorNeutralForeground1,
    fontSize: '13px',
    fontWeight: '500',
  },
});

// ============================================================================
// KOMPONEN PEMBANTU
// ============================================================================
const InfoRow = ({ label, value }: { label: string, value: React.ReactNode }) => {
  const styles = useStyles();
  return (
    <div className={styles.infoRow}>
      <Text className={styles.infoLabel}>{label}</Text>
      <Text className={styles.infoSeparator}>:</Text>
      <Text className={styles.infoValue}>{value}</Text>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
interface ReportHeaderProps {
  patient: {
    id: number;
    patient_name: string;
    medical_record_number: string;
    date_of_birth?: string | Date;
    father_name?: string;
  };
}

export default function ReportHeader({ patient }: ReportHeaderProps) {
  const styles = useStyles();
  const router = useRouter();

  const calculateAge = (dobString: string | Date | undefined) => {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formattedDob = patient.date_of_birth 
    ? new Date(patient.date_of_birth).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    : '-';

  const age = calculateAge(patient.date_of_birth);

  return (
    <div className={`${styles.headerContainer} print-avoid-break`}>
      <div className={`${styles.printLogoContainer} print-only-flex`}>
        <img src="/logo.svg" alt="Axara" className={styles.printLogo} />
      </div>

      <div className={styles.patientSection}>
        
        <div className={`${styles.topSection} print-hidden`} style={{ justifyContent: 'flex-end', marginBottom: '8px' }}>
          <Button 
            className="print-hidden"
            appearance="primary" 
            icon={<PrintRegular />}
            onClick={() => window.print()}
          >
            Cetak Dokumen
          </Button>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.column}>
            <InfoRow label="Nama Pasien" value={<span style={{ fontWeight: 'bold' }}>{patient.patient_name}</span>} />
            <InfoRow label="No. Rekam Medis" value={<span style={{ color: tokens.colorBrandForeground1 }}>{patient.medical_record_number}</span>} />
            <InfoRow label="Tanggal Lahir" value={`${formattedDob} ${age ? `(${age} Tahun)` : ''}`} />
          </div>

          <div className={styles.column}>
            <InfoRow label="Status Analisis" value="Selesai" />
            <InfoRow label="Nama Suami/Ayah" value={patient.father_name || '-'} />
            <InfoRow label="Dokter Penanggung Jawab" value={<span style={{ color: tokens.colorBrandForeground1 }}>-</span>} />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}

ReportHeader.BackButton = function BackButton({ patientId }: { patientId?: string }) {
  const router = useRouter();
  return (
    <Button 
      appearance="transparent" 
      icon={<ArrowLeft24Regular />} 
      onClick={() => {
        if (patientId) {
          router.push(`/dashboard/clinical-history?patientId=${patientId}`);
        } else {
          router.back();
        }
      }}
      style={{ padding: 0 }}
    >
      Kembali ke Profil Pasien
    </Button>
  );
};
