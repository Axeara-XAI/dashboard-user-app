'use client';

import React, { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { useRouter } from 'next/navigation';

import DirectoryHeader from './directory-parts/DirectoryHeader';
import DirectoryCommandBar from './directory-parts/DirectoryCommandBar';
import DirectoryFilterBar from './directory-parts/DirectoryFilterBar';
import DirectoryTable from './directory-parts/DirectoryTable';
import DirectoryFooter from './directory-parts/DirectoryFooter';
import { PatientContainer } from '@/utils/api-helpers';

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
  onRefresh?: () => void;
}

export default function PatientDirectory({ patients, onSelectPatient, onRefresh }: PatientDirectoryProps) {
  const styles = useStyles();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Logika Export CSV
  const handleExportCSV = () => {
    if (patients.length === 0) return;
    const headers = ['Nama Pasien', 'No. Rekam Medis', 'Kunjungan Terakhir'];
    const rows = patients.map(p => `"${p.name}","${p.mrn}","${p.lastVisit}"`);
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Data_Pasien_AXARA.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Logika Filter Search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.mrn.includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <DirectoryHeader />
      <DirectoryCommandBar 
        onNew={() => router.push('/dashboard/analysis')}
        onRefresh={onRefresh}
        onExportCSV={handleExportCSV}
      />
      <DirectoryFilterBar 
        searchQuery={searchQuery}
        onSearchChange={(val) => setSearchQuery(val)}
      />
      <DirectoryTable 
        patients={filteredPatients} 
        onSelectPatient={onSelectPatient} 
        onRefresh={onRefresh}
      />
      <DirectoryFooter totalPatients={filteredPatients.length} />
    </div>
  );
}
