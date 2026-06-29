'use client';

import React from 'react';
import { makeStyles } from '@fluentui/react-components';

// 1. Import potongan-potongan komponen yang sudah kita buat
import DirectoryHeader from './directory-parts/DirectoryHeader';
import DirectoryCommandBar from './directory-parts/DirectoryCommandBar';
import DirectoryFilterBar from './directory-parts/DirectoryFilterBar';
import DirectoryTable, { PatientContainer } from './directory-parts/DirectoryTable';
import DirectoryFooter from './directory-parts/DirectoryFooter';

// 2. Export kembali tipe datanya agar halaman utama (page.tsx) tidak error
export type { PatientContainer };

// 3. Sisakan style yang hanya dibutuhkan oleh container utama
const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flexGrow: 1, 
  },
});

interface PatientDirectoryProps {
  patients: PatientContainer[];
  onSelectPatient: (patient: PatientContainer) => void;
}

export default function PatientDirectory({ patients, onSelectPatient }: PatientDirectoryProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {/* Kode kita sekarang sebersih susunan balok lego! */}
      <DirectoryHeader />
      <DirectoryCommandBar />
      <DirectoryFilterBar />
      <DirectoryTable patients={patients} onSelectPatient={onSelectPatient} />
      <DirectoryFooter totalPatients={patients.length} />
    </div>
  );
}