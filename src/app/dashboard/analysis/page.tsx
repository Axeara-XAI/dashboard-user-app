'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { makeStyles, tokens, Spinner } from '@fluentui/react-components';
import {
  AnalysisHeader,
  AnalysisBody,
} from '../../../components/sections/analysis-pages/analysis-pages';

import { useSearchParams } from 'next/navigation';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  pageWrapper: {
    padding: '24px 32px 32px 32px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 56px)',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    boxShadow: tokens.shadow4,
  },
});

// ============================================================================
// INNER COMPONENT (uses useSearchParams — must be inside Suspense)
// ============================================================================
function AnalysisPageInner() {
  const styles = useStyles();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');

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

// ============================================================================
// MAIN PAGE COMPONENT — wraps inner component in Suspense
// ============================================================================
export default function AnalysisPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><Spinner size="large" label="Memuat halaman analisis..." /></div>}>
      <AnalysisPageInner />
    </Suspense>
  );
}
