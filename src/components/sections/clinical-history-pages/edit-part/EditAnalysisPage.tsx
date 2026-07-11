'use client';

import React, { useState, useEffect } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import AnalysisHeader from './AnalysisHeader';
import AnalysisBody from './AnalysisBody';

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

interface EditAnalysisPageProps {
  id: string;
}

export default function EditAnalysisPage({ id }: EditAnalysisPageProps) {
  const styles = useStyles();

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
        <AnalysisBody currentStep={currentStep} setCurrentStep={setCurrentStep} editId={id} />
      </div>
    </div>
  );
}
