'use client';

import React, { useState } from 'react';
import { makeStyles, tokens, Card, Avatar, Text, Button, Divider, Spinner } from '@fluentui/react-components';
import { PersonRegular, DocumentArrowDownRegular } from '@fluentui/react-icons';
import { useSession } from 'next-auth/react';
import { PatientContainer } from '../directory-parts/DirectoryTable';
import { AssessmentRecord } from '../clinical-history-pages';

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
  latestAssessment?: AssessmentRecord;
}

export default function PatientProfileCard({ patient, latestAssessment }: PatientProfileCardProps) {
  const styles = useStyles();
  const [isPrinting, setIsPrinting] = useState(false);
  const { data: session } = useSession();
  
  const doctorName = session?.user?.name ? `dr. ${session.user.name}` : 'Dokter Penanggung Jawab';

  if (!patient) return null;

  // AUTO CALCULATE RISK FACTOR
  let calculatedRisk = 'Belum Ada Penilaian';
  if (latestAssessment) {
    if (latestAssessment.riskLabel === 'FGR') calculatedRisk = 'Tinggi (FGR)';
    else calculatedRisk = 'Rendah (Non-FGR)';
  }
  
  const displayRiskFactor = patient.primaryRiskFactor || calculatedRisk;
  const displayBloodType = patient.bloodType || 'Belum Diatur';
  const displayStatus = patient.patientStatus || 'Rawat Jalan (Aktif)';
  const displayInsurance = patient.healthInsurance || 'Belum Diatur';

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
          icon={isPrinting ? <Spinner size="tiny" /> : <DocumentArrowDownRegular />}
          className={styles.actionButton}
          disabled={isPrinting}
          onClick={() => {
            if (isPrinting) return;
            setIsPrinting(true);
            
            // Membuat iframe tersembunyi untuk memuat halaman cetak tanpa berpindah tab
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = `/dashboard/patient-summary/${patient.id}`;
            document.body.appendChild(iframe);
            
            // iframe akan otomatis mengeksekusi window.print() dari dalam halamannya sendiri
            // Setelah dialog print terbuka (atau batal), kembalikan tombol ke keadaan semula
            setTimeout(() => {
              setIsPrinting(false);
            }, 2000); // 2 detik sudah sangat cukup untuk browser memicu dialog print

            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 60000); // Hapus setelah 60 detik
          }}
        >
          {isPrinting ? 'Menyiapkan...' : 'Unduh Ringkasan Medis'}
        </Button>
      </div>

      <Divider />

      <div className={styles.gridContainer}>
        
        <div className={styles.column}>
          <InfoRow label="No. Rekam Medis" value={patient.mrn} isLink={true} />
          <InfoRow label="Status Pasien" value={displayStatus} />
          <InfoRow label="Tanggal Lahir" value={patient.dob} />
          <InfoRow label="Kunjungan Terakhir" value={patient.lastVisit} />
        </div>

        <div className={styles.column}>
          <InfoRow label="Golongan Darah" value={displayBloodType} />
          <InfoRow label="Faktor Risiko Utama" value={displayRiskFactor} />
          <InfoRow label="Dokter Penanggung Jawab" value={doctorName} isLink={true} />
          <InfoRow label="Jaminan Kesehatan" value={displayInsurance} />
        </div>

      </div>
      
    </Card>
  );
}