'use client';

import React, { useState, useEffect } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  AnalysisHeader,
  AnalysisBody,
} from '../../../components/sections/analysis-pages/analysis-pages';

import { useSearchParams } from 'next/navigation';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  // 1. WRAPPER LUAR: Bertugas memberi jarak aman dari tepi layar (menggantikan fungsi layout global)
  pageWrapper: {
    padding: '24px 32px 32px 32px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px)', // Mengambil sisa layar di bawah Navbar
  },
  // 2. CONTAINER KARTU: Tampilan antarmuka Analysis yang sesungguhnya
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, // KUNCI: Memaksa kartu ini memanjang ke bawah mengisi wrapper
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    boxShadow: tokens.shadow4,
  },
});

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function AnalysisPage() {
  const styles = useStyles();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');
  
  // State utama untuk mengontrol langkah form
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <AnalysisHeader isFormDirty={isFormDirty} />
        <AnalysisBody currentStep={currentStep} setCurrentStep={setCurrentStep} editId={editId} />
      </div>
    </div>
  );
}
