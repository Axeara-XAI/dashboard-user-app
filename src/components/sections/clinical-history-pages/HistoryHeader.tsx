'use client';

import React from 'react';
import { makeStyles, tokens, Button, Text, Avatar } from '@fluentui/react-components';
import { DocumentPdfRegular, PersonRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  headerCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow2,
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '20px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  meta: {
    color: tokens.colorNeutralForeground3,
    fontSize: '14px',
  }
});

interface HistoryHeaderProps {
  patient: {
    name: string;
    mrn: string;
    dob: string;
  };
}

export default function HistoryHeader({ patient }: HistoryHeaderProps) {
  const styles = useStyles();

  const handleExportSummary = () => {
    window.print();
  };

  return (
    <div className={styles.headerCard}>
      <div className={styles.patientInfo}>
        <Avatar color="brand" icon={<PersonRegular />} size={56} />
        <div className={styles.details}>
          <Text className={styles.name}>{patient.name}</Text>
          <Text className={styles.meta}>
            No. Rekam Medis: {patient.mrn} • Tgl Lahir: {patient.dob}
          </Text>
        </div>
      </div>
      <Button 
        appearance="primary" 
        icon={<DocumentPdfRegular />} 
        onClick={handleExportSummary}
        className="no-print"
      >
        Cetak PDF Ringkasan
      </Button>
    </div>
  );
}
