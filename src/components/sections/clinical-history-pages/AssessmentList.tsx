'use client';

import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { PatientContainer } from './directory-parts/DirectoryTable';

import AssessmentHeader from './assessment-parts/AssessmentHeader';
import PatientProfileCard from './assessment-parts/PatientProfileCard';
import AssessmentTable from './assessment-parts/AssessmentTable'; 

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

interface AssessmentListProps {
  patient: PatientContainer | null | undefined; 
  onBack: () => void;        
  onNewAnalysis: () => void; 
}

export default function AssessmentList({ patient, onBack, onNewAnalysis }: AssessmentListProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Tombol "Kembali ke Daftar Pasien" */}
      <AssessmentHeader onBack={onBack} />
      
      {/* Kartu Profil Pasien */}
      <PatientProfileCard patient={patient} />

      {/* Tabel Riwayat Analisis */}
      <AssessmentTable 
        patientId={patient?.id || '1'} 
        onNewAnalysis={onNewAnalysis} 
      />
    </div>
  );
}
