'use client';

import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { PatientContainer } from './directory-parts/DirectoryTable';
import AssessmentHeader from './assessment-parts/AssessmentHeader';
import PatientProfileCard from './assessment-parts/PatientProfileCard';
import AssessmentTable from './assessment-parts/AssessmentTable'; 
import { AssessmentRecord } from '../../../app/dashboard/clinical-history/page';

const useStyles = makeStyles({
  container: { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '24px', 
    width: '100%', 
    flexGrow: 1,
    paddingBottom: '24px'
  },
});

interface AssessmentListProps {
  patient: PatientContainer | null | undefined; 
  onBack: () => void;        
  onNewAnalysis: () => void;
  // Props baru dari API
  assessments: AssessmentRecord[];
  isLoading: boolean;
  error: string | null;
}

export default function AssessmentList({ patient, onBack, onNewAnalysis, assessments, isLoading, error }: AssessmentListProps) {
  const styles = useStyles();

  if (!patient) return null;

  return (
    <div className={styles.container}>
      <AssessmentHeader onBack={onBack} />
      <PatientProfileCard patient={patient} />
      <AssessmentTable 
        assessments={assessments} 
        isLoading={isLoading} 
        error={error} 
        onNewAnalysis={onNewAnalysis} 
      />
    </div>
  );
}