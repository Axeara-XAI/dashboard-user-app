'use client';

import React, { useState, useEffect } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import {
  AnalysisHeader,
  AnalysisBody,
} from '../../../components/sections/analysis-pages/analysis-pages';

// ============================================================================
// STYLES DEFINITION
// ============================================================================
const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', 
    minHeight: 'calc(100vh - 100px)',
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
  
  // State utama untuk mengontrol langkah form
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFormDirty, setIsFormDirty] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.pageContainer}>
      <AnalysisHeader isFormDirty={isFormDirty} />
      <AnalysisBody currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}