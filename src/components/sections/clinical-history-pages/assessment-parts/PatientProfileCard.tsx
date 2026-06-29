'use client';

import React from 'react';
import { makeStyles, tokens, Card, Avatar, Text, Button, Divider } from '@fluentui/react-components';
import { PersonRegular, DocumentArrowDownRegular } from '@fluentui/react-icons';
import { PatientContainer } from '../directory-parts/DirectoryTable';

const useStyles = makeStyles({
  patientCard: { 
    border: `1px solid ${tokens.colorNeutralStroke2}`, // Border tipis natural
    boxShadow: 'none', // PERBAIKAN: Menghapus bayangan agar terlihat 'flat'
    padding: '20px 24px', // Sedikit penyesuaian jarak agar lebih proporsional
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    borderRadius: '8px', // Sudut agak melengkung agar tetap halus
  },
  
  // --- HEADER STYLE ---
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
  actionButton: {
    whiteSpace: 'nowrap',
    minWidth: 'max-content',
  },

  // --- AZURE "ESSENTIALS" GRID STYLE ---
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '48px',
    rowGap: '12px',
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
  linkValue: {
    color: tokens.colorBrandForeground1,
    fontSize: '13px',
    fontWeight: '500',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    }
  }
});

// ============================================================================
// KOMPONEN PEMBANTU
// ============================================================================
const InfoRow = ({ label, value, isLink = false }: { label: string, value: React.ReactNode, isLink?: boolean }) => {
  const styles = useStyles();
  return (
    <div className={styles.infoRow}>
      <Text className={styles.infoLabel}>{label}</Text>
      <Text className={styles.infoSeparator}>:</Text>
      {isLink ? (
        <Text className={styles.linkValue}>{value}</Text>
      ) : (
        <Text className={styles.infoValue}>{value}</Text>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
interface PatientProfileCardProps {
  patient: PatientContainer | null | undefined;
}

export default function PatientProfileCard({ patient }: PatientProfileCardProps) {
  const styles = useStyles();

  if (!patient) return null;

  return (
    <Card className={styles.patientCard}>
      
      <div className={styles.topSection}>
        <div className={styles.profileInfo}>
          <Avatar color="brand" icon={<PersonRegular />} name={patient.name} size={56} />
          <div className={styles.nameText}>
            <Text weight="bold" size={500}>{patient.name}</Text>
            <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
              Profil Esensial Pasien
            </Text>
          </div>
        </div>
        <Button 
          appearance="primary" 
          icon={<DocumentArrowDownRegular />}
          className={styles.actionButton}
        >
          Unduh Ringkasan Medis
        </Button>
      </div>

      <Divider />

      <div className={styles.gridContainer}>
        
        <div className={styles.column}>
          <InfoRow label="No. Rekam Medis" value={patient.mrn} isLink={true} />
          <InfoRow label="Status Pasien" value="Rawat Jalan (Aktif)" />
          <InfoRow label="Tanggal Lahir" value={patient.dob} />
          <InfoRow label="Kunjungan Terakhir" value={patient.lastVisit} />
        </div>

        <div className={styles.column}>
          <InfoRow label="Golongan Darah" value="O+" />
          <InfoRow label="Faktor Risiko Utama" value="Hipertensi Gestasional" />
          <InfoRow label="Dokter Penanggung Jawab" value="dr. Andi Surya, Sp.OG" isLink={true} />
          <InfoRow label="Jaminan Kesehatan" value="BPJS Kesehatan Kelas 1" />
        </div>

      </div>
      
    </Card>
  );
}